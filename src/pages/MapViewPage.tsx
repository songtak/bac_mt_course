import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share, BookmarkIcon } from "lucide-react";
import { parseGpx } from "../utils/gpxParser";
import { mountains, createNumberList, isMobile } from "../utils/helpers";
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
  isWithin50Meters,
} from "../utils/geoHeplers";

interface NaverMap {
  setCenter: (latlng: naver.maps.LatLng) => void;
  setZoom: (level: number) => void;
  fitBounds: (bounds: naver.maps.LatLngBounds) => void;
}

function MapViewPage() {
  const { mountainName } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef<NaverMap | null>(null);
  const mapElement = useRef<HTMLDivElement | NaverMap>(null);
  const polylineRef = useRef<naver.maps.Polyline | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);
  const hasFetchedLocation = useRef(false);

  const [error, setError] = useState<string>("");
  /** 선택한 코스 */
  const [selectedCourse, setSelectedCourse] = useState<number>(1);
  /** 코스 정보 목록 */
  const [courseStats, setCourseStats] = useState<
    { distance: number; elevation: number }[]
  >([]);

  /** 내 위치 정보 */
  const [currentMyLocation, setCurrentMyLocation] = useState({
    lat: 0,
    lng: 0,
  });

  /** 보여줄 위치의 버튼 타입 */
  const [locationButtonType, setLocationButtonType] = useState<"peak" | "user">(
    "peak"
  );

  /** 정상인지 판별 */
  const [isPeak, setIsPeak] = useState<boolean>(false);

  /** 날씨 이모지 */
  const [weatherEmojiList, setWeatherEmojiList] = useState<string[]>([]);
  /** 이모지 + fcstValue 배열 */
  const [weatherList, setWeatherList] = useState<any[]>([]);

  /** 선택된 날씨 이모지 */
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  /** 산 정보 */
  const mountain = mountains().find((m) => m.name === mountainName);

  /** 코스 갯수 */
  const courseList = createNumberList(mountain?.fileLength as number);

  console.log("locationButtonType", locationButtonType);

  /** ======================================================================== */

  /** 코스 선택 */
  const handleClickCourse = async (course: number) => {
    setSelectedCourse(course);
  };

  /** 등산 완료 버튼 클릭 */
  const handleClickPeakHunter = () => {};

  const handleShare = async () => {
    if (navigator.share) {
      // 모바일 기기에서 네이티브 공유
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
      // 웹에서는 클립보드 복사
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("주소가 복사되었습니다!");
      } catch (error) {
        console.error("클립보드 복사 실패:", error);
      }
    }
  };

  /** 코스를 맵에 보여주기 및 산으로 시점 포커스 */
  const setGpxCourseAndPocusMap = () => {
    if (!mapElement.current || !mountain) return;

    const mapOptions = {
      center: new naver.maps.LatLng(mountain.lat, mountain.lot),
      zoom: 12,
      mapTypeControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map; // ✅ mapRef를 저장하여 참조 유지

    // setTimeout(() => {
    //   const circle = new naver.maps.Circle({
    //     map: mapRef.current,
    //     center: new naver.maps.LatLng(mountain.lat, mountain.lon),
    //     radius: 50,
    //     fillColor: "#ff0000",
    //     fillOpacity: 0.8, // ✅ 더 불투명하게 설정
    //     strokeColor: "#ff0000",
    //     strokeOpacity: 1,
    //     strokeWeight: 5, // ✅ 테두리 두껍게
    //     zIndex: 1000, // ✅ 다른 요소보다 위로 표시
    //   });

    //   console.log("✅ 네이버 지도 원 추가됨:", circle);

    //   // ✅ 원이 지도에서 보이도록 지도 중심 이동
    //   mapRef.current.setCenter(
    //     new naver.maps.LatLng(mountain.lat, mountain.lon)
    //   );

    //   // ✅ 원이 지도 화면 안에 들어오도록 자동 조정
    //   const bounds = new naver.maps.LatLngBounds();
    //   bounds.extend(new naver.maps.LatLng(mountain.lat, mountain.lon));
    //   mapRef.current.fitBounds(bounds);
    // }, 1000); // ✅ 지도 로드 후 1초 뒤 원 추가

    console.log("✅ 네이버 지도 초기화 완료");
    fetch(
      `https://songtak.github.io/bac_mt_course/assets/bac_gpx/${
        mountain.name
      }/${mountain.name}_00000000${
        selectedCourse < 10 ? "0" : ""
      }${selectedCourse}.gpx`
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
          // setPeakLocation({lat:lat, lng:lng})

          polylineRef.current = new naver.maps.Polyline({
            path: path,
            strokeColor: "#fba12b",
            strokeWeight: 3,
            map: map,
          });
        }
      })
      .catch((err) => {
        setError("GPX 파일을 불러오는데 실패했습니다");
        console.error(err);
      });

    // ✅ **지도 초기화 후 위치 가져오기 (최초 한 번만 실행)**
    if (!hasFetchedLocation.current) {
      setTimeout(() => getCurPosition(), 500); // 💡 지도 초기화 후 0.5초 뒤 실행
      hasFetchedLocation.current = true;
    }

    return () => {
      if (polylineRef.current) polylineRef.current.setMap(null);
    };
  };
  /** ======================================================================== */

  /** 📍 현재 위치 가져오는 함수 */
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
            mapRef.current.setZoom(18); // 🔹 원하는 줌 레벨로 설정 (예: 16)
          }

          if (markerRef.current) {
            console.log("✅ 기존 마커 위치 업데이트");
            markerRef.current.setPosition(newPosition);
            markerRef.current.setMap(mapRef.current);
          } else {
            console.log("🆕 새로운 마커 추가");
            markerRef.current = new naver.maps.Marker({
              position: newPosition,
              map: mapRef.current,
              icon: {
                content: `
                <div style="
                  width:24px;
                  height:24px;
                  background:#ff3b30;
                  border-radius:50%;
                  border:3px solid white;
                  box-shadow:0px 0px 10px rgba(0,0,0,0.3);
                  z-index: 9999;
                "></div>`,
                anchor: new naver.maps.Point(12, 12),
              },
            });
            console.log("🎯 마커가 추가되었습니다.", markerRef.current);
          }
        }
      },
      (error) => {
        console.error("❌ 위치 정보를 가져오는 데 실패했습니다.", error);
      }
    );
  };

  /** ======================================================================== */

  // 날씨 데이터를 가져오고 이모지를 매핑하는 함수
  const getWeatherList = async () => {
    const weatherList = await getMountainWeather();
    console.log("weatherList", weatherList);

    // 1. 현재 날짜 구하기 (YYYYMMDD 포맷)
    const today = dayjs().format("YYYYMMDD");

    // 2. 오늘 날짜의 fcstBase 데이터만 필터링
    const todayData = weatherList.filter((d: any) => d.fcstBase === today);

    if (todayData.length === 0) {
      console.log("오늘 날짜의 예보 데이터가 없습니다.");
      return;
    }

    // 3. 가장 가까운 fcstTime 찾기
    const now = parseInt(dayjs().format("HHmm"), 10);
    const closestFcstTime = todayData
      .map((d: any) => parseInt(d.fcstTime, 10))
      .sort((a, b) => Math.abs(now - a) - Math.abs(now - b))[0];

    // 4. 해당 fcstTime의 모든 카테고리 데이터 필터링
    const filteredData = todayData.filter(
      (d: any) => parseInt(d.fcstTime, 10) === closestFcstTime
    );

    // 5. SKY 코드 변환 예외처리
    const SKY_MAPPING: Record<string, string> = {
      "1.0": "맑음",
      "3.0": "구름많음",
      "4.0": "흐림",
    };
    filteredData.forEach((d: any) => {
      if (d.category === "SKY") {
        d.fcstValue = SKY_MAPPING[d.fcstValue] || d.fcstValue;
      }
    });

    // 6. POP(강수확률) 값 변환 (소수점 제거)
    filteredData.forEach((d: any) => {
      if (d.category === "POP") {
        d.fcstValue = `${parseInt(d.fcstValue, 10)}`;
      }
    });

    // 7. 이모지 + fcstValue 배열 반환
    const weatherData = getWeatherIconsAndValues(filteredData);
    setWeatherList(weatherData);
    console.log("🌈 최종 날씨 데이터:", weatherData);
  };

  /** ======================================================================== */

  /** 산 코스 취득 */
  useEffect(() => {
    setGpxCourseAndPocusMap();
  }, [_.isEmpty(mountain), selectedCourse]);

  /** ✅ `currentMyLocation`이 변경될 때 마커 업데이트 */
  useEffect(() => {
    if (!mapRef.current || currentMyLocation.lat === 0) return;

    const newPosition = new naver.maps.LatLng(
      currentMyLocation.lat,
      currentMyLocation.lng
    );

    if (
      isWithin50Meters(
        currentMyLocation.lat,
        currentMyLocation.lng,
        mountain.lat,
        mountain.lon
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
          content: `
          <div style="
            width:24px;
            height:24px;
            background:#ff3b30;
            border-radius:50%;
            border:3px solid white;
            box-shadow:0px 0px 10px rgba(0,0,0,0.3);
            z-index: 9999;
          "></div>`,
          anchor: new naver.maps.Point(12, 12),
        },
      });

      console.log("🎯 마커가 추가되었습니다.", markerRef.current);
    }
  }, [currentMyLocation]);

  /** 날씨 정보 취득 */
  useEffect(() => {
    getWeatherList();
  }, []);

  if (!mountain) {
    return <div>산을 찾을 수 없습니다.</div>;
  }

  /** 산 코스 길이와 상승 고도 취득 */
  useEffect(() => {
    if (!mountain) return;

    const fetchCourseStats = async () => {
      try {
        const stats = await Promise.all(
          courseList.map(async (i) => {
            try {
              const response = await fetch(
                `https://songtak.github.io/bac_mt_course/assets/bac_gpx/${
                  mountain.name
                }/${mountain.name}_00000000${i < 10 ? "0" : ""}${i}.gpx`
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
    if (courseStats.length < courseList.length) {
      fetchCourseStats();
    }
  }, [mountain, courseList, courseStats]); // 🚨 mountain이 변경될 때만 실행되도록 제한
  /** =-=-=-=-=-=-=-=-=-=-=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= */

  /** =-=-=-=-=-=-=-=-=-=-=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= */

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4" style={{ maxWidth: "700px" }}>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/list")}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
            </button>
          </div>

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <div>
            <div className="flex justify-between pb-4">
              <div className="flex">
                <h1 className="text-2xl font-bold pt-4 pr-2">
                  {mountain.name}
                </h1>

                {mountain.ctpvNm && (
                  <div className="pt-3 pr-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                      {mountain.ctpvNm}
                    </span>
                  </div>
                )}
              </div>

              <div
                className="pt-5 flex  justify-between"
                style={{ width: "60px" }}
              >
                <Share className="cursor-pointer" onClick={handleShare} />
                <BookmarkIcon
                  // fill="orange"
                  // color="orange"
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="w-full flex justify-center items-center gap-4 text-3xl">
              {weatherList.map((item, i) => (
                <div
                  key={i}
                  className={`cursor-pointer transition-transform duration-200 hover:scale-125 ${
                    selectedIcon === item.emoji ? "scale-150 text-blue-500" : ""
                  }`}
                  onClick={() => setSelectedIcon(item.emoji)}
                >
                  {item.emoji}
                </div>
              ))}
            </div>
            {/* {weatherEmojiList.length > 0 && (
              <div className="w-full flex justify-center items-center pb-10">
                {weatherEmojiList.map((item: any, i: number) => (
                  <div key={i} className="text-4xl">
                    {item}
                  </div>
                ))}
              </div>
            )} */}

            <div className=" text-stone-600 pb-4 ">{mountain.address}</div>
            <div className="font-thin pb-6">{mountain.reason}</div>

            <div
              ref={mapElement}
              className={`w-full ${
                isMobile() ? "h-[180px]" : "h-[360px]"
              } rounded-lg overflow-hidden shadow-inner`}
            />
            {locationButtonType !== "user" && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    getCurPosition(true);
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
                    setGpxCourseAndPocusMap();
                    setLocationButtonType("peak");
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                >
                  산으로
                </button>
              </div>
            )}

            <div className="mt-4">
              <button
                disabled={!isPeak}
                onClick={() => {
                  handleClickPeakHunter();
                }}
                className={`px-4 py-2 ${
                  isPeak ? "bg-blue-500" : "bg-gray-500"
                } text-white rounded-md shadow-md hover:${
                  isPeak && "bg-blue-600"
                } transition`}
              >
                등산완료
              </button>
            </div>

            <div className="pt-10">
              <div className="text-2xl ">추천 코스</div>
              <div className="font-thin pb-4 text-xs">
                (* 코스 번호는 사용자 편의를 위해 임의로 설정한 값으로 실제
                코스명과 다를 수 있습니다.)
              </div>
              {courseList.map((item, i) => (
                <div
                  key={i}
                  className={`flex pt-1 pb-1 hover:shadow-md hover:bg-sky-50 cursor-pointer ${
                    selectedCourse === i + 1 && "bg-sky-100 opacity-95"
                  } rounded-lg
                  `}
                  onClick={() => {
                    handleClickCourse(item);
                  }}
                >
                  <span
                    style={{ width: "80px" }}
                    className={`cursor-pointer text-lg ${
                      selectedCourse === i + 1
                        ? "text-slate-900"
                        : "text-slate-500"
                    }  pl-3`}
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
                        className=" flex pl-4 justify-between"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapViewPage;
