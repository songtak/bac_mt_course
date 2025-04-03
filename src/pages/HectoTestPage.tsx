import React from "react";
import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";
import SHA256 from "crypto-js/sha256";
import Hex from "crypto-js/enc-hex";
import Utf8 from "crypto-js/enc-utf8";
import ECB from "crypto-js/mode-ecb";
import Pkcs7 from "crypto-js/pad-pkcs7";
// 인증 키
const AES_KEY = "pgSettle30y739r82jtd709yOfZ2yK5K"; // AES 암호화 키
const HASH_KEY = "ST1009281328226982205"; // SHA-256 해시 키

const HectoTestPage = () => {
  // 🔐 AES 암호화
  const encrypted = AES.encrypt("1000", Utf8.parse(AES_KEY), {
    mode: ECB,
    padding: Pkcs7,
  });
  //   const encryptAES = (data: string) => {
  //     const key = CryptoJS.enc.Utf8.parse(AES_KEY.substring(0, 16));
  //     const iv = CryptoJS.enc.Utf8.parse(AES_KEY.substring(0, 16));
  //     return CryptoJS.AES.encrypt(data, key, {
  //       iv,
  //       padding: CryptoJS.pad.Pkcs7,
  //       mode: CryptoJS.mode.CBC,
  //     }).toString();
  //   };

  // 🔐 pktHash 생성 함수
  const makePktHash = ({
    mchtId,
    method,
    trdDt,
    trdTm,
    mchtTrdNo,
    trdAmt,
  }: {
    mchtId: string;
    method: string;
    trdDt: string;
    trdTm: string;
    mchtTrdNo: string;
    trdAmt: string;
  }) => {
    const raw = `${mchtId}${method}${mchtTrdNo}${trdDt}${trdTm}${trdAmt}${HASH_KEY}`;
    return CryptoJS.SHA256(raw).toString(CryptoJS.enc.Hex);
  };

  const handlePayment = () => {
    const mchtId = "nxhp_pl_il";
    const method = "mobile";
    const trdDt = "20211231";
    const trdTm = "100000";
    const mchtTrdNo = "ORDER20211231100000";
    const trdAmtPlain = "1000";

    const encryptedAmt = encrypted;

    const pktHash = makePktHash({
      mchtId,
      method,
      trdDt,
      trdTm,
      mchtTrdNo,
      trdAmt: "1000", // pktHash는 암호화 전 금액 기준!
    });

    const payload = {
      mchtId,
      method,
      trdDt,
      trdTm,
      mchtTrdNo,
      mchtName: "헥토파이낸셜",
      mchtEName: "Hecto Financial",
      pmtPrdtNm: "테스트상품",
      trdAmt: encryptedAmt,
      pktHash,
      notiUrl: "https://example.com/noti",
      nextUrl: "https://example.com/next",
      cancUrl: "https://example.com/cancel",
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://tbnpg.settlebank.co.kr/mobile/main.do";
    form.acceptCharset = "UTF-8";
    form.style.display = "none";

    Object.entries(payload).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h2>Settlebank 결제 테스트</h2>
      <button onClick={handlePayment}>결제 요청</button>
    </div>
  );
};

export default HectoTestPage;
