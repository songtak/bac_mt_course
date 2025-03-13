import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share, BookmarkIcon } from "lucide-react";
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
  const [isPeak, setIsPeak] = useState<boolean>(false);
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
            width:24px;
            height:24px;
            background:#007AFF;
            border-radius:50%;
            border:3px solid white;
          "></div>`,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="container mx-auto p-4 px-4"
        style={{ maxWidth: "700px", minWidth: "300px" }}
      >
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => navigate(-1)}
            // onClick={() => navigate("/list")}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
          </button>
          {!userStore.isLogin ? (
            <div
              className="h-10 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 hover:cursor-pointer transition"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              로그인
              {/* 산행 시작하기 */}
            </div>
          ) : (
            <div
              className="h-10 px-4 py-1.5 bg-white font-bold text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:cursor-pointer hover:text-white transition"
              onClick={() => {
                navigate("/my");
              }}
            >
              {userStore.userInfo?.nickname}
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          {/* {error && <p className="mb-4 text-red-500">{error}</p>} */}

          {!mountainData ? (
            <div className="mt-40 pb-60 animate-bounce text-center text-gray-500">
              🦅 산 정보 확인 중!
            </div>
          ) : (
            // <div>산 정보를 불러오는 중입니다...</div>
            <>
              <div className="flex justify-between pb-4">
                <div className="">
                  <span className="text-2xl font-bold  pr-2">
                    {mountainData.name}
                    <span className="pl-2 py-1 text-lg font-normal text-gray-500">
                      {mountainData.height} m
                    </span>
                  </span>
                  <div className="flex">
                    {mountainData.capital && (
                      <div className=" pr-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
                          {mountainData.capital}
                        </span>
                      </div>
                    )}
                    {mountainData.isBac && (
                      <div className=" pr-2">
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-1">
                          100대 명산
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className=" flex justify-between"
                  style={{ width: "60px" }}
                >
                  <Share
                    className="cursor-pointer"
                    onClick={handleShare}
                    color="gray"
                    // size={22}
                  />
                  <div
                    className="pointer-events-none"
                    onClick={(e) => e.stopPropagation()} // 이벤트 버블링 방지
                  >
                    <Bookmark
                      mountainId={Number(mountainId)}
                      bookmarkList={bookmarkList}
                      setBookmarkList={setBookmarkList}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center gap-4 text-3xl">
                {weatherList.map((item, i) => (
                  <div
                    key={i}
                    className={`cursor-pointer transition-transform duration-200 hover:scale-125 ${
                      selectedIcon === item.emoji
                        ? "scale-150 text-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedIcon(item.emoji)}
                  >
                    {item.emoji}
                  </div>
                ))}
              </div>
              <div className=" text-stone-600 pb-4 ">
                {mountainData.address}
              </div>
              <div className="font-thin pb-4">{mountainData.reason}</div>
              <div
                ref={mapElement}
                className={`w-full ${
                  isMobile() ? "h-[300px]" : "h-[360px]"
                } rounded-lg overflow-hidden shadow-inner`}
              />
              <div className="flex justify-between">
                <div>
                  {locationButtonType !== "user" && (
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          getCurPosition(true);
                          // setSelectedCourse(0);
                          setLocationButtonType("user");
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                      >
                        내 위치
                      </button>
                    </div>
                  )}
                  {locationButtonType !== "peak" && (
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          setMapAndMarkerAndCourse();
                          setLocationButtonType("peak");
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                      >
                        산으로
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    // disabled={!isPeak}
                    onClick={() => handleClickPeakHunter()}
                    className={`px-4 py-2 ${
                      isPeak ? "bg-blue-500" : "bg-gray-500"
                    } text-white rounded-md shadow-md hover:${
                      isPeak && "bg-blue-600"
                    } transition`}
                  >
                    등산완료
                  </button>
                </div>
              </div>
              {courseList.length > 0 && (
                <div className="pt-10">
                  <div className="text-2xl justify-between flex">
                    <div>추천 코스</div>
                    <div className="text-[1px] ml-2 opacity-75">
                      🚶 거리 ⛰ 상승고도
                    </div>
                  </div>
                  <div className="font-thin pb-4 text-[10px] text-gray-500">
                    코스 번호는 사용자 편의를 위해 임의로 설정한 값으로 실제
                    코스명과 다를 수 있습니다.
                  </div>
                  {courseList.map((item, i) => (
                    <div
                      key={i}
                      className={`flex pt-1 pb-1 hover:shadow-md hover:bg-sky-50 cursor-pointer ${
                        selectedCourse === i + 1 && "bg-sky-100 opacity-95"
                      } rounded-lg`}
                      onClick={() => handleClickCourse(item)}
                    >
                      <span
                        style={{ width: "80px" }}
                        className={`cursor-pointer text-lg ${
                          selectedCourse === i + 1
                            ? "text-slate-900"
                            : "text-slate-500"
                        } pl-3`}
                      >
                        {item} 코스
                      </span>
                      {courseStats[i] && (
                        <span className="flex text-sm text-gray-600 ml-4">
                          <div
                            style={{ width: "80px" }}
                            className="flex justify-between"
                          >
                            <div>🚶</div>
                            <div>{courseStats[i].distance.toFixed(1)} km</div>
                          </div>
                          <div className="pl-4"></div>
                          <div
                            className="flex pl-4 justify-between"
                            style={{ width: "90px" }}
                          >
                            <div>⛰</div>
                            <div>{courseStats[i].elevation.toFixed(0)} m</div>
                          </div>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="font-thin pt-4 text-xs opacity-70">
          <span>⚠️ 산 정보에 일부 오차가 있을 수 있습니다. </span>
          <span
            className="text-blue-600 font-bold cursor-pointer underline"
            onClick={() => {}}
          >
            알려주시면
          </span>
          <span> 빠르게 반영하겠습니다!</span>
        </div>
      </div>
      <Toast
        isOpen={isOpenToast}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        onClose={() => {
          setIsOpenToast(false);
        }}
      />
    </div>
  );
}

export default MapViewPage;
