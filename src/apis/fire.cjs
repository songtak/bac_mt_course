const express = require("express");
const puppeteer = require("puppeteer");
const admin = require("firebase-admin");

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error("❌ Firebase 환경변수가 누락되었습니다.");
  process.exit(1);
}

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: FIREBASE_PROJECT_ID,
    client_email: FIREBASE_CLIENT_EMAIL,
    private_key: FIREBASE_PRIVATE_KEY,
  }),
});

const db = admin.firestore();
const app = express();
const PORT = 5001;

app.get("/api/wildfire-crawl", async (req, res) => {
  let browser;
  let fireData = null;

  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    page.on("response", async (response) => {
      const url = response.url();
      if (url.includes("selectPublicFireShowList.do")) {
        console.log("📡 데이터 호출 감지:", url);
        try {
          fireData = await response.json();
          console.log("📦 fireData 응답 받음!");
        } catch (e) {
          console.error("🔥 JSON 파싱 실패:", e);
        }
      }
    });

    console.log("⏳ 데이터 기다리는 중...");
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log("⏱ 대기 완료");

    await browser.close();

    if (
      !fireData ||
      !fireData.fireShowInfoList ||
      fireData.fireShowInfoList.length === 0
    ) {
      console.warn("❌ 유효한 산불 데이터 없음 (재시도 안함)");
      return res.status(404).json({ message: "산불 데이터 없음" });
    }

    const now = new Date();
    const timestampKey = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}`;

    const ref = db.collection("wildfire_data").doc(timestampKey);
    await ref.set({
      rawJson: JSON.stringify(fireData),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("✅ Firebase 저장 완료:", timestampKey);

    return res.json({
      count: fireData.fireShowInfoList.length,
      savedAs: timestampKey,
    });
  } catch (err) {
    console.error("🔥 크롤링 중 예외 발생:", err);
    if (browser) await browser.close();
    return res.status(500).json({ error: "크롤링 실패" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 서버 실행 중: http://localhost:${PORT}`);
});
