import React, { useEffect, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import wildfireData from "../data/wildfire_mock.json";

// 네이버 지도를 초기화하는 컴포넌트
const NaverMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // 네이버 지도 API가 로드되어 있는지 확인합니다.
    if (window.naver && window.naver.maps) {
      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(36.5, 127.5), // 한국 중심 좌표
        zoom: 7, // 전국 단위로 보여질 수 있는 적절한 zoom 레벨 (숫자는 필요에 따라 조정)
      });
    } else {
      console.error("네이버 지도 API가 로드되지 않았습니다.");
    }
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

const WildfirePage = () => {
  const getWildfire = async () => {
    try {
      const response = await axios.get("/wildfire", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        params: {
          searchStDt: 20250320,
          searchEdDt: 20250327,
          numOfRows: 1000,
          pageNo: 1,
          ServiceKey:
            "uE2Fljsvf2rPBpiUGBrvnx9BD8hRYKp18YS3GeagdnuhTgCE3DggKvsj46Wtk4D6dOXlsZzcKpCtrzojcFwEnQ==",
        },
      });

      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching wildfire data:", error);
    }
  };

  useEffect(() => {
    // getWildfire();
  }, []);

  //   console.log("wildfireData", wildfireData);

  // EXTNGS_CMPTN_DT 진화완료일시
  // FRSTFR_PSTN_XCRD
  // FRSTFR_PSTN_YCRD
  // GRS_FRSTFR_DAM_AREA

  const getCrawledWildfireData = async () => {
    try {
      const res = await axios.get("/crawl/wildfire-crawl");
      console.log("🔥 크롤링 산불 데이터:", res.data);
    } catch (e) {
      console.error("🔥 크롤링 실패:", e);
    }
  };

  useEffect(() => {
    getCrawledWildfireData();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center animate-pan flex flex-col bg-slate-500">
      <main className="flex-grow w-full max-w-screen-md mx-auto px-6 py-8 bg-main-white">
        <div>산불현황지도</div>
        {/* 네이버 지도 컴포넌트 추가 */}
        <NaverMap />

        <div className="mt-4 space-y-3">
          {wildfireData.map((item, i) => (
            <div
              key={i}
              //   onClick={() => handleClickCourse(item)}
              className={`flex items-center p-3 rounded-lg border border-gray-200 transition 
            hover:shadow hover:bg-gray-50 hover:cursor-pointer justify-between`}
            >
              <div className="pl-3 text-lg font-light text-gray-900">
                {item.FRSTFR_GNT_DT}
              </div>
              <div>dd</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default WildfirePage;
