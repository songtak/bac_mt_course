import React from "react";
import axios from "axios";
import * as xlsx from "xlsx";

// 네이버 API 키
const NAVER_CLIENT_ID = "g4lwz48dq0";
const NAVER_CLIENT_SECRET = "d56mkH7Ysp0KHno54kgseH1KNVwI6QysmZxiE8JN";

// 엑셀 파일 경로 (public 폴더에 있어야 함)
const inputFilePath = "../public/mountain_locations.xlsx"; // public 폴더 안의 파일
const outputFileName = "../public/updated_mountain_locations.xlsx"; // 다운로드될 파일 이름

const AddressSettingPage = () => {
  // 네이버 지도 API 요청 함수
  const getAddressFromCoordinates = async (lat: number, lon: number) => {
    const url = `/api/address?coords=${lon},${lat}&output=json`;

    try {
      const response = await axios.get(url, {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
        },
      });

      const results = response.data.results;
      if (results.length > 0) {
        const area1 = results[0].region.area1.name; // 시/도
        const area2 = results[0].region.area2.name; // 시/군/구
        const area3 = results[0].region.area3.name; // 읍/면/동
        return { capital: area1, address: `${area2} ${area3}`.trim() };
      }
    } catch (error) {
      console.error(`Error fetching address for ${lat}, ${lon}:`, error);
    }

    return { capital: "", address: "" };
  };

  // 브라우저에서 fetch()를 사용하여 엑셀 파일 읽기
  const processExcelFile = async () => {
    try {
      const response = await fetch(inputFilePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = xlsx.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });
      const sheetName = workbook.SheetNames[0]; // 첫 번째 시트 사용
      const worksheet = workbook.Sheets[sheetName];
      const data: any[] = xlsx.utils.sheet_to_json(worksheet);

      // 변환된 데이터 저장용 배열
      const updatedData = [];

      for (const row of data) {
        const { latitude, longitude, name, height } = row; // 엑셀에서 좌표와 산 이름 추출
        if (latitude && longitude) {
          const addressData = await getAddressFromCoordinates(
            Number(latitude),
            Number(longitude)
          );
          updatedData.push({
            name,
            height,
            latitude,
            longitude,
            ...addressData,
          });
        }
      }

      // 변환된 데이터를 새 엑셀 파일로 저장
      const newWorksheet = xlsx.utils.json_to_sheet(updatedData);
      const newWorkbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "UpdatedData");

      // 브라우저에서 다운로드하도록 설정
      const wbout = xlsx.write(newWorkbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = outputFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`✅ 업데이트된 파일 다운로드 완료: ${outputFileName}`);
    } catch (error) {
      console.error("❌ 엑셀 파일을 처리하는 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <button onClick={processExcelFile}>엑셀 변환 및 다운로드</button>
    </div>
  );
};

export default AddressSettingPage;
