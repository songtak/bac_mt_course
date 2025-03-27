import React, { useEffect, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import wildfireData from "../data/wildfire_mock.json";

const mockData = [
  {
    frfrLctnXcrd: "127.7900949352501",
    frfrPrgrsStcd: "02",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "03",
    frfrPotfrRt: 90,
    frfrSttmnDt: "20250321",
    frfrSttmnHms: "152639",
    frfrInfoId: "358944",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "35.25520095257454",
    frfrSttmnLctnXcrd: "127.79009493524893",
    frfrSttmnLctnYcrd: "35.25520095224756",
    frfrSttmnAddr: "경상남도 산청군 시천면 신천리",
    frfrPrgrsStcdNm: "진화중",
    frfrSttmnAddrDe: "경상남도 산청군 시천면 신천리 산 39임",
    frfrFrngDtm: "2025-03-21 15:26:39",
    frfrStepIssuNm: "산불 3단계",
    lgdngCd: "4886036030",
  },
  {
    frfrLctnXcrd: "128.5992098110805",
    frfrPrgrsStcd: "02",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "03",
    frfrPotfrRt: 68,
    frfrSttmnDt: "20250322",
    frfrSttmnHms: "112414",
    frfrInfoId: "359264",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "36.369282214858096",
    frfrSttmnLctnXcrd: "128.5992098110749",
    frfrSttmnLctnYcrd: "36.36928221465283",
    frfrSttmnAddr: "경상북도 의성군 안평면 괴산리",
    frfrPrgrsStcdNm: "진화중",
    frfrSttmnAddrDe: "경상북도 의성군 안평면 괴산리 산61임",
    frfrFrngDtm: "2025-03-22 11:24:14",
    frfrStepIssuNm: "산불 3단계",
    lgdngCd: "4773046035",
  },
  {
    frfrLctnXcrd: "129.25549939262694",
    frfrPrgrsStcd: "02",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "03",
    frfrPotfrRt: 98,
    frfrSttmnDt: "20250322",
    frfrSttmnHms: "121201",
    frfrInfoId: "359324",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "35.40452836805859",
    frfrSttmnLctnXcrd: "129.25549939255046",
    frfrSttmnLctnYcrd: "35.404528367750466",
    frfrSttmnAddr: "울산광역시 울주군 온양읍 운화리",
    frfrPrgrsStcdNm: "진화중",
    frfrSttmnAddrDe: "울산광역시 울주군 온양읍 운화리 산50임",
    frfrFrngDtm: "2025-03-22 12:12:01",
    frfrStepIssuNm: "산불 3단계",
    lgdngCd: "3171025629",
  },
  {
    frfrLctnXcrd: "128.45183950685484",
    frfrPrgrsStcd: "02",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "00",
    frfrPotfrRt: 66,
    frfrSttmnDt: "20250322",
    frfrSttmnHms: "143938",
    frfrInfoId: "360084",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "36.41211998986555",
    frfrSttmnLctnXcrd: "128.4518395068514",
    frfrSttmnLctnYcrd: "36.412119989665044",
    frfrSttmnAddr: "경상북도 의성군 안계면 양곡리",
    frfrPrgrsStcdNm: "진화중",
    frfrSttmnAddrDe: "경상북도 의성군 안계면 양곡리 산83-19 임",
    frfrFrngDtm: "2025-03-22 14:39:38",
    frfrStepIssuNm: "초기 대응",
    lgdngCd: "4773043037",
  },
  {
    frfrLctnXcrd: "128.50335885436792",
    frfrPrgrsStcd: "03",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "00",
    frfrPotfrRt: 100,
    frfrSttmnDt: "20250326",
    frfrSttmnHms: "192939",
    frfrInfoId: "363764",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "35.766901247959446",
    frfrSttmnLctnXcrd: "128.50335885436309",
    frfrSttmnLctnYcrd: "35.76690124768663",
    frfrSttmnAddr: "대구광역시 달성군 옥포읍 기세리",
    potfrCmpleDtm: "2025-03-27 08:00:00",
    frfrPrgrsStcdNm: "진화완료",
    frfrSttmnAddrDe: "대구광역시 대구광역시 달성군 옥포읍 기세리 산157임",
    frfrFrngDtm: "2025-03-26 19:29:39",
    frfrStepIssuNm: "초기 대응",
    lgdngCd: "2771026226",
  },
  {
    frfrLctnXcrd: "127.55865000000037",
    frfrPrgrsStcd: "02",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "02",
    frfrPotfrRt: 70,
    frfrSttmnDt: "20250326",
    frfrSttmnHms: "212237",
    frfrInfoId: "363804",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "35.961100000504324",
    frfrSttmnLctnXcrd: "127.55865000000018",
    frfrSttmnLctnYcrd: "35.96110000025217",
    frfrSttmnAddr: "전북특별자치도 무주군 부남면 대소리",
    frfrPrgrsStcdNm: "진화중",
    frfrSttmnAddrDe: "전북특별자치도 무주군 부남면 대소리 819-1 도",
    frfrFrngDtm: "2025-03-26 21:22:37",
    frfrStepIssuNm: "산불 2단계",
    lgdngCd: "5273035022",
  },
  {
    frfrLctnXcrd: "126.47050187963781",
    frfrPrgrsStcd: "03",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "00",
    frfrPotfrRt: 100,
    frfrSttmnDt: "20250326",
    frfrSttmnHms: "234240",
    frfrInfoId: "363884",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "36.952504113846516",
    frfrSttmnLctnXcrd: "126.47050187964139",
    frfrSttmnLctnYcrd: "36.95250411371088",
    frfrSttmnAddr: "충청남도 서산시 대산읍 운산리",
    potfrCmpleDtm: "2025-03-27 00:32:00",
    frfrPrgrsStcdNm: "진화완료",
    frfrSttmnAddrDe: "충청남도 서산시 대산읍 운산리 86-44 임",
    frfrFrngDtm: "2025-03-26 23:42:40",
    frfrStepIssuNm: "초기 대응",
    lgdngCd: "4421025029",
  },
  {
    frfrLctnXcrd: "128.52778209652755",
    frfrPrgrsStcd: "05",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "00",
    frfrPotfrRt: 100,
    frfrSttmnDt: "20250327",
    frfrSttmnHms: "074044",
    frfrInfoId: "363885",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "36.02503043308222",
    frfrSttmnLctnXcrd: "128.52778209652269",
    frfrSttmnLctnYcrd: "36.025030432837724",
    frfrSttmnAddr: "경상북도 칠곡군 동명면 가천리",
    potfrCmpleDtm: "2025-03-27 08:25:00",
    frfrPrgrsStcdNm: "산불외종료",
    frfrSttmnAddrDe: "경상북도 칠곡군 동명면 가천리 805 답",
    frfrFrngDtm: "2025-03-27 07:40:44",
    frfrStepIssuNm: "초기 대응",
    lgdngCd: "4785032032",
  },
  {
    frfrLctnXcrd: "126.26148857661053",
    frfrPrgrsStcd: "05",
    frfrOccrrTpcd: "05",
    frfrStepIssuCd: "00",
    frfrPotfrRt: 0,
    frfrSttmnDt: "20250327",
    frfrSttmnHms: "150347",
    frfrInfoId: "364224",
    frfrOccrrStcd: "31",
    frfrLctnYcrd: "36.80115371736462",
    frfrSttmnLctnXcrd: "126.26148857661941",
    frfrSttmnLctnYcrd: "36.80115371721087",
    frfrSttmnAddr: "충청남도 태안군 원북면 대기리",
    potfrCmpleDtm: "2025-03-27 15:15:00",
    frfrPrgrsStcdNm: "산불외종료",
    frfrSttmnAddrDe: "충청남도 태안군 원북면 대기리 2-3 임",
    frfrFrngDtm: "2025-03-27 15:03:47",
    frfrStepIssuNm: "초기 대응",
    lgdngCd: "4482535027",
  },
  {
    frfrLctnXcrd: "128.5060498651676",
    frfrPrgrsStcd: "02",
    frfrOccrrTpcd: "01",
    frfrStepIssuCd: "00",
    frfrPotfrRt: 0,
    frfrSttmnDt: "20250327",
    frfrSttmnHms: "161314",
    frfrInfoId: "364284",
    frfrOccrrStcd: "61",
    frfrLctnYcrd: "36.220720205211755",
    frfrSttmnLctnXcrd: "128.50260931550508",
    frfrOccrrPbmrl: 4.2,
    frfrSttmnLctnYcrd: "36.22110477819571",
    frfrPrgrsStcdNm: "진화중",
    frfrOccrrWndrcCd: "북북서",
    frfrSttmnAddrDe: "대구광역시 군위군 소보면 평호리 산15임",
    frfrFrngDtm: "2025-03-27 16:13:14",
    frfrStepIssuNm: "초기 대응",
  },
];

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
    // getCrawledWildfireData();
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
