// utils/weatherParser.ts
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한글 요일 지원
dayjs.locale("ko"); // 전역 locale 설정

// 타입 정의
interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

// °C

interface CategoryGroup {
  [category: string]: { time: string; value: string }[];
}

// ☀️ ☁️ ⛅ ⛈️ 🌤️ 🌥️ 🌦️ 🌧️ 🌨️ 🌩️ 🌫️ ❄️

interface Summary {
  date: string;
  day: string;
  taMin: number;
  taMax: number;
  rnSt: number;
  // 평균습도: string;
  wf: string;
  wf_rain: string;
}

// SKY 코드 맵핑
const skyMap: Record<number, string> = {
  1: "맑음",
  3: "구름많음",
  4: "흐림",
  // 1: "☀️",
  // 3: "⛅",
  // 4: "☁️",
};

const skyEmoji: Record<number, string> = {
  1: "☀️",
  3: "⛅",
  4: "☁️",
};

// PTY 코드 맵핑 (강수형태)
const ptyMap: Record<number, string> = {
  0: "없음", // 없음
  1: "비", // 비
  2: "비/눈", // 비/눈
  3: "눈", // 눈
  4: "소나기", // 소나기
  5: "빗방울", // 빗방울
  6: "빗방울눈날림", // 빗방울눈날림
  7: "눈날림", // 눈날림
};

const ptyEmoji: Record<number, string> = {
  0: "", // 없음
  1: "🌧️", // 비
  2: "🌧️❄️", // 비/눈
  3: "❄️", // 눈
  4: "🌦️", // 소나기
  5: "💧", // 빗방울
  6: "🌧️❄️", // 빗방울눈날림
  7: "❄️💨", // 눈날림
};
/** 초단기 예보 */
interface WeatherItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

interface WeatherData {
  [fcstTime: string]: {
    [category: string]: string;
  };
}

// 강수량(RN1) 범주 값 변환
const rainCategory = (value: string): string => {
  const rainAmount = parseFloat(value);

  if (rainAmount < 1) {
    return "1mm 미만";
  } else if (rainAmount >= 1 && rainAmount < 30) {
    return `${Math.floor(rainAmount)}mm`; // 1mm 이상 30mm 미만
  } else if (rainAmount >= 30 && rainAmount < 50) {
    return "30~50mm";
  } else if (rainAmount >= 50) {
    return "50mm 이상";
  }
  return value; // 잘못된 값이 있을 경우 그대로 반환
};

/** 초단기 예보 */
export const parseUltraShortWeatherData = (data: {
  response: { body: { items: { item: WeatherItem[] } } };
}): any[] => {
  // 결과를 담을 배열 생성
  const weatherData: any[] = [];

  // 응답 데이터에서 item 배열 추출
  const items = data.response.body.items.item;

  // 각 항목을 시간대별로 묶기
  items.forEach((item) => {
    const { fcstTime, category, fcstValue } = item;

    // 해당 시간대에 맞는 항목을 찾거나 새로 생성
    let weatherTime = weatherData.find((data) => data.fcstTime === fcstTime);

    if (!weatherTime) {
      // 시간대가 없으면 새로 추가
      weatherTime = {
        fcstTime,
        categories: {},
      };
      weatherData.push(weatherTime);
    }

    // SKY와 PTY 카테고리인 경우 코드값을 변환
    let valueToStore = fcstValue;
    if (category === "SKY") {
      valueToStore = skyEmoji[fcstValue] || fcstValue;
    } else if (category === "PTY") {
      valueToStore = ptyEmoji[fcstValue] || fcstValue;
    } else if (category === "RN1") {
      // RN1 카테고리의 경우 강수량을 범주에 맞게 변환
      valueToStore = rainCategory(fcstValue);
    }

    // 해당 시간대의 카테고리 값 저장
    weatherTime.categories[category] = valueToStore;
  });

  return weatherData;
};

export const weatherEmojiMap: Record<string, string> = {
  // 맑음
  맑음: "☀️",

  // 구름 많음 계열
  구름많음: "⛅",
  "구름많고 비": "🌦️",
  "구름많고 눈": "🌨️",
  "구름많고 비/눈": "🌨️",
  "구름많고 소나기": "🌧️",

  // 흐림 계열
  흐림: "☁️",
  "흐리고 비": "🌧️",
  "흐리고 눈": "🌨️",
  "흐리고 비/눈": "🌨️",
  "흐리고 소나기": "🌧️",
};

// 카테고리별 데이터 묶기
function groupByCategory(data: ForecastItem[]): CategoryGroup {
  const result: CategoryGroup = {};
  for (const item of data) {
    const { category, fcstTime, fcstValue } = item;
    if (!result[category]) result[category] = [];
    result[category].push({ time: fcstTime, value: fcstValue });
  }
  return result;
}

// 평균 계산
function average(items: { value: string }[]): string {
  if (!items || items.length === 0) return "-";
  const sum = items.reduce((acc, cur) => acc + parseFloat(cur.value), 0);
  return Math.round(sum / items.length).toString();
}

// 최솟값
function min(items: { value: string }[]): string {
  if (!items || items.length === 0) return "-";
  return Math.round(
    Math.min(...items.map((i) => parseFloat(i.value)))
  ).toString();
}

// 최댓값
function max(items: { value: string }[]): string {
  if (!items || items.length === 0) return "-";
  return Math.round(
    Math.max(...items.map((i) => parseFloat(i.value)))
  ).toString();
}

// 가장 자주 나오는 값 구하기
function mostFrequentValue(arr: { value: string }[]): string | null {
  if (!arr.length) return null;
  const counts: Record<string, number> = {};
  arr.forEach(({ value }) => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// 주요 요약 생성
function summarizeDay(dayData: CategoryGroup, date: string): Summary {
  const { TMP = [], POP = [], SKY = [], REH = [], PTY = [] } = dayData;

  const dateFormatDate = dayjs(date).format("YYYY-MM-DD");
  const dateFormatDay = dayjs(date).format("ddd");

  return {
    date: dateFormatDate,
    day: dateFormatDay,
    taMin: Number(min(TMP)),
    taMax: Number(max(TMP)),
    rnSt: Number(average(POP)),
    // 평균습도: average(REH) + "%",
    wf: skyMap[parseInt(mostFrequentValue(SKY) ?? "")] ?? "-",
    wf_rain: ptyMap[parseInt(mostFrequentValue(PTY) ?? "")] ?? "-", // 평균강수형태
  };
}

// 전체 파서 함수
export function parseForecastData(forecastData: ForecastItem[]): Summary[] {
  const dates = [0, 1, 2, 3].map((offset) =>
    dayjs().add(offset, "day").format("YYYYMMDD")
  );
  const grouped: Record<string, ForecastItem[]> = {
    [dates[0]]: [],
    [dates[1]]: [],
    [dates[2]]: [],
    [dates[3]]: [],
  };

  for (const item of forecastData) {
    if (dates.includes(item.fcstDate)) {
      grouped[item.fcstDate].push(item);
    }
  }

  return dates.map((date) =>
    summarizeDay(groupByCategory(grouped[date]), date)
  );
}
