import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share, BookmarkIcon } from "lucide-react";
// import { mountains } from "../data/mountains";
import { parseGpx } from "../utils/gpxParser";
import { mountains, createNumberList, isMobile } from "../utils/helpers";
import dayjs from "dayjs";
import _ from "lodash";
import { getMountainWeather } from "../services/weatherApi";
import { weatherCode, weatherEmoji } from "../models/weather"; // JSON 데이터 import

interface NaverMap {
  setCenter: (latlng: naver.maps.LatLng) => void;
  setZoom: (level: number) => void;
  fitBounds: (bounds: naver.maps.LatLngBounds) => void;
}

function MapViewPage() {
  const { mountainName } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const mapRef = useRef<NaverMap | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const polylineRef = useRef<naver.maps.Polyline | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

  // console.log("mapElement", mapElement);

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
  const [locationLoading, setLocationLoading] = useState(false);

  /** 날씨 이모지 */
  const [weatherEmojiList, setWeatherEmojiList] = useState<string[]>([]);
  const [weatherList, setWeatherList] = useState<any[]>([]);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const mountain = mountains().find((m) => m.name === mountainName);

  const courseList = createNumberList(mountain?.fileLength as number);

  const handleClickCourse = (course: number) => {
    setSelectedCourse(course);
  };

  const getCurPosition = () => {
    setLocationLoading(true);
    const success = (location) => {
      setCurrentMyLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setLocationLoading(false);
    };

    const error = () => {
      setCurrentMyLocation({ lat: 37.5666103, lng: 126.9783882 });
      setLocationLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  // console.log("currentMyLocation", currentMyLocation);
  const getNearestPastHour = () => {
    return dayjs().minute() === 0
      ? dayjs().subtract(1, "hour").startOf("hour").format("HHmm") // 정시라면 한 시간 전 반환
      : dayjs().startOf("hour").format("HHmm"); // 정시가 아니면 현재 시간의 정시 반환
  };

  /** ======================================================================== */
  const getWeatherIconsAndValues = (filteredData: any[]) => {
    return filteredData.map((d: any) => ({
      emoji: getWeatherEmoji(d.category, d.fcstValue),
      value: d.fcstValue, // 원본 fcstValue 그대로 반환
    }));
  };

  // 특정 값에 맞는 라벨 찾기 (범위 기반)
  const getWeatherLabel = (category: string, value: string | number) => {
    const categoryData = weatherCode[category];
    if (!categoryData || !categoryData.range) return value; // 범위 데이터가 없으면 그대로 반환

    if (Array.isArray(categoryData.range)) {
      if (value === "강수없음" || value === "적설없음") return value; // 강수/적설 없음 그대로 반환
      const numericValue = parseFloat(value as string); // 숫자로 변환
      if (isNaN(numericValue)) return value; // 숫자가 아닐 경우 원래 값 반환

      const rangeMatch = categoryData.range.find(
        (r) => numericValue >= r.min && (r.max === null || numericValue < r.max)
      );
      return rangeMatch ? rangeMatch.label : value; // **범위 초과 방지**
    }

    return value; // 범위가 아닌 경우 그대로 반환
  };

  // 특정 값에 맞는 이모지 찾기
  const getWeatherEmoji = (category: string, value: string | number) => {
    const label = getWeatherLabel(category, value);

    console.log(
      `🧐 Debug | Category: ${category}, Value: ${value}, Label: ${label}, Emoji: ${
        weatherEmoji[category]?.[label] || "❓"
      }`
    );

    return weatherEmoji[category]?.[label] || "❓";
  };

  const getWeatherIcons = (filteredData: any[]) => {
    return filteredData.map((d: any) =>
      getWeatherEmoji(d.category, d.fcstValue)
    );
  };

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

    console.log("filteredData", filteredData);

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

  // React 컴포넌트에서 실행
  useEffect(() => {
    getWeatherList();
  }, []);

  /** ======================================================================== */

  // useEffect(() => {
  //   if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0) {
  //     // 네이버 지도 옵션 선택

  //     // mapRef.current = new naver.maps.Map("map", mapOptions);

  //     new naver.maps.Marker({
  //       // 생성될 마커의 위치
  //       position: new naver.maps.LatLng(
  //         currentMyLocation.lat,
  //         currentMyLocation.lng
  //       ),
  //       // 마커를 표시할 Map 객체
  //       map: mapRef.current,
  //     });
  //   }
  // }, [currentMyLocation]);

  /** ======================================================================== */

  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 결과값 (km)
  };

  /** =-=-=-=-=-=-=-=-=-=-=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= */
  /** =-=-=-=-=-=-=-=-=-=-=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= */
  useEffect(() => {
    if (!mapElement.current || !mountain) return;

    const mapOptions = {
      center: new naver.maps.LatLng(mountain.lat, mountain.lot),
      zoom: 13,
      // zoomControl: true,
      // zoomControlOptions: {
      //   style: naver.maps.ZoomControlStyle.SMALL,
      //   position: naver.maps.Position.TOP_RIGHT,
      // },
      mapTypeControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    // mapRef.current = map;

    // Load GPX file
    fetch(
      // `https://songtak.github.io/bac_mt_course/assets/bac_gpx/${
      `/assets/bac_gpx/${mountain.name}/${mountain.name}_00000000${
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
          // Create polyline
          const path = coordinates.map(
            ([lat, lng]) => new naver.maps.LatLng(lat, lng)
          );
          polylineRef.current = new naver.maps.Polyline({
            path: path,
            strokeColor: "#fba12b",
            strokeWeight: 3,
            map: map,
          });

          // Fit bounds
          const bounds = new naver.maps.LatLngBounds(
            path.reduce(
              (bounds, coord) => bounds.extend(coord),
              new naver.maps.LatLngBounds(path[0], path[0])
            )
          );
          // map.fitBounds(bounds);
        }
      })
      .catch((err) => {
        setError("GPX 파일을 불러오는데 실패했습니다");
        console.error(err);
      });

    // if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0) {
    //   //   console.log("???");

    //   //   // 네이버 지도 옵션 선택

    //   //   // mapRef.current = new naver.maps.Map("map", mapOptions);

    //   new naver.maps.Marker({
    //     // 생성될 마커의 위치
    //     position: new naver.maps.LatLng(
    //       currentMyLocation.lat,
    //       currentMyLocation.lng
    //     ),
    //     // 마커를 표시할 Map 객체
    //     map: map,
    //   });
    // }

    // Cleanup
    // return () => {
    //   if (markerRef.current) {
    //     markerRef.current.setMap(null);
    //   }
    //   if (polylineRef.current) {
    //     polylineRef.current.setMap(null);
    //   }
    // };
  }, [mountain, currentMyLocation]);

  /** =-=-=-=-=-=-=-=-=-=-=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= */

  const calculate3DDistance = (
    points: { lat: number; lon: number; ele: number }[]
  ): number => {
    let totalDistance = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const { lat: lat1, lon: lon1, ele: ele1 } = points[i];
      const { lat: lat2, lon: lon2, ele: ele2 } = points[i + 1];

      // 2D 거리 계산 (위도, 경도만 사용)
      const distance2D = haversineDistance(lat1, lon1, lat2, lon2);

      // 고도 차이 계산 (km 단위로 변환)
      const elevationChange = (ele2 - ele1) / 1000; // m → km 변환

      // 3D 거리 계산 (피타고라스 정리 사용)
      const distance3D = Math.sqrt(distance2D ** 2 + elevationChange ** 2);

      totalDistance += distance3D;
    }

    return totalDistance;
  };
  const customParseGpx = async (
    file: File
  ): Promise<{ lat: number; lon: number; ele: number }[]> => {
    const text = await file.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const points = Array.from(xml.getElementsByTagName("trkpt")).map((pt) => ({
      lat: parseFloat(pt.getAttribute("lat")!),
      lon: parseFloat(pt.getAttribute("lon")!),
      ele: parseFloat(pt.getElementsByTagName("ele")[0]?.textContent || "0"),
    }));

    return points;
  };

  const calculateElevationGain = (
    points: { lat: number; lon: number; ele: number }[]
  ): number => {
    let totalGain = 0;

    for (let i = 1; i < points.length; i++) {
      const elevationDifference = points[i].ele - points[i - 1].ele;
      if (elevationDifference > 0) {
        totalGain += elevationDifference;
      }
    }

    return totalGain; // 단위: m
  };

  if (!mountain) {
    return <div>산을 찾을 수 없습니다.</div>;
  }

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

  console.log("weatherEmojiList", weatherEmojiList.length);

  /** =-=-=-=-=-=-=-=-=-=-=-=-=-===-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-= */

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
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
                <Share className="cursor-pointer" />
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
                isMobile() ? "h-[150px]" : "h-[300px]"
              } rounded-lg overflow-hidden shadow-inner`}
            />

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
