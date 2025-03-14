import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../utils/firebaseConfig";
import useUserStore from "../stores/useUserStore";
import Bookmark from "../components/Bookmark";
import Toast from "../components/Toast";
import { toFormattedDate } from "../utils/helpers";
import _ from "lodash";
import {
  customParseGpx,
  calculateElevationGain,
  calculate3DDistance,
  isWithinMeters,
} from "../utils/geoHeplers";
import * as BADGE from "../components/Badges/index";
import * as BUTTON from "../components/Buttons/index";
import Header from "../components/Header";

interface Mountain {
  id: string;
  name: string;
  height: number;
  latitude: number;
  longitude: number;
  capital: string;
  address: string;
  fileLength: number;
  gpxId?: string;
  reason?: string;
  isBac: boolean;
  code?: string;
}

interface SummitLog {
  email: string;
  mountainId: number;
  createdAt: any;
}

function MapPage() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const mapRef = useRef<any>(null);
  const mapElement = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null); // 내 위치 마커
  const markersRef = useRef<naver.maps.Marker[]>([]); // 산 마커
  const circleRef = useRef<naver.maps.Circle | null>(null); // 내 위치 기준 5km 원

  const [mountainData, setMountainData] = useState<Mountain | null>(null);
  const [error, setError] = useState<string>("");
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  /** 클릭한 산 */
  const [selectedMountain, setSelectedMountain] = useState<
    Mountain | undefined
  >();

  console.log("selectedMountain", selectedMountain);
  console.log("mountainData", mountainData);

  // 현재 위치 상태 (초기값은 0,0 → 이후 getCurPosition에서 업데이트)
  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const user = auth.currentUser;

  // 근처 산 정보 조회 함수 (생략 가능)
  const getNearbyMountains = async (
    userLat: number,
    userLon: number,
    radiusInKm: number = 10
  ) => {
    const latDelta = radiusInKm / 111;
    const lonDelta = radiusInKm / (111 * Math.cos(userLat * (Math.PI / 180)));

    const minLat = userLat - latDelta;
    const maxLat = userLat + latDelta;
    const minLon = userLon - lonDelta;
    const maxLon = userLon + lonDelta;

    const mountainsRef = collection(db, "mountains");
    const q = query(
      mountainsRef,
      where("latitude", ">=", minLat),
      where("latitude", "<=", maxLat),
      where("longitude", ">=", minLon),
      where("longitude", "<=", maxLon)
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const nearbyMountains = results.filter((mountain: any) =>
      isWithinMeters(
        userLat,
        userLon,
        mountain.latitude,
        mountain.longitude,
        radiusInKm
      )
    );

    console.log("nearbyMountains", nearbyMountains);
    // @ts-ignore
    setMountainData(results);
  };

  // 내 위치를 받아 마커와 5km 반경 동그라미를 생성/업데이트하는 함수
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
                content: `<div style="
                width:12px;
                height:12px;
                // background: #ff3b30;
                // border-radius:50%;
                // border:1px solid #ffffff;
                // box-shadow:0px 0px 10px rgba(0,0,0,0.3);
              ">📍</div>`,
                anchor: new naver.maps.Point(12, 12),
              },
            });
            console.log("🎯 내 위치 마커 추가:", markerRef.current);
          }
          // 내 위치 기준 5km 반경 동그라미 생성 또는 업데이트
          if (circleRef.current) {
            circleRef.current.setCenter(newPosition);
          } else {
            circleRef.current = new naver.maps.Circle({
              map: mapRef.current,
              center: newPosition,
              radius: 10000, // 5km
              strokeColor: "#0000FF", // 파란색 외곽선
              strokeOpacity: 0.5,
              strokeWeight: 2,
              fillColor: "#0000FF", // 파란색 채우기
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

  // 지도 초기화 함수
  const initMap = () => {
    if (!mapElement.current) return;
    // currentMyLocation가 업데이트되지 않았을 경우, fallback 좌표 사용 (예: 서울 중심)
    const centerLat =
      currentMyLocation.lat !== 0 ? currentMyLocation.lat : 37.5665;
    const centerLng =
      currentMyLocation.lng !== 0 ? currentMyLocation.lng : 126.978;
    const mapOptions = {
      center: new naver.maps.LatLng(centerLat, centerLng),
      zoom: 11,
      mapTypeControl: true,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map;
    getCurPosition(true);
  };

  // 사용자 위치 취득 및 주변 산 조회
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log("내 위치:", lat, lng);
          setCurrentMyLocation({ lat, lng });
          // 주변 산 정보 호출 (필요 시 추가)
          getNearbyMountains(lat, lng);
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다.", error);
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };
  /** ================================================================================ */

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !mountainData || mountainData.length === 0) return;

    // 기존 마커 모두 삭제
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // mountainData의 각 요소에 대해 파란색 마커 생성
    mountainData.forEach((mountain) => {
      const position = new naver.maps.LatLng(
        mountain.latitude,
        mountain.longitude
      );
      const marker = new naver.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          content: `<div style="
          width:18px;
          height:18px;
          background:#FCD34D; /* Tailwind yellow-300와 유사한 색상 */
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          border:1px solid white;
          box-shadow:0 0 8px rgba(0,0,0,0.2);
        ">⛰️</div>`,
          anchor: new naver.maps.Point(10, 10),
        },
      });

      // 마커 클릭 이벤트 추가: 클릭 시 상세 페이지로 이동 예시
      naver.maps.Event.addListener(marker, "click", () => {
        // navigate(`/map-detail/${mountain.id}`);
        // 혹은 다른 동작을 수행할 수 있습니다.
        setSelectedMountain(mountain);
        // 마커의 위치로 지도 중심 변경
        const markerPosition = marker.getPosition();
        mapRef.current.setCenter(markerPosition);
        // 원하는 줌 레벨로 설정 (예: 16)
        mapRef.current.setZoom(13);
        getCurPosition();
      });

      markersRef.current.push(marker);
    });
  }, [mountainData]);

  // currentMyLocation 변경 시 마커 업데이트
  useEffect(() => {
    if (!mapRef.current || currentMyLocation.lat === 0) return;
    const newPosition = new naver.maps.LatLng(
      currentMyLocation.lat,
      currentMyLocation.lng
    );
    if (markerRef.current) {
      markerRef.current.setPosition(newPosition);
    } else {
      markerRef.current = new naver.maps.Marker({
        position: newPosition,
        map: mapRef.current,
        icon: {
          content: `<div style="
              width:16px;
              height:16px;
              background: white;
              border-radius:50%;
              border:2px solid #ff3b30;
              box-shadow:0px 0px 10px rgba(0,0,0,0.3);
            "></div>`,
          anchor: new naver.maps.Point(12, 12),
        },
      });
    }
  }, [currentMyLocation]);

  /** ================================================================================ */
  const openExternalLink = () => {
    window.open(
      "https://www.instagram.com/sn9tk",
      "_blank",
      "noopener,noreferrer"
    );
  };
  /** ================================================================================ */

  return (
    <div className="min-h-screen bg-cover bg-center animate-pan flex flex-col">
      {/* Header */}

      <Header
        left={
          <button
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
              } else {
                navigate("/list");
              }
            }}
            className="flex items-center text-gray-500 hover:text-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {/* <span className="text-sm">내 주변 봉우리</span> */}
          </button>
        }
        right={
          <nav className="space-x-6">
            {!userStore.isLogin ? (
              <span
                onClick={() => navigate("/sign-in")}
                className="cursor-pointer font-light text-gray-900 transition hover:underline"
              >
                로그인
              </span>
            ) : (
              <span
                onClick={() => navigate("/my")}
                className="cursor-pointer font-light text-gray-900 transition hover:underline"
              >
                {userStore.userInfo?.nickname} 🦖
              </span>
            )}
          </nav>
        }
      />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-screen-lg mx-auto px-6 py-8">
        <>
          {/* 산 정보 섹션 (필요 시 추가) */}

          {/* 지도 섹션 */}
          <section className="mb-8">
            <div
              ref={mapElement}
              className="w-full h-80 rounded-lg overflow-hidden shadow-inner bg-gray-100"
            >
              {/* 네이버 지도 API가 적용될 영역 */}
            </div>
          </section>

          {/* 액션 버튼 그룹 (필요 시 추가) */}
          <section className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
            {/* 예: 내 위치 재조회 버튼 */}
          </section>
          <section>
            <div className="flex justify-between">
              <h2 className="text-xl font-light text-gray-900 mb-4">
                주변 봉우리 목록{" "}
                <span className="text-gray-400">
                  {_.isArray(mountainData) ? mountainData.length : 0}
                </span>
              </h2>
              <BUTTON.BorderButton
                content={
                  <span
                    onClick={() => {
                      getCurPosition(true);
                      setSelectedMountain(undefined);
                      // setLocationButtonType("user");
                    }}
                  >
                    지금 내 위치
                  </span>
                }
              />

              {/* <p className="text-xs text-gray-500">🚶 거리 ⛰ 상승고도</p> */}
            </div>
            {/* mountainData */}
            {_.isArray(mountainData) &&
              mountainData.map((item: Mountain, i: number) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedMountain(item);
                    if (mapRef.current) {
                      const newCenter = new naver.maps.LatLng(
                        item.latitude,
                        item.longitude
                      );
                      mapRef.current.setCenter(newCenter);
                      mapRef.current.setZoom(12); // 원하는 줌 레벨로 변경
                    }
                  }}
                  className={`flex justify-between px-2 py-2 rounded-lg border border-gray-200 transition hover:shadow hover:bg-gray-50 hover:cursor-pointer mb-2 ${
                    selectedMountain?.id === item.id && "bg-gray-100"
                  }`}
                >
                  <div className="flex items-center w-full">
                    {/* 이름 영역 고정 너비 */}
                    <div
                      className="pl-3 text-[16px] font-light text-gray-900 flex items-center"
                      style={{ width: "150px" }}
                    >
                      {item.name}
                      {item.isBac && <BADGE.IsBacBadge style="mt-1" />}
                    </div>
                    {/* 높이 영역: flex-1과 text-right 적용 */}
                    <div className="flex-1 mr-2 mt-[2px] text-[14px] text-gray-500 font-light text-right">
                      <span>{item.height} m</span>
                    </div>
                  </div>
                  <div
                    className="w-10 hover:cursor-pointer"
                    onClick={() => {
                      navigate(`/map-detail/${item.id}`);
                    }}
                  >
                    <ArrowRight className="text-gray-600 w-5 h-5 mt-1 ml-3 transition-transform duration-300 hover:animate-arrow-shake" />
                  </div>
                </div>
              ))}
          </section>
          {/* 업데이트 정보 */}
          <section className="text-center mt-8">
            {/* 예: 마지막 업데이트 시간 */}
          </section>
        </>
        <div
          onClick={() => {
            navigate("/list");
          }}
          className="px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 cursor-pointer text-center"
        >
          <div className="text-lg font-light text-gray-900 mb-1">
            아직 찾지 못한 봉우리가 있나요?
          </div>
          <div className="text-sm text-gray-600">전체 목록에서 둘러보기</div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="py-4 text-center text-gray-500 text-xs border-t border-gray-200">
        <div
          className="hover:cursor-pointer font-lightr"
          onClick={() => {
            openExternalLink();
          }}
        >
          Created by Songtak.
        </div>
      </footer> */}

      <Toast
        isOpen={isOpenToast}
        message={toastMessage}
        duration={3000}
        onClose={() => setIsOpenToast(false)}
      />
      <style>{`
  @keyframes arrowShake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    50% {
      transform: translateX(2px);
    }
    75% {
      transform: translateX(-2px);
    }
    100% {
      transform: translateX(0);
    }
  }
  .animate-arrow-shake {
    animation: arrowShake 0.5s ease-in-out;
  }
`}</style>
    </div>
  );
}

export default MapPage;
