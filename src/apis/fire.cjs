const express = require("express");
const puppeteer = require("puppeteer");
const { db } = require("../utils/firebaseConfig.cjs"); // cjs 형식 config
const { doc, setDoc, serverTimestamp } = require("firebase/firestore");

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

      // Firebase에 실패 로그 저장
      const failRef = doc(db, "wildfire_logs", new Date().toISOString());
      await setDoc(failRef, {
        status: "no-data",
        createdAt: serverTimestamp(),
      });

      return res.status(404).json({ message: "산불 데이터 없음" });
    }

    // 문서 ID: YYYYMMDD_HH
    const now = new Date();
    const timestampKey = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}`;

    // 산불 데이터 저장
    const wildfireRef = doc(db, "wildfire_data", timestampKey);
    await setDoc(wildfireRef, {
      rawJson: JSON.stringify(fireData),
      createdAt: serverTimestamp(),
    });

    // 로그 저장
    const logRef = doc(db, "wildfire_logs", now.toISOString());
    await setDoc(logRef, {
      status: "success",
      savedAs: timestampKey,
      count: fireData.fireShowInfoList.length,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Firebase 저장 완료:", timestampKey);

    res.json({
      savedAs: timestampKey,
      count: fireData.fireShowInfoList.length,
    });
  } catch (err) {
    console.error("🔥 크롤링 중 예외 발생:", err);
    if (browser) await browser.close();

    const errorRef = doc(db, "wildfire_logs", new Date().toISOString());
    await setDoc(errorRef, {
      status: "error",
      error: err.message,
      createdAt: serverTimestamp(),
    });

    res.status(500).json({ error: "크롤링 실패" });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 서버 실행 중: http://localhost:${PORT}`);
});
