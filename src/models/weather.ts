export const weatherCode = {
  PCP: {
    description: "강수량",
    unit: "mm",
    range: [
      { min: 0, max: 0.1, label: "강수없음" }, // 강수 없음 추가
      { min: 0.1, max: 1.0, label: "1.0mm 미만" },
      { min: 1.0, max: 30.0, label: "실수값+mm (1.0mm~29.9mm)" },
      { min: 30.0, max: 50.0, label: "30.0~50.0mm" },
      { min: 50.0, max: null, label: "50.0mm 이상" },
    ],
  },
  POP: {
    description: "강수확률",
    unit: "%",
    range: [
      { min: 0, max: 0, label: "0%" },
      { min: 1, max: 30, label: "1%~30%" },
      { min: 31, max: 60, label: "31%~60%" },
      { min: 61, max: 90, label: "61%~90%" },
      { min: 91, max: 100, label: "91%~100%" },
    ],
  },
  REH: {
    description: "습도",
    unit: "%",
    range: [
      { min: 0, max: 30, label: "0%~30%" },
      { min: 31, max: 60, label: "31%~60%" },
      { min: 61, max: 80, label: "61%~80%" },
      { min: 81, max: 100, label: "81%~100%" },
    ],
  },
  SKY: {
    description: "하늘상태",
    unit: "코드값",
    range: [
      { code: "1.0", label: "맑음" },
      { code: "3.0", label: "구름많음" },
      { code: "4.0", label: "흐림" },
    ],
  },
  TMP: {
    description: "기온",
    unit: "℃",
    range: [
      { min: -20, max: 0, label: "-20℃~0℃" },
      { min: 1, max: 15, label: "1℃~15℃" },
      { min: 16, max: 30, label: "16℃~30℃" },
      { min: 31, max: null, label: "31℃ 이상" },
    ],
  },
  VEC: {
    description: "풍향",
    unit: "deg",
    range: [
      { min: 337.5, max: 360, label: "북" },
      { min: 0, max: 22.5, label: "북" },
      { min: 22.5, max: 67.5, label: "북동" },
      { min: 67.5, max: 112.5, label: "동" },
      { min: 112.5, max: 157.5, label: "남동" },
      { min: 157.5, max: 202.5, label: "남" },
      { min: 202.5, max: 247.5, label: "남서" },
      { min: 247.5, max: 292.5, label: "서" },
      { min: 292.5, max: 337.5, label: "북서" },
    ],
  },
  WSD: {
    description: "풍속",
    unit: "m/s",
    range: [
      { min: 0, max: 2, label: "0m/s~2m/s" },
      { min: 2, max: 10, label: "2m/s~10m/s" },
      { min: 10, max: null, label: "10m/s 이상" },
    ],
  },
};

// const getRainfallLabel = (value) => {
//     const range = PCP_DATA.range.find(r => value >= r.min && (r.max === null || value < r.max));
//     return range ? range.label : "범위 초과";
//   };

// const getSkyStatus = (cloudiness) => {
//     const status = SKY_DATA.values.find(sky => cloudiness >= sky.cloudiness_range[0] && cloudiness <= sky.cloudiness_range[1]);
//     return status ? status.label : "범위 초과";
//   };

export const weatherEmoji = {
  PCP: {
    강수없음: "☀️",
    "1.0mm 미만": "🌦",
    "실수값+mm (1.0mm~29.9mm)": "🌧",
    "30.0~50.0mm": "🌧",
    "50.0mm 이상": "⛈",
  },
  POP: {
    "0%": "🌞",
    "1%~30%": "🌤",
    "30%": "🌤", // **추가 (30%가 정확히 매칭되도록)**
    "31%~60%": "🌥",
    "61%~90%": "🌧",
    "91%~100%": "⛈",
  },
  REH: {
    "0%~30%": "🔥",
    "31%~60%": "😊",
    "61%~80%": "💦",
    "81%~100%": "💧",
  },
  SKY: {
    맑음: "☀️",
    구름많음: "🌥",
    흐림: "☁️",
  },
  SNO: {
    적설없음: "❄️", // **추가 (적설없음 처리)**
    "1.0cm~5.0cm": "🌨",
    "5.0cm 이상": "☃️",
  },
  TMP: {
    "-20℃~0℃": "🥶",
    "1℃~15℃": "😊",
    "16℃~30℃": "🔥",
    "31℃ 이상": "🥵",
  },
  VEC: {
    북: "⬆️",
    북동: "↗️",
    동: "➡️",
    남동: "↘️",
    남: "⬇️",
    남서: "↙️",
    서: "⬅️",
    북서: "↖️",
  },
  WSD: {
    "0m/s~2m/s": "🍃",
    "2m/s~10m/s": "💨",
    "10m/s 이상": "🌪",
  },
};
