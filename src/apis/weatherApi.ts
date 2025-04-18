import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한글 요일 지원
dayjs.locale("ko"); // 전역 locale 설정
import { db, auth, mountains_db } from "../utils/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  parseUltraShortWeatherData,
  parseForecastData,
} from "../utils/weatherParser";

const SERVICE_KEY = import.meta.env.VITE_DATA_OPEN_API_SERVICE_KEY;
const now = dayjs(); // 현재 시간
const today = now.format("YYYYMMDD");
const currentHour = now.hour();

// 허용된 정각 시간
const validHours = [2, 5, 8, 11, 14, 17, 20, 23];

// 가장 가까운 이전 시간 찾기
const closestHour =
  [...validHours].reverse().find((h) => currentHour >= h) ?? 23; // fallback to 23 (어제)

// dayjs 객체로 만들어주기
let weatherTime = now.set("hour", closestHour).startOf("hour");

// 만약 closestHour가 23인데 지금 시간이 0~1시라면 어제로 넘어가야 함
if (closestHour === 23 && currentHour < 2) {
  weatherTime = weatherTime.subtract(1, "day");
}

/** 기상청 - 초단기 예보 */
export const getUltraShortTermWeather = async ({ queryKey }: any) => {
  const [_key, { nx, ny }] = queryKey;

  // 오늘 날짜 구하기 (YYYYMMDD 형식)
  const today = new Date();
  const base_date = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD

  let base_time;
  const currentHour = today.getHours();
  const currentMinutes = today.getMinutes();

  // `currentMinutes`가 30분 이상이라면, 현재 시간을 기준으로 이전 30분 단위로 설정합니다.
  if (currentMinutes >= 30) {
    base_time = `${currentHour}30`; // 30분 이상일 경우 현재 시각에서 30분 단위 설정
  } else {
    // 30분 미만일 경우, 이전 시각의 00분을 사용합니다.
    base_time = `${currentHour - 1 < 0 ? 23 : currentHour - 1}00`; // 이전 시각으로 설정
  }

  // API 호출을 위한 파라미터 설정
  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY, // API 인증키
    numOfRows: "100", // 호출할 데이터 수
    pageNo: "1", // 페이지 번호
    dataType: "JSON",
    base_date: base_date, // 날짜
    base_time: base_time, // 시간
    nx: nx.toString(), // x 좌표
    ny: ny.toString(), // y 좌표
  });
  // getUltraSrtNcst
  // getUltraSrtFcst
  // URL 생성
  const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?${params}`;

  const response = await fetch(url);

  const json = await response.json();

  if (!response.ok) throw new Error("날씨 정보를 불러오지 못했습니다.");

  return parseUltraShortWeatherData(json);
  // return json.response.body.items.item;
};

/** 기상청 - 단기 예보 */
export const getShortTermWeather = async ({ queryKey }: any) => {
  const [_key, { nx, ny }] = queryKey;

  // 02,05,08,11,14,17,20,23

  const params = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    numOfRows: "1000",
    pageNo: "1",
    dataType: "JSON",
    base_date: today,
    base_time: weatherTime.format("hh00"),
    nx: nx.toString(),
    ny: ny.toString(),
  });

  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?${params}`;

  const response = await fetch(url);

  const json = await response.json();

  console.log("=-=-=-=-=-=", json);

  if (!response.ok) throw new Error("날씨 정보를 불러오지 못했습니다.");

  return parseForecastData(json.response.body.items.item);
};

export const midTermRegionMap: Record<string, string> = {
  강원특별자치도: "11D10000", // 강원도영서
  경기도: "11B00000",
  경상남도: "11H20000",
  경상북도: "11H10000",
  부산광역시: "11H20000",
  서울특별시: "11B00000",
  울산광역시: "11H20000",
  인천광역시: "11B00000",
  전라남도: "11F20000",
  전북특별자치도: "11F10000",
  제주특별자치도: "11G00000",
  충청남도: "11C20000",
  충청북도: "11C10000",
};

const extractRegionCodeFromAddress = (address: string): string | null => {
  const regionName = address.trim().split(/\s+/)[0];
  return midTermRegionMap[regionName] ?? null;
};

/** 기상청 - 중기 예보 */
export const getMidTermWeather = async ({ queryKey }: any) => {
  const [_key, { regId, address }] = queryKey;
  const now = dayjs();
  const currentHour = now.hour();

  const baseHour = currentHour < 6 ? 18 : currentHour < 18 ? 6 : 18;
  let baseDate = now;

  if (currentHour < 6) {
    baseDate = now.subtract(1, "day");
  }

  const tmFc = baseDate.format("YYYYMMDD") + (baseHour === 6 ? "0600" : "1800");

  const taParams = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    numOfRows: "10",
    pageNo: "1",
    dataType: "JSON",
    tmFc,
    regId: String(regId), // 기온예보용 regId
  });

  const landRegionCode = extractRegionCodeFromAddress(address);
  if (!landRegionCode)
    throw new Error("주소에서 육상예보용 지역 코드를 찾을 수 없습니다.");

  const landParams = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    numOfRows: "10",
    pageNo: "1",
    dataType: "JSON",
    tmFc,
    regId: landRegionCode, // 주소로부터 유도한 지역 코드
  });

  const taUrl = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?${taParams}`;
  const landUrl = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?${landParams}`;

  const [taRes, landRes] = await Promise.all([fetch(taUrl), fetch(landUrl)]);
  const taJson = await taRes.json();
  const landJson = await landRes.json();

  if (!taRes.ok || !taJson.response?.body?.items?.item) {
    throw new Error("중기 기온예보 정보를 불러오지 못했습니다.");
  }
  if (!landRes.ok || !landJson.response?.body?.items?.item) {
    throw new Error("중기 육상예보 정보를 불러오지 못했습니다.");
  }

  const ta = taJson.response.body.items.item[0];
  const land = landJson.response.body.items.item[0];

  // 날짜별로 병합 (4~10일)
  const result = [];
  for (let i = 4; i <= 10; i++) {
    const date = dayjs(tmFc.slice(0, 8)).add(i, "day").format("YYYY-MM-DD");
    const taMin = ta[`taMin${i}`];
    const taMax = ta[`taMax${i}`];
    const rnStAm = land[`rnSt${i}Am`] ?? null;
    const rnStPm = land[`rnSt${i}Pm`] ?? null;
    const wfAm = land[`wf${i}Am`] ?? null;
    const wfPm = land[`wf${i}Pm`] ?? null;
    const rnSt = land[`rnSt${i}`] ?? null;
    const wf = land[`wf${i}`] ?? null;

    result.push({
      date, // 날짜
      day: dayjs(date).format("ddd"),
      taMin, // 최저 기온
      taMax, // 최고 기온
      rnStAm, // 오전 강수 확률
      rnStPm, // 오후 강수 확률
      rnSt, // 강수 확률
      wfAm, // 오전 날씨 예보 (예 : 흐리고 비)
      wfPm, // 오후 날씨 예보
      wf, // 날씨 예보
    });
  }

  return result;
};

// export const getMidTermWeather = async ({ queryKey }: any) => {
//   const [_key, { regId }] = queryKey;
//   const now = dayjs();
//   const currentHour = now.hour();

//   const baseHour = currentHour < 6 ? 18 : currentHour < 18 ? 6 : 18;
//   let baseDate = now;

//   if (currentHour < 6) {
//     baseDate = now.subtract(1, "day");
//   }

//   const tmFc = baseDate.format("YYYYMMDD") + (baseHour === 6 ? "0600" : "1800");

//   const commonParams = {
//     serviceKey: SERVICE_KEY,
//     numOfRows: "10",
//     pageNo: "1",
//     dataType: "JSON",
//     tmFc,
//     regId: String(regId),
//   };

//   console.log("commonParams", commonParams);

//   const taParams = new URLSearchParams(commonParams);
//   const landParams = new URLSearchParams(commonParams);

//   const taUrl = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidTa?${taParams}`;
//   const landUrl = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?${landParams}`;

//   const [taRes, landRes] = await Promise.all([fetch(taUrl), fetch(landUrl)]);
//   const taJson = await taRes.json();
//   const landJson = await landRes.json();

//   if (!taRes.ok || !taJson.response?.body?.items?.item) {
//     throw new Error("중기 기온예보 정보를 불러오지 못했습니다.");
//   }
//   if (!landRes.ok || !landJson.response?.body?.items?.item) {
//     throw new Error("중기 육상예보 정보를 불러오지 못했습니다.");
//   }

//   const ta = taJson.response.body.items.item[0];
//   const land = landJson.response.body.items.item[0];

//   console.log("land", land);

//   // 날짜별로 병합 (4~10일)
//   const result = [];
//   for (let i = 4; i <= 10; i++) {
//     const date = dayjs(tmFc.slice(0, 8)).add(i, "day").format("YYYY-MM-DD");
//     const taMin = ta[`taMin${i}`];
//     const taMax = ta[`taMax${i}`];
//     const rnStAm = land[`rnSt${i}Am`] ?? null;
//     const rnStPm = land[`rnSt${i}Pm`] ?? null;
//     const wfAm = land[`wf${i}Am`] ?? null;
//     const wfPm = land[`wf${i}Pm`] ?? null;
//     const rnSt = land[`rnSt${i}`] ?? null;
//     const wf = land[`wf${i}`] ?? null;

//     result.push({
//       date,
//       taMin,
//       taMax,
//       rnStAm,
//       rnStPm,
//       rnSt,
//       wfAm,
//       wfPm,
//       wf,
//     });
//   }

//   return result;
// };
