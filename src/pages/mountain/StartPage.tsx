import React, { useState, useRef, useEffect } from "react";

// 아 이 화면은 앱에서 만드는게 좋을 듯

const StartPage = () => {
  /** ===[MAP]========================================================================= */
  // 지도 관련 refs
  const mapElement = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  // 산 마커들을 담을 ref (삭제, 업데이트용)
  const mountainMarkersRef = useRef([]);

  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0,
  });

  // 네이버 지도 초기화
  const initMap = () => {
    if (!mapElement.current) return;
    const centerLat =
      currentMyLocation.lat !== 0 ? currentMyLocation.lat : 37.5665;
    const centerLng =
      currentMyLocation.lng !== 0 ? currentMyLocation.lng : 126.978;
    const mapOptions = {
      center: new naver.maps.LatLng(centerLat, centerLng),
      zoom: 14,
      mapTypeControl: true,
    };
    mapRef.current = new naver.maps.Map(mapElement.current, mapOptions);
    // 내 위치 및 반경 원 업데이트
    getCurPosition(true);
  };

  // 사용자 현재 위치 및 지도 업데이트
  const getCurPosition = (isCenter = false) => {
    if (!navigator.geolocation) {
      console.error("Geolocation을 지원하지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentMyLocation({ lat, lng });
        if (mapRef.current) {
          const newPosition = new naver.maps.LatLng(lat, lng);
          if (isCenter) {
            mapRef.current.setCenter(newPosition);
            mapRef.current.setZoom(14);
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

          // 산 마커 업데이트 (파이어베이스에서 데이터 조회)
        }
      },
      (error) => console.error("❌ 위치 정보를 가져오지 못했습니다.", error)
    );
  };

  // 초기 지도 및 위치 설정
  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className="touch-none h-full">
      <div className="absolute inset-0">
        <div ref={mapElement} className="w-full h-full" />
      </div>
      {/* 하단 오른쪽 플로팅 버튼 */}
      <div className="fixed inset-x-0 bottom-10 z-30 flex justify-center">
        <button
          className="h-[80px] w-[80px] text-[20px] bg-main-green-200 text-main-white rounded-full flex items-center justify-center shadow-lg"
          onClick={() => {
            // 시작 로직
          }}
        >
          시작
        </button>
      </div>
    </div>
  );
};

export default StartPage;
