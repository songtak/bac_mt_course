import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share, ArrowUp, ArrowDown } from "lucide-react";
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
    radiusInKm: number = 5
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
                  width:24px;
                  height:24px;
                  background:#ff3b30;
                  border-radius:50%;
                  border:3px solid white;
                  box-shadow:0px 0px 10px rgba(0,0,0,0.3);
                "></div>`,
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
            width:24px;
            height:24px;
            background:#ff3b30;
            border-radius:50%;
            border:3px solid white;
            box-shadow:0px 0px 10px rgba(0,0,0,0.3);
          "></div>`,
          anchor: new naver.maps.Point(12, 12),
        },
      });
    }
  }, [currentMyLocation]);

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
            width:20px;
            height:20px;
            background:#3b82f6;
            border-radius:50%;
            border:2px solid white;
            box-shadow: 0 0 8px rgba(0,0,0,0.2);
          "></div>`,
          anchor: new naver.maps.Point(10, 10),
        },
      });
      markersRef.current.push(marker);
    });
  }, [mountainData]);

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    getUserLocation();
  }, []);

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
      <header className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
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
          <span className="text-sm">내 주변 봉우리</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8">
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                주변 봉우리 목록{" "}
              </h2>
              {/* <p className="text-xs text-gray-500">🚶 거리 ⛰ 상승고도</p> */}
            </div>
            {/* mountainData */}
            {_.isArray(mountainData) &&
              mountainData.map((item: Mountain, i: number) => (
                <div
                  key={i}
                  onClick={() => navigate(`/map-detail/${item.id}`)}
                  className={`flex justify-between p-3 rounded-lg border border-gray-200 transition 
                hover:shadow hover:bg-gray-50 hover:cursor-pointer`}
                >
                  <div className="flex justify-between">
                    <span className="w-20 pl-3 text-lg font-light text-gray-900">
                      {item.name}
                    </span>
                    {item.isBac && (
                      <span className="inline-block bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded ml-2">
                        100대 명산
                      </span>
                    )}
                  </div>
                  <div className="mr-2 font-light">
                    <span>{item.height} m</span>
                  </div>
                </div>
              ))}
          </section>
          {/* 업데이트 정보 */}
          <section className="text-center mt-8">
            {/* 예: 마지막 업데이트 시간 */}
          </section>
        </>
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
    </div>
  );
}

export default MapPage;
