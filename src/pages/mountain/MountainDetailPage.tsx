import React, { useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Search, BookmarkIcon, Share, ChevronLeft } from "lucide-react";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../../components/Badges";
import { getMountainDetail } from "../../apis/mountainApi";
import Header from "../../components/Header";

/** 산 상세정보 */
const MountainDetailPage = () => {
  const navigate = useNavigate();
  const { mountain_id } = useParams();

  const { data: mountainDetail, isLoading: mountainLoading } = useQuery(
    ["mountainDetail", mountain_id],
    () => getMountainDetail(mountain_id),
    {
      enabled: !!mountain_id, // 오늘의 산 정보가 있어야 실행
    }
  );

  console.log("mountainDetail", mountainDetail);

  const openNaverMap = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // 모바일: 네이버 지도 앱을 여는 URL 스킴
      // appname은 여러분의 앱 패키지명(있는 경우) 또는 임의 문자열로 지정할 수 있습니다.
      const appName = "com.example.myapp"; // 필요에 따라 수정하세요.
      const url = `nmap://search?query=${encodeURIComponent(
        mountainDetail?.mountain_name
      )}&lat=${mountainDetail?.lat}&lng=${
        mountainDetail?.lng
      }&appname=${appName}`;
      window.location.href = url;
    } else {
      // PC: 네이버 지도 웹사이트 URL (새 탭에서 열기)
      const url = `https://map.naver.com/v5/search/${encodeURIComponent(
        mountainDetail?.mountain_name
      )}`;
      //   )}%20${mountainDetail?.lng},${mountainDetail?.lat}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  /** 공유하기 버튼 클릭 */
  const handleClickShare = async () => {
    // 산의 고유 ID를 활용하여 딥 링크 생성 (예시: myapp 스킴 사용)
    const deepLink = `myapp://mountain/${mountainDetail?.id}`;
    // 또는 fallback URL: 앱이 설치되지 않은 경우 웹페이지로 연결
    const webUrl = `https://yourdomain.com/mountains/${mountainDetail?.id}`;

    // Web Share API 사용 예시
    if (navigator.share) {
      try {
        await navigator.share({
          title: mountainDetail?.mountain_name || "산 정보",
          text: "이 산에 대한 정보를 확인해보세요!",
          url: deepLink, // 또는 fallback URL로 webUrl 사용
        });
      } catch (error) {
        console.error("공유 오류:", error);
      }
    } else {
      // Web Share API를 지원하지 않을 때 복사 기능 등을 구현할 수 있음
      alert("공유 기능이 지원되지 않습니다. URL을 복사해주세요: " + deepLink);
    }
  };
  /** 북마크 */
  const handleClickBookmark = () => {
    //
  };

  /** ================================================================================ */

  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  // 지도 초기화: 마운트 시에만 한 번 실행
  useEffect(() => {
    if (mapElement.current && window.naver) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(36.0, 127.5),
        zoom: 11,
        mapTypeControl: true,
      };
      mapRef.current = new window.naver.maps.Map(
        mapElement.current,
        mapOptions
      );
    }
  }, []);

  // mountainDetail의 좌표 값이 있으면 마커를 찍음
  useEffect(() => {
    if (mapRef.current && mountainDetail?.lat && mountainDetail?.lng) {
      const position = new window.naver.maps.LatLng(
        mountainDetail.lat,
        mountainDetail.lng
      );

      // 기존 마커가 있으면 업데이트, 없으면 새 마커 생성
      if (markerRef.current) {
        markerRef.current.setPosition(position);
      } else {
        markerRef.current = new window.naver.maps.Marker({
          position,
          map: mapRef.current,
          icon: {
            // 예시 아이콘: 빨간색 원
            content: `<div style="width:12px; height:12px; background:#ff3b30; border-radius:50%; border:2px solid white;"></div>`,
            anchor: new window.naver.maps.Point(6, 6),
          },
        });
      }
      // 지도의 중심을 해당 마커 좌표로 이동
      mapRef.current.setCenter(position);
    }
  }, [mountainDetail]);
  /** ================================================================================ */

  return (
    <div className="touch-none h-full">
      {/* 상단 헤더 */}
      <Header
        left={
          <ChevronLeft
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <div className="fixed top-[100px] left-0 w-full z-10">
        <div ref={mapElement} className="bg-yellow-200 h-[300px] w-full"></div>
      </div>
      <main className="pt-[400px] p-8  bg-main-white ">
        {/* <div ref={mapElement} className="overflow-hidden h-[300px] -mx-8"></div> */}
        <div className="pt-[8px]">
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="flex">
                <RatingBadge
                  rating={
                    mountainDetail?.rating ? mountainDetail?.rating : "- . -"
                  }
                />
                {mountainDetail?.isBac === true && <IsBacBadge />}
              </div>
              <div className="flex text-main-gray-200">
                <Share
                  className="mr-6"
                  onClick={() => {
                    handleClickShare();
                  }}
                />
                <BookmarkIcon
                  onClick={() => {
                    handleClickBookmark();
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="text-[32px] font-light mr-2">
                  {/* {mountainDetail?.mountain_name} */}
                  {mountainDetail?.mountain_name.split("_")[0]}
                </div>
                <div className="self-center">
                  <AltitudeBadge altitude={mountainDetail?.height} />
                </div>
              </div>
              <div>
                <div
                  className="flex items-center justify-center h-[35px] text-[14px] bg-[#03C75A] text-main-white rounded-[24px] w-[66px] text-center shadow-[0_4px_4px_rgba(0,0,0,0.1)] "
                  onClick={() => {
                    openNaverMap();
                  }}
                >
                  <span className="font-extrabold mr-1">N</span>
                  <span className="font-light text-[12px]">지도</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex mt-2">
            <CapitalBadge capital={mountainDetail?.address} />
            {mountainDetail?.isBac === true && <IsBacBadge />}
          </div> */}
          <div className="text-[14px] font-thin text-main-gray-400">
            {mountainDetail?.address}
          </div>
          {/* <div className="text-[12px] font-light text-main-gray-400">
            <span>{mountainDetail?.management_city}</span>
            <span> </span>
            <span>{mountainDetail?.management_tel}</span>
          </div> */}
          <div className="font-light text-[14px] mt-2">
            <span>{mountainDetail?.overview}</span>
            <span>{mountainDetail?.description}</span>
          </div>

          {/* <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
            <div className="h-[44px] w-[165px] bg-main-green-200 text-main-white rounded-[24px] font-light flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
              등산 시작
            </div>
          </div> */}
          {/* 하단 오른쪽 플로팅 버튼 */}
          <div className="fixed bottom-6 right-6 z-30">
            <button
              className="h-[56px] w-[56px] bg-main-green-200 text-main-white rounded-full flex items-center justify-center shadow-lg"
              onClick={() => {
                // 버튼 클릭 시 실행할 로직 작성
                console.log("플로팅 버튼 클릭");
              }}
            >
              ⛰️
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MountainDetailPage;
