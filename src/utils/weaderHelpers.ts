import dayjs from "dayjs";
import { weatherCode, weatherEmoji } from "../models/weather"; // JSON 데이터 import

export const getWeatherIconsAndValues = (filteredData: any[]) => {
  return filteredData.map((d: any) => ({
    emoji: getWeatherEmoji(d.category, d.fcstValue),
    value: d.fcstValue, // 원본 fcstValue 그대로 반환
  }));
};

// 특정 값에 맞는 라벨 찾기 (범위 기반)
export const getWeatherLabel = (category: string, value: string | number) => {
  const categoryData = weatherCode[category];
  if (!categoryData || !categoryData.range) return value; // 범위 데이터가 없으면 그대로 반환

  if (Array.isArray(categoryData.range)) {
    if (value === "강수없음" || value === "적설없음") return value; // 강수/적설 없음 그대로 반환
    const numericValue = parseFloat(value as string); // 숫자로 변환
    if (isNaN(numericValue)) return value; // 숫자가 아닐 경우 원래 값 반환

    const rangeMatch = categoryData.range.find(
      (r) => numericValue >= r.min && (r.max === null || numericValue < r.max)
    );
    return rangeMatch ? rangeMatch.label : value; // **범위 초과 방지**
  }

  return value; // 범위가 아닌 경우 그대로 반환
};

// 특정 값에 맞는 이모지 찾기
export const getWeatherEmoji = (category: string, value: string | number) => {
  const label = getWeatherLabel(category, value);

  console.log(
    `🧐 Debug | Category: ${category}, Value: ${value}, Label: ${label}, Emoji: ${
      weatherEmoji[category]?.[label] || "❓"
    }`
  );

  return weatherEmoji[category]?.[label] || "❓";
};

export const getNearestPastHour = () => {
  return dayjs().minute() === 0
    ? dayjs().subtract(1, "hour").startOf("hour").format("HHmm") // 정시라면 한 시간 전 반환
    : dayjs().startOf("hour").format("HHmm"); // 정시가 아니면 현재 시간의 정시 반환
};
