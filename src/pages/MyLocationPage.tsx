import React, { useState, useRef, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import { Search, BookmarkIcon, Share } from "lucide-react";
import RangeSlider from "../components/RangeSlider";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../components/Badges";
import { useNavigate } from "react-router-dom";

const MyLocationPage = () => {
  const navigate = useNavigate();

  const sheetRef = useRef<HTMLDivElement>(null);
  const collapsedTopInit =
    typeof window !== "undefined" ? window.innerHeight - 180 : 600;

  const [isArrival, setIsArrival] = useState<boolean>(false);
  // 추가된 플래그: Bottom Sheet가 확장되었는지 여부
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // 초기 접힌 위치: 창 높이에서 180px 위 (네비게이션 바 위쪽 영역)
  const [collapsedTop, setCollapsedTop] = useState<number>(collapsedTopInit);
  const [sheetTop, setSheetTop] = useState<number>(collapsedTop);

  // 드래그 시작 시의 Y 좌표와 sheetTop을 저장할 ref
  const startYRef = useRef<number | null>(null);
  const initialSheetTopRef = useRef<number>(sheetTop);

  // 창 크기 변경에 따라 collapsedTop 업데이트
  useEffect(() => {
    const handleResize = () => {
      const newCollapsed = window.innerHeight - 150;
      setCollapsedTop(newCollapsed);
      if (sheetTop !== 40) {
        setSheetTop(newCollapsed);
        initialSheetTopRef.current = newCollapsed;
        setIsExpanded(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sheetTop]);

  // 포인터/터치 드래그 시작
  const handleDragStart = (
    clientY: number,
    pointerId?: number,
    e?: React.PointerEvent
  ) => {
    startYRef.current = clientY;
    initialSheetTopRef.current = sheetTop;
    if (e && pointerId !== undefined) {
      e.currentTarget.setPointerCapture(pointerId);
    }
  };

  // 포인터/터치 드래그 이동
  const handleDragMove = (clientY: number) => {
    if (startYRef.current === null) return;
    const deltaY = clientY - startYRef.current;
    let newTop = initialSheetTopRef.current + deltaY;
    if (newTop < 40) newTop = 40; // 확장 상태: 상단 40px 여백 남김
    if (newTop > collapsedTop) newTop = collapsedTop;
    setSheetTop(newTop);
  };

  // 드래그 종료 후, 시작 위치에서 50px 이상 위로 이동했으면 확장, 아니면 접힘
  const handleDragEnd = (pointerId?: number, e?: React.PointerEvent) => {
    if (e && pointerId !== undefined) {
      e.currentTarget.releasePointerCapture(pointerId);
    }
    const dragDelta = initialSheetTopRef.current - sheetTop;
    if (dragDelta >= 50) {
      setSheetTop(40);
      setIsExpanded(true);
    } else {
      setSheetTop(collapsedTop);
      setIsExpanded(false);
    }
    startYRef.current = null;
  };

  /** ============================================================================ */
  // 지도 관련 refs
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const circleRef = useRef<naver.maps.Circle | null>(null);

  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0,
  });

  // 네이버 지도 초기화: component mount 시 실행
  const initMap = () => {
    if (!mapElement.current) return;
    // currentMyLocation이 0,0이면 fallback 좌표 (서울 중심) 사용
    const centerLat =
      currentMyLocation.lat !== 0 ? currentMyLocation.lat : 37.5665;
    const centerLng =
      currentMyLocation.lng !== 0 ? currentMyLocation.lng : 126.978;
    const mapOptions = {
      center: new naver.maps.LatLng(centerLat, centerLng),
      zoom: 11,
      mapTypeControl: true,
    };
    mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);
    // 내 위치 마커 및 5km 반경 원 생성/업데이트
    getCurPosition(true);
  };

  // 내 위치 및 마커 업데이트: mountainDetail 등의 정보 대신, 현재 위치값 사용
  const getCurPosition = (isCenter: boolean = false) => {
    if (!navigator.geolocation) {
      console.error("Geolocation을 지원하지 않습니다.");
      return;
    }
    console.log("📡 getCurPosition 호출됨");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("📍 현재 위치:", lat, lng);
        setCurrentMyLocation({ lat, lng });
        if (mapRef.current) {
          const newPosition = new naver.maps.LatLng(lat, lng);
          if (isCenter) {
            mapRef.current.setCenter(newPosition);
            mapRef.current.setZoom(11);
          }
          // 내 위치 마커 업데이트
          if (markerRef.current) {
            markerRef.current.setPosition(newPosition);
          } else {
            markerRef.current = new naver.maps.Marker({
              position: newPosition,
              map: mapRef.current,
              icon: {
                content: `<div style="width:12px; height:12px; font-size:12px;">📍</div>`,
                anchor: new naver.maps.Point(12, 12),
              },
            });
          }
          // 내 위치 기준 5km 원 생성 또는 업데이트
          if (circleRef.current) {
            circleRef.current.setCenter(newPosition);
          } else {
            circleRef.current = new naver.maps.Circle({
              map: mapRef.current,
              center: newPosition,
              radius: 5000, // 5km
              strokeColor: "#0000FF",
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: "#0000FF",
              fillOpacity: 0.1,
            });
          }
        }
      },
      (error) => {
        console.error("❌ 위치 정보를 가져오지 못했습니다.", error);
      }
    );
  };

  // 초기 지도 및 위치 설정
  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    // getUserLocation();
  }, []);

  /** ============================================================================ */

  return (
    <div className="touch-none h-full">
      <div className="absolute inset-0">
        <div ref={mapElement} className="w-full h-full" />
      </div>{" "}
      {/* 상단 헤더 */}
      <header className="flex justify-between items-center pt-4 pb-2 ">
        <div>
          <div className="bg-main-gray-300 h-[28px] rounded-[24px] opacity-65 shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
            <span className="pl-2 pr-2 text-white">5km</span>
          </div>
        </div>
        <div
          className="w-[46px] h-[46px] text-main-gray-300 bg-[#F8F8F8] rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
          onClick={() => {
            navigate("/search");
          }}
        >
          <Search />
        </div>
      </header>
      {/* 도착 여부에 따른 "근처" 팝업 */}
      {isArrival && (
        <div className="fixed top-[220px] left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex justify-center">
            <div className="px-10 mb-4 w-fit h-[50px] flex items-center justify-center text-center border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-[24px] whitespace-nowrap">
              <span>감악산</span>&nbsp;
              <span className="font-light">근처! 오르시겠어요?</span>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="pt-1 font-light text-center h-[36px] w-[80px] bg-main-gray-200 rounded-[24px] xf">
              아니요
            </div>
            <div className="pt-1 font-light text-center h-[36px] w-[80px] text-white bg-main-green-200 rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
              출발
            </div>
          </div>
        </div>
      )}
      {/* Range Slider */}
      <div className="flex items-end justify-end mt-3">
        <RangeSlider
          min={5}
          max={30}
          initialValue={5}
          onChange={(val) => console.log("Slider value:", val)}
        />
      </div>
      {/* 검정색 오버레이: 확장 상태(isExpanded true)일 때 렌더링 */}
      {isExpanded && <div className="fixed inset-0 bg-black opacity-50 z-35" />}
      {/* Bottom Sheet: 상단만 둥글게, 하단은 고정, NavigationBar보다 한 레이어 아래 */}
      <div
        ref={sheetRef}
        className="fixed w-full -mx-6 max-w-md	 px-8 bg-white rounded-t-[24px] shadow-[0_-4px_4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out"
        style={{ top: sheetTop, bottom: 0, zIndex: 40 }}
      >
        <div
          className="flex justify-center cursor-pointer h-6"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => handleDragStart(e.clientY, e.pointerId, e)}
          onPointerMove={(e) => handleDragMove(e.clientY)}
          onPointerUp={(e) => handleDragEnd(e.pointerId, e)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientY)}
          onTouchEnd={handleDragEnd}
        >
          <div className="mt-2 w-10 h-[3px] bg-gray-300 rounded-md" />
        </div>
        {isExpanded ? (
          <div className="pt-[8px]">
            <div className="bg-yellow-200 h-[300px] -mx-8"></div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <RatingBadge rating={3.4} />
                <div className="flex text-main-gray-200">
                  <Share className="mr-6" />
                  <BookmarkIcon />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <div className="flex">
                  <div className="text-[32px] font-light mr-2">감악산</div>
                  <div className="self-center">
                    <AltitudeBadge altitude={242} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-center h-[35px] text-[14px] bg-[#03C75A] text-main-white rounded-[24px] w-[66px] text-center shadow-[0_4px_4px_rgba(0,0,0,0.1)] ">
                    <span className="font-extrabold mr-1">N</span>
                    <span className="font-light text-[12px]">지도</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-2">
              <CapitalBadge capital={"경기도"} />
              <IsBacBadge />
            </div>
            <div className="text-[18px] font-thin mt-2">
              경기도 파주시 적성면
            </div>

            <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
              <div className="h-[44px] w-[165px] bg-main-green-200 text-main-white rounded-[24px] font-light flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
                등산 시작
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between pb-4">
            <div>
              <div className="flex mb-2">
                <div className="text-[24px] font-extralight mr-2">감악산</div>
                <div className="mt-2">
                  <AltitudeBadge altitude={242} />
                </div>
              </div>
              <div className="flex">
                <RatingBadge rating={3.4} />
                <span className="ml-2" />
                <CapitalBadge capital={"경기도"} />
                <IsBacBadge />
              </div>
            </div>
            <div>
              <div className="pt-4 pr-4">
                <BookmarkIcon />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* NavigationBar: 최상위 레이어보다 위에 있도록 */}
      {!isExpanded && (
        <div
          style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 50 }}
        >
          <NavigationBar />
        </div>
      )}
    </div>
  );
};

export default MyLocationPage;
