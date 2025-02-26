import React, { useState } from "react";
import proj4 from "proj4";
import sampleData from "../../PMNTN_감악산_414800101.json";

// 좌표계 정의 (EPSG:5186 → EPSG:4326)
proj4.defs(
  "EPSG:5186",
  "+proj=tmerc +lat_0=38 +lon_0=127 +k=1.0 +x_0=200000 +y_0=600000 +datum=ITRF2000 +units=m +no_defs"
);

const GPXExporter: React.FC = () => {
  // 드롭다운에서 선택된 키 & 입력된 값 상태 관리
  const [selectedKey, setSelectedKey] = useState("PMNTN_NM");
  const [inputValue, setInputValue] = useState("");

  // JSON 속성 키 목록 (드롭다운 옵션으로 사용)
  const availableKeys = Object.keys(sampleData.features[0].attributes);

  // GPX 파일 생성 및 다운로드 함수
  const exportGPX = () => {
    if (!inputValue.trim()) {
      alert("값을 입력하세요.");
      return;
    }

    // 선택된 키와 입력된 값이 일치하는 feature만 필터링
    const filteredFeatures = sampleData.features.filter(
      (feature) => feature.attributes[selectedKey] === inputValue
    );

    if (filteredFeatures.length === 0) {
      alert("해당 조건에 맞는 데이터가 없습니다.");
      return;
    }

    // GPX 파일 형식으로 데이터 변환
    let gpxContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    gpxContent += `<gpx version="1.1" creator="ReactApp" xmlns="http://www.topografix.com/GPX/1/1">\n`;

    filteredFeatures.forEach((feature) => {
      gpxContent += `  <trk>\n`;
      gpxContent += `    <name>${feature.attributes[selectedKey]}</name>\n`;
      feature.geometry.paths.forEach((path) => {
        gpxContent += `    <trkseg>\n`;
        path.forEach((coord) => {
          const [x, y] = coord;
          const [lon, lat] = proj4("EPSG:5186", "EPSG:4326", [x, y]);
          gpxContent += `      <trkpt lat="${lat}" lon="${lon}"></trkpt>\n`;
        });
        gpxContent += `    </trkseg>\n`;
      });
      gpxContent += `  </trk>\n`;
    });

    gpxContent += `</gpx>`;

    // Blob을 이용해 GPX 파일 다운로드
    const blob = new Blob([gpxContent], { type: "application/gpx+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.gpx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>GPX 변환기</h2>

      {/* 드롭다운: 선택할 JSON 속성 키 */}
      <label htmlFor="keySelect">필터 기준 키:</label>
      <select
        id="keySelect"
        value={selectedKey}
        onChange={(e) => setSelectedKey(e.target.value)}
        style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
      >
        {availableKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {/* 입력창: 사용자가 원하는 값 입력 */}
      <label htmlFor="valueInput">검색할 값:</label>
      <input
        id="valueInput"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="값을 입력하세요"
        style={{
          width: "100%",
          padding: "5px",
          marginBottom: "10px",
          boxSizing: "border-box",
        }}
      />

      {/* GPX 다운로드 버튼 */}
      <button
        onClick={exportGPX}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        GPX 다운로드
      </button>
    </div>
  );
};

export default GPXExporter;
