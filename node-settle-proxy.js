import express from "express";
import axios from "axios";
import cors from "cors";
import CryptoJS from "crypto-js";
import bodyParser from "body-parser";
import https from "https";

const app = express();
const PORT = 3001;

// 👇 인증키 구분
const AES_KEY = "pgSettle30y739r82jtd709yOfZ2yK5K"; // AES 암호화 키 (개인정보)
const HASH_KEY = "ST1009281328226982205"; // SHA-256 해시 키 (signature, pktHash)

// 👇 TLS 통신 에이전트 (테스트 서버 SSL 문제 회피용)
const agent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(cors());
app.use(bodyParser.json());

// 🔐 AES 암호화 함수
const encryptAES = (data) => {
  const key = CryptoJS.enc.Utf8.parse(AES_KEY.substring(0, 16));
  const iv = CryptoJS.enc.Utf8.parse(AES_KEY.substring(0, 16));
  return CryptoJS.AES.encrypt(data, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).toString();
};

// ✅ signature 생성 함수 (위변조 방지용)
const makeSignature = ({ mchtId, method, trdDt, trdTm, mchtTrdNo }) => {
  const hashData = `${mchtId}${method}${trdDt}${trdTm}${mchtTrdNo}${HASH_KEY}`;
  return CryptoJS.SHA256(hashData).toString(CryptoJS.enc.Hex);
};

// ✅ pktHash 생성 함수 (요청 전문 위변조 방지용)
const makePktHash = ({ mchtId, method, trdDt, trdTm, mchtTrdNo, trdAmt }) => {
  const raw = `${mchtId}${method}${trdDt}${trdTm}${mchtTrdNo}${trdAmt}${HASH_KEY}`;
  return CryptoJS.SHA256(raw).toString(CryptoJS.enc.Hex);
};

// 💳 결제 요청 핸들러
app.post("/api/settlebank/pay", async (req, res) => {
  try {
    const {
      mchtId,
      method,
      trdDt,
      trdTm,
      mchtTrdNo,
      mchtName,
      mchtEName,
      pmtPrdtNm,
      trdAmt,
      pktHash,
      notiUrl,
      nextUrl,
      cancUrl,
    } = req.body;

    // const pktHash = makePktHash({
    //   mchtId,
    //   method,
    //   trdDt,
    //   trdTm,
    //   mchtTrdNo,
    //   trdAmt,
    // });

    const payload = {
      mchtId,
      method,
      trdDt,
      trdTm,
      mchtTrdNo,
      mchtName,
      mchtEName,
      pmtPrdtNm,
      trdAmt: encryptAES(trdAmt),
      notiUrl,
      nextUrl,
      cancUrl,
      pktHash,
      // signature: makeSignature({ mchtId, method, trdDt, trdTm, mchtTrdNo }),
    };

    console.log("📤 최종 요청 Payload:", JSON.stringify(payload, null, 2));

    const settleRes = await axios.post(
      "https://tbnpg.settlebank.co.kr/mobile/main.do",
      payload,
      {
        headers: { "Content-Type": "application/json" },
        httpsAgent: agent,
      }
    );

    console.log("✅ Settlebank 응답:", settleRes.data);
    res.json(settleRes.data);
  } catch (error) {
    console.error("❌ Settlebank 요청 실패:", error.message);

    if (error.response) {
      console.error("📦 상태코드:", error.response.status);
      console.error("📦 응답 헤더:", error.response.headers);
      console.error("📦 응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("📡 요청은 전송되었지만 응답 없음:", error.request);
    } else {
      console.error("⚠️ 요청 설정 중 오류:", error.message);
    }

    console.error("🧨 전체 에러 스택:", error.stack);

    res.status(500).json({
      error: "Settlebank 요청 실패",
      detail: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `✅ Settlebank Proxy 서버가 http://localhost:${PORT} 에서 실행 중`
  );
});
