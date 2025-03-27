const puppeteer = require("puppeteer");
const admin = require("firebase-admin");

// Firebase 환경변수 확인
const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
  process.env;

console.log("1. FIREBASE_PROJECT_ID", FIREBASE_PROJECT_ID);
console.log("2. FIREBASE_CLIENT_EMAIL", FIREBASE_CLIENT_EMAIL);
console.log("3. FIREBASE_PRIVATE_KEY", FIREBASE_PRIVATE_KEY);

if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
  console.error("❌ Firebase 환경변수가 누락되었습니다.");
  console.error("🔥 DEBUG ENV");
  console.error("FIREBASE_PROJECT_ID", FIREBASE_PROJECT_ID);
  console.error("FIREBASE_CLIENT_EMAIL", FIREBASE_CLIENT_EMAIL);
  console.error(
    "FIREBASE_PRIVATE_KEY",
    FIREBASE_PRIVATE_KEY?.slice(0, 30) + "..."
  );
  process.exit(1);
}

// Firebase Admin 초기화
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: FIREBASE_PROJECT_ID,
    clientEmail: FIREBASE_CLIENT_EMAIL,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});
const db = admin.firestore();

(async () => {
  let browser;
  let fireData = null;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // 💥 여기 추가
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    page.on("response", async (response) => {
      const url = response.url();
      if (url.includes("selectPublicFireShowList.do")) {
        try {
          fireData = await response.json();
          console.log("📦 fireData 응답 받음!");
        } catch (e) {
          console.error("🔥 JSON 파싱 실패:", e);
        }
      }
    });

    await page.goto(
      "https://fd.forest.go.kr/ffas/pubConn/movePage/main_simple.do?systemCode=ffasout_c",
      {
        waitUntil: "networkidle2",
        timeout: 15000,
      }
    );

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
      process.exit(0); // 정상 종료
    }

    const now = new Date();
    const timestampKey = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}`;

    await db
      .collection("wildfire_data")
      .doc(timestampKey)
      .set({
        rawJson: JSON.stringify(fireData),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    console.log("✅ Firebase 저장 완료:", timestampKey);
    process.exit(0);
  } catch (err) {
    console.error("🔥 크롤링 중 예외 발생:", err);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
