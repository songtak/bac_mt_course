import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share,
  BookmarkIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { parseGpx } from "../utils/gpxParser";
import { createNumberList, isMobile } from "../utils/helpers";
import dayjs from "dayjs";
import _ from "lodash";
import { getMountainWeather } from "../services/weatherApi";
import {
  getWeatherIconsAndValues,
  getWeatherEmoji,
} from "../utils/weaderHelpers";
import {
  customParseGpx,
  calculateElevationGain,
  calculate3DDistance,
  isWithinMeters,
} from "../utils/geoHeplers";
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
import * as BADGE from "../components/Badges/index";
import Header from "../components/Header";
import * as BUTTON from "../components/Buttons/index";

interface NaverMap {
  setCenter: (latlng: naver.maps.LatLng) => void;
  setZoom: (level: number) => void;
  fitBounds: (bounds: naver.maps.LatLngBounds) => void;
}

interface SummitLog {
  email: string;
  mountainId: number;
  createdAt: any; // Firestore timestamp
  // 추가적인 필드가 필요하면 여기에 정의하세요.
  // 예: courseId: number, notes: string, ...
}

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

function MapViewPage() {
  const userStore = useUserStore();
  const { mountainId } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef<NaverMap | null>(null);
  const mapElement = useRef<HTMLDivElement | NaverMap>(null);
  const polylineRef = useRef<naver.maps.Polyline | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null); // 내 위치 마커
  const mountainMarkerRef = useRef<naver.maps.Marker | null>(null); // 산 위치 마커
  const hasFetchedLocation = useRef(false);

  /** ================================================================================ */

  const [error, setError] = useState<string>("");
  /** 선택된 코스 */
  const [selectedCourse, setSelectedCourse] = useState<number>(0);
  const [courseStats, setCourseStats] = useState<
    { distance: number; elevation: number }[]
  >([]);
  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [locationButtonType, setLocationButtonType] = useState<"peak" | "user">(
    "peak"
  );
  /** 정산 도착 여부 */
  const [isPeak, setIsPeak] = useState<boolean>(false);
  /** 등산 완료 */
  const [isDone, setIsDone] = useState<boolean>(false);
  const [weatherEmojiList, setWeatherEmojiList] = useState<string[]>([]);
  const [weatherList, setWeatherList] = useState<any[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  /**  */
  const [bookmarkList, setBookmarkList] = useState<number[]>([]);

  // Firebase에서 mountainId로 산 정보 불러오기
  const [mountainData, setMountainData] = useState<Mountain | null>(null);

  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastColor, setToastColor] = useState<string>("blue");

  /** ================================================================================ */
  const user = auth.currentUser;

  /** 코스 목록 */
  const courseList: any[] = mountainData
    ? createNumberList(mountainData?.fileLength)
    : [];

  /** ================================================================================ */

  /** 등산 완료 버튼 */
  const handleClickPeakHunter = async () => {
    if (!user || !user.email) {
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    try {
      // 최근 summit 로그 조회: 같은 사용자, 같은 산에 대한 마지막 기록
      const summitQuery = query(
        collection(db, "summit"),
        where("email", "==", user.email),
        where("mountainId", "==", Number(mountainId)),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const summitSnapshot = await getDocs(summitQuery);
      if (!summitSnapshot.empty) {
        const lastLogData = summitSnapshot.docs[0].data();
        if (
          lastLogData.createdAt &&
          typeof lastLogData.createdAt.toDate === "function"
        ) {
          const lastDate = lastLogData.createdAt.toDate();
          const now = new Date();
          const diffMs = now.getTime() - lastDate.getTime();
          const diffHours = diffMs / (3600 * 1000);
          if (diffHours < 12) {
            setToastMessage(
              "마지막 등산 기록 후 12시간이 지나야 새 기록을 저장할 수 있습니다."
            );
            setToastColor("orange");
            setIsOpenToast(true);
            console.error(
              "마지막 등산 기록 후 12시간이 지나야 새 기록을 저장할 수 있습니다."
            );
            return;
          }
        }
      }

      // summit 로그 데이터를 구성합니다.
      const summitLog: SummitLog = {
        email: user.email,
        mountainId: Number(mountainId),
        createdAt: serverTimestamp(),
        // ... 추가 데이터
      };

      // summit 컬렉션에 새 문서를 추가합니다.
      const docRef = await addDoc(collection(db, "summit"), summitLog);
      console.log("등산 기록이 저장되었습니다. 문서 ID:", docRef.id);
      setToastMessage("봉우리 사냥 완료! ⛰️🔫");
      setToastColor("blue");
      setIsOpenToast(true);
      setIsDone(true);
    } catch (error) {
      console.error("등산 기록 저장 실패:", error);
    }
  };

  /** 공유하기 버튼 */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "이 링크를 공유합니다!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("공유 실패:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("주소가 복사되었습니다!");
      } catch (error) {
        console.error("클립보드 복사 실패:", error);
      }
    }
  };

  /** 코스 선택 */
  const handleClickCourse = async (course: number) => {
    setSelectedCourse(course);
    setMapAndMarkerAndCourse(course);
  };

  /** ================================================================================ */

  /** 북마크 정보 취득 */
  const getUserBookmarks = async (): Promise<number[]> => {
    if (!user || !user.email) {
      console.error("로그인된 사용자가 없습니다.");
      return [];
    }

    try {
      const bookmarkRef = doc(db, "bookmark", user.email);
      const bookmarkSnap = await getDoc(bookmarkRef);
      if (bookmarkSnap.exists()) {
        const data = bookmarkSnap.data();
        // mountainId 필드가 배열로 저장되어 있음

        setBookmarkList(data.mountainId);
        return data.mountainId || [];
      } else {
        // 북마크 문서가 없으면 빈 배열 반환
        return [];
      }
    } catch (error) {
      console.error("북마크 목록 호출 실패:", error);
      return [];
    }
  };

  // 지도 초기화 및 산 마커
  const setMapAndMarkerAndCourse = (courseId: number = 0) => {
    if (!mapElement.current || !mountainData) return;

    console.log("courseId", courseId);

    const mapOptions = {
      center: new naver.maps.LatLng(
        mountainData.latitude,
        mountainData.longitude
      ),
      zoom: 14,
      mapTypeControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map;

    // 산 위치 마커 추가 (다른 색상으로 표시)
    const mountainPosition = new naver.maps.LatLng(
      mountainData.latitude,
      mountainData.longitude
    );
    if (!mountainMarkerRef.current) {
      mountainMarkerRef.current = new naver.maps.Marker({
        position: mountainPosition,
        map: map,
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
          anchor: new naver.maps.Point(12, 12),
        },
      });
    } else {
      mountainMarkerRef.current.setPosition(mountainPosition);
      mountainMarkerRef.current.setMap(map);
    }

    console.log("✅ 네이버 지도 초기화 완료");

    if (courseId > 0 || selectedCourse > 0) {
      fetch(
        `https://songtak.github.io/bac_mt_course/assets/bac_gpx/${
          mountainData.name
        }/${mountainData.name}_00000000${
          (selectedCourse > 0 ? selectedCourse : courseId) < 10 ? "0" : ""
        }${selectedCourse > 0 ? selectedCourse : courseId}.gpx`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "track.gpx");
          return parseGpx(file);
        })
        .then((coordinates) => {
          if (coordinates.length > 0) {
            const path = coordinates.map(
              ([lat, lng]) => new naver.maps.LatLng(lat, lng)
            );
            polylineRef.current = new naver.maps.Polyline({
              path: path,
              strokeColor: "#fba12b",
              strokeWeight: 2,
              map: map,
            });
          }
        })
        .catch((err) => {
          setError("GPX 파일을 불러오는데 실패했습니다");
          console.error(err);
        });
    }

    if (!hasFetchedLocation.current) {
      setTimeout(() => getCurPosition(), 500);
      hasFetchedLocation.current = true;
    }

    return () => {
      if (polylineRef.current) polylineRef.current.setMap(null);
    };
  };

  // 현재 위치 마커 생성 (내 위치 마커는 markerRef에 저장)
  const getCurPosition = (isCenter: any = false) => {
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
            mapRef.current.setZoom(18);
          }

          if (markerRef.current) {
            console.log("✅ 기존 마커 위치 업데이트");
            markerRef.current.setPosition(newPosition);
            markerRef.current.setMap(mapRef.current);
          } else {
            console.log("🆕 새로운 마커 추가 (내 위치)");
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
        }
      },
      (error) => {
        console.error("❌ 위치 정보를 가져오는 데 실패했습니다.", error);
      }
    );
  };

  /** ================================================================================ */

  useEffect(() => {
    setMapAndMarkerAndCourse();
  }, [_.isEmpty(mountainData), selectedCourse]);

  useEffect(() => {
    if (!mapRef.current || currentMyLocation.lat === 0) return;

    const newPosition = new naver.maps.LatLng(
      currentMyLocation.lat,
      currentMyLocation.lng
    );

    if (
      mountainData &&
      isWithinMeters(
        currentMyLocation.lat,
        currentMyLocation.lng,
        mountainData.latitude,
        mountainData.longitude,
        100
      )
    ) {
      console.log("🎉 목표 지점 도착!");
      setIsPeak(true);
    } else {
      setIsPeak(false);
    }

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
  }, [currentMyLocation]);

  useEffect(() => {
    // getWeatherList();
  }, []);

  /** 코스 거리와 상승 고도 취득 */
  useEffect(() => {
    if (courseList.length === 0) return;

    const fetchCourseStats = async () => {
      try {
        const stats = await Promise.all(
          courseList.map(async (i) => {
            try {
              const response = await fetch(
                `https://songtak.github.io/bac_mt_course/assets/bac_gpx/${
                  mountainData.name
                }/${mountainData.name}_00000000${i < 10 ? "0" : ""}${i}.gpx`
              );
              if (!response.ok) throw new Error("파일 없음");

              const blob = await response.blob();
              const file = new File([blob], "track.gpx");
              const points = await customParseGpx(file);

              if (points.length > 0) {
                return {
                  distance: calculate3DDistance(points),
                  elevation: calculateElevationGain(points),
                };
              }
            } catch (error) {
              console.error(`코스 ${i} 정보를 불러오는 데 실패:`, error);
            }
            return { distance: 0, elevation: 0 };
          })
        );

        setCourseStats(stats);
      } catch (error) {
        console.error("코스 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    if (courseList.length && courseStats.length < courseList.length) {
      fetchCourseStats();
    }
  }, [courseList]);
  // }, [mountainData, courseList, courseStats]);

  useEffect(() => {
    if (user && user.email) {
      getUserBookmarks();
    }
  }, [user]);

  useEffect(() => {
    if (!mountainId) return;
    const fetchMountain = async () => {
      try {
        const docRef = doc(db, "mountains", mountainId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMountainData({ id: docSnap.id, ...docSnap.data() } as Mountain);
        } else {
          setError("해당 산을 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("Error fetching mountain:", err);
        setError("산 정보를 불러오는데 실패했습니다.");
      }
    };
    fetchMountain();
  }, [mountainId]);

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
      {/* <div className="min-h-screen bg-white"> */}
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
            className="flex items-center text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
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
        {!mountainData ? (
          <div className="text-center text-gray-500 mt-40">
            산 정보를 불러오는 중입니다...
          </div>
        ) : (
          <>
            {/* 산 정보 섹션 */}
            <section className="mb-8">
              {/* <div className="mb-2 flex items-center space-x-2 mb-2">
                {mountainData.capital && (
                  <span className="inline-block bg-gray-100 text-gray-700 text-[10px] px-2 py-[2px] rounded">
                    {mountainData.capital}
                  </span>
                )}
                {mountainData.isBac && (
                  <span className="inline-block bg-sky-100 text-sky-700 text-[10px] px-2 py-[2px] rounded ml-2">
                    100대 명산
                  </span>
                )}
              </div> */}
              <div className="flex justify-between">
                <div>
                  <div className="flex">
                    <h1 className="text-3xl text-gray-900">
                      {mountainData.name}
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg ml-2">
                      {mountainData.height} m
                    </p>
                  </div>
                  <div className="mt-2 flex items-center space-x-2 mb-2">
                    {mountainData.capital && (
                      <BADGE.CapitalBadge capital={mountainData.capital} />
                    )}
                    {mountainData.isBac && <BADGE.IsBacBadge />}
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleShare}
                      className="text-gray-600 hover:text-gray-800 transition"
                    >
                      <Share size={20} />
                    </button>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer"
                    >
                      <Bookmark
                        mountainId={Number(mountainId)}
                        bookmarkList={bookmarkList}
                        setBookmarkList={setBookmarkList}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-500 text-sm font-light">
                  {mountainData.address}
                </p>
                {/* <MessageCircleQuestionIcon className="items-end justify-end mt-4 hover:cursor-pointer" />
                <div className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                  여기에 툴팁 내용 입력
                </div> */}
              </div>
            </section>

            {/* 지도 섹션 */}
            <section className="mb-5">
              <div
                ref={mapElement}
                className="w-full h-80 rounded-lg overflow-hidden shadow-inner bg-gray-100"
              >
                {/* 네이버 지도 API를 적용할 컨테이너 */}
              </div>
            </section>

            <div className="flex justify-between items-center ">
              <BUTTON.NaverMapButton
                name={mountainData.name}
                latitude={mountainData.latitude}
                longitude={mountainData.longitude}
              />

              {locationButtonType !== "user" && (
                <BUTTON.BorderButton
                  content={
                    <span
                      onClick={() => {
                        getCurPosition(true);
                        setLocationButtonType("user");
                      }}
                    >
                      지금 내 위치
                    </span>
                  }
                />
              )}
              {locationButtonType !== "peak" && (
                <BUTTON.BorderButton
                  content={
                    <span
                      onClick={() => {
                        setMapAndMarkerAndCourse();
                        setLocationButtonType("peak");
                      }}
                    >
                      산으로 떠나기
                    </span>
                  }
                />
              )}
            </div>

            {/* 업데이트 정보 */}
            {/* <section className="text-center">
              <p className="text-sm text-gray-500">
                마지막 업데이트:{" "}
                {mountainData.updatedAt
                  ? toFormattedDate(mountainData.updatedAt)
                  : "정보 없음"}
              </p>
            </section> */}
          </>
        )}
        {courseList.length > 0 && (
          <div className="pt-10">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-gray-900">추천 코스</h2>
              <p className="text-xs text-gray-500">🚶 거리 ⛰ 상승고도</p>
            </div>
            <p className="mt-2 text-xs text-gray-500 font-light">
              코스 번호는 사용자 편의를 위해 임의로 설정한 값으로 실제 코스명과
              다를 수 있습니다.
            </p>
            <div className="mt-4 space-y-3">
              {courseList.map((item, i) => (
                <div
                  key={i}
                  onClick={() => handleClickCourse(item)}
                  className={`flex items-center p-3 rounded-lg border border-gray-200 transition 
            hover:shadow hover:bg-gray-50 hover:cursor-pointer ${
              selectedCourse === i + 1 ? "bg-gray-100" : ""
            }`}
                >
                  <span className="w-20 pl-3 text-lg font-light text-gray-900">
                    {item} 코스
                  </span>
                  {courseStats[i] && (
                    <span className="flex items-center text-xs text-gray-600 ml-4 space-x-4">
                      <div className="w-20 flex justify-between">
                        <span>🚶</span>
                        <span>{courseStats[i].distance.toFixed(1)} km</span>
                      </div>
                      <div className="w-24 flex justify-between">
                        <span>⛰</span>
                        <span>{courseStats[i].elevation.toFixed(0)} m</span>
                      </div>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {/* <footer className="py-4 text-center text-gray-500 text-xs border-t border-gray-200"> */}
      <footer className="py-4 text-center">
        <div className="flex items-center mt-4 justify-center">
          <BUTTON.FillButton
            content={
              <span
                className="text-base leading-[31px] font-light"
                onClick={() => isPeak && handleClickPeakHunter()}
              >
                {isPeak && isDone && "등산 완료 ✨"}
                {isPeak && !isDone && "봉우리 도착!"}
                {!isPeak && !isDone && "봉우리로 향하는 중..."}
              </span>
            }
            style={`

                ${
                  isPeak &&
                  isDone &&
                  "animate-shake bg-green-500 text-white cursor-not-allowed hover:cursor-default hover:bg-gray-400 pl-10 pr-7 py-10"
                }
                ${
                  isPeak &&
                  !isDone &&
                  "bg-sky-500 text-white hover:bg-blue-500 pl-10 pr-7 py-10"
                }
                ${
                  !isPeak &&
                  !isDone &&
                  "bg-gray-300 text-white cursor-not-allowed hover:cursor-default hover:bg-gray-400 px-10 py-10"
                }
                `}
          />
        </div>
      </footer>

      <Toast
        isOpen={isOpenToast}
        message={toastMessage}
        duration={3000}
        onClose={() => setIsOpenToast(false)}
      />
    </div>
  );
}

export default MapViewPage;
