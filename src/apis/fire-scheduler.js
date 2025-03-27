// fire-scheduler.js
import schedule from "node-schedule";
import axios from "axios";

// 🔁 매 시간 1분(정각 +1분)에 실행 (예: 00:01, 01:01, ..., 23:01)
const job = schedule.scheduleJob("1 * * * *", async () => {
  console.log("🕐 산불 데이터 크롤링 시작:", new Date().toLocaleString());

  try {
    const response = await axios.get(
      "http://localhost:5001/api/wildfire-crawl"
    );
    console.log(`✅ 크롤링 성공! 데이터 개수: ${response.data.count}`);
    // 👉 여기에 저장하거나 DB 업로드 등 추가 작업 가능
  } catch (err) {
    console.error("❌ 크롤링 실패:", err.message);
  }
});
