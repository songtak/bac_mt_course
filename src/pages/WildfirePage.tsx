// components/WildfireMapPage.tsx
import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { db } from "../utils/firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

// 🔥 단계별 마커 색상 설정
const getMarkerColor = (progress: string, step: string) => {
  if (progress !== "진화중") return "skyblue"; // 🔵 진화중 아닌 경우
  if (step === "초기 대응") return "pink";
  if (step.includes("1")) return "yellow";
  if (step.includes("2")) return "orange";
  if (step.includes("3")) return "red";
  return "skyblue";
};
// 🔢 숫자 텍스트 추출 (1단계/2단계/3단계 → 1/2/3)
const getMarkerText = (progress: string, step: string) => {
  if (progress !== "진화중") return "-"; // 🔵 진화중 아닌 경우
  if (step === "초기 대응") return "!";
  const matched = step.match(/(\d)/);
  return matched ? matched[1] : "-";
};

// 🗺️ 지도 컴포넌트
const NaverMap = ({
  data,
  onSelect,
}: {
  data: any[];
  onSelect: (item: any) => void;
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(36.5, 127.5),
        zoom: 7,
      });

      if (data.length > 0) {
        const bounds = new window.naver.maps.LatLngBounds();

        data
          .slice()
          .reverse()
          .forEach((item: any) => {
            const lat = parseFloat(item.frfrLctnYcrd);
            const lng = parseFloat(item.frfrLctnXcrd);
            const position = new window.naver.maps.LatLng(lat, lng);
            const stepText = getMarkerText(
              item.frfrPrgrsStcdNm,
              item.frfrStepIssuNm || ""
            );
            const color = getMarkerColor(
              item.frfrPrgrsStcdNm,
              item.frfrStepIssuNm || ""
            );

            const markerContent = `
              <div style="
                background: ${color};
                border-radius: 50%;
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
                color: black;
                border: 1.5px solid white;
                box-shadow: 0 0 4px rgba(0,0,0,0.2);
                cursor: pointer;
              ">
                ${stepText}
              </div>
            `;

            const marker = new window.naver.maps.Marker({
              position,
              map,
              icon: {
                content: markerContent,
                anchor: new window.naver.maps.Point(14, 14),
              },
            });

            window.naver.maps.Event.addListener(marker, "click", () => {
              onSelect(item);
            });

            bounds.extend(position);
          });

        map.fitBounds(bounds);
      }
    } else {
      console.error("네이버 지도 API가 로드되지 않았습니다.");
    }
  }, [data, onSelect]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

// 🔥 산불 현황 페이지
const WildfireMapPage = () => {
  const [wildfireData, setWildfireData] = useState([]);
  const [selectedFire, setSelectedFire] = useState<any>(null);

  console.log("wildfireData", wildfireData);

  const getLatestWildfireData = async () => {
    try {
      const q = query(
        collection(db, "wildfire_data"),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.warn("🔥 wildfire_data 컬렉션에 데이터 없음");
        return;
      }

      const doc = querySnapshot.docs[0];
      const rawJson = doc.data().rawJson;
      const parsedData = JSON.parse(rawJson).fireShowInfoList;

      const priorityOrder: Record<string, number> = {
        진화중: 1,
        진화완료: 2,
        산불외종료: 3,
      };

      const sorted = parsedData.sort((a: any, b: any) => {
        const aOrder = priorityOrder[a.frfrPrgrsStcdNm] || 999;
        const bOrder = priorityOrder[b.frfrPrgrsStcdNm] || 999;
        return aOrder - bOrder;
      });

      setWildfireData(sorted);
    } catch (error) {
      console.error("🔥 Firebase에서 wildfire 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    getLatestWildfireData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="w-full max-w-screen-lg mx-auto px-4 py-8">
        <div className="flex">
          <div className="text-2xl font-semibold mb-4">산불 현황 지도</div>
          <div className="text-[8px] ml-3">산림청 정보 사용</div>
        </div>

        {/* 지도 */}
        <NaverMap data={wildfireData} onSelect={setSelectedFire} />

        {/* 선택된 카드 */}
        {selectedFire && (
          <section className="mt-8">
            <h2 className="text-xl font-medium mb-3">선택된 산불 정보</h2>
            <div className="rounded-xl border p-4 shadow-sm bg-white">
              <div className="text-lg font-semibold mb-1">
                {selectedFire.frfrSttmnAddr}
              </div>
              <div className="text-sm text-gray-600">
                발생일시:{" "}
                {dayjs(selectedFire.frfrFrngDtm).format("YYYY-MM-DD HH:mm")}
              </div>
              <div className="text-sm text-gray-600">
                상태: {selectedFire.frfrPrgrsStcdNm} / 단계:{" "}
                {selectedFire.frfrStepIssuNm}
              </div>
              <div className="text-sm text-gray-600">
                진화율: {selectedFire.frfrPotfrRt}%
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default WildfireMapPage;
