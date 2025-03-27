import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share, BookmarkIcon } from "lucide-react";
import { isMobile } from "../utils/helpers";

function MapViewPage() {
  const { mountainName } = useParams();
  const navigate = useNavigate();
  const mapElement = useRef(null);
  const polylineRef = useRef(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [map, setMap] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [elevationGains, setElevationGains] = useState({}); // 상승 고도 저장

  useEffect(() => {
    if (!mapElement.current) return;

    const mapOptions = {
      center: new naver.maps.LatLng(37.905621, 126.962645),
      zoom: 13,
      mapTypeControl: true,
    };

    const newMap = new naver.maps.Map(mapElement.current, mapOptions);
    setMap(newMap);
  }, []);

  useEffect(() => {
    fetch("src/assets/gpx/PMNTN_감악산_414800101.geojson")
      .then((response) => response.json())
      .then((data) => {
        setGeoJsonData(data);
        calculateElevationForAllCourses(data.features);
      })
      .catch((error) => console.error("Error loading geoJSON:", error));
  }, []);

  // 상승 고도 계산 함수
  const calculateElevationGain = (coordinates) => {
    let totalGain = 0;
    for (let i = 1; i < coordinates.length; i++) {
      const prevElevation = coordinates[i - 1][2] || 0; // 고도값이 3번째 값이라 가정
      const currentElevation = coordinates[i][2] || 0;
      if (currentElevation > prevElevation) {
        totalGain += currentElevation - prevElevation;
      }
    }
    return totalGain;
  };

  // 모든 코스의 상승 고도 계산
  const calculateElevationForAllCourses = (features) => {
    const gains = {};
    features.forEach((feature, index) => {
      gains[index] = calculateElevationGain(feature.geometry.coordinates);
    });
    setElevationGains(gains);
  };

  const handleClickCourse = (feature) => {
    setSelectedCourse(feature);

    if (!map) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const path = feature.geometry.coordinates.map(
      ([lng, lat]) => new naver.maps.LatLng(lat, lng)
    );

    polylineRef.current = new naver.maps.Polyline({
      path: path,
      strokeColor: "#fba12b",
      strokeWeight: 3,
      map: map,
    });

    const bounds = new naver.maps.LatLngBounds(
      path.reduce(
        (bounds, coord) => bounds.extend(coord),
        new naver.maps.LatLngBounds(path[0], path[0])
      )
    );
    map.fitBounds(bounds);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="bg-main-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate("/list")}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" /> 목록으로
            </button>
          </div>

          <div
            ref={mapElement}
            className={`w-full ${
              isMobile() ? "h-[300px]" : "h-[600px]"
            } rounded-lg overflow-hidden shadow-inner`}
          />

          <div className="pt-6">
            <div className="text-2xl font-bold">감악산 코스</div>
            <div className="font-thin pb-4 text-xs">
              코스를 선택하면 지도가 이동합니다.
            </div>
            {geoJsonData &&
              geoJsonData.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex justify-between pt-1 pb-1 hover:shadow-md hover:bg-sky-50 cursor-pointer ${
                    selectedCourse === feature ? "bg-sky-100 opacity-95" : ""
                  } rounded-lg`}
                  onClick={() => handleClickCourse(feature)}
                >
                  <span className="cursor-pointer text-lg text-slate-900 pl-3">
                    {feature.properties.PMNTN_NM} ({feature.properties.PMNTN_LT}
                    km)
                  </span>
                  <span className="text-gray-600 text-sm pr-3">
                    난이도: {feature.properties.PMNTN_DFFL || "정보 없음"},
                    고도차: {feature.properties.PMNTN_GODN || "정보 없음"}m, 총
                    상승 고도:{" "}
                    {elevationGains[index]
                      ? `${elevationGains[index].toFixed(1)}m`
                      : "정보 없음"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapViewPage;
