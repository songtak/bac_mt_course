import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share, BookmarkIcon } from "lucide-react";
// import { mountains } from "../data/mountains";
import { parseGpx } from "../utils/gpxParser";
import { mountains, createNumberList } from "../utils/helpers";

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

  const [selectedCourse, setSelectedCourse] = useState<number>(1);

  const mountain = mountains().find((m) => m.name === mountainName);

  const courseList = createNumberList(mountain?.fileLength);

  const handleClickCourse = (course: number) => {
    setSelectedCourse(course);
  };

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
  const calculateTotalDistance = (coordinates: [number, number][]): number => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const [lat1, lon1] = coordinates[i];
      const [lat2, lon2] = coordinates[i + 1];
      totalDistance += haversineDistance(lat1, lon1, lat2, lon2);
    }
    return totalDistance;
  };

  useEffect(() => {
    if (!mapElement.current || !mountain) return;

    const mapOptions = {
      center: new naver.maps.LatLng(mountain.lat, mountain.lot),
      zoom: 13,
      zoomControl: true,
      mapTypeControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
    mapRef.current = map;

    // Load GPX file
    fetch(
      `/src/assets/bac_gpx/${mountain.name}/${mountain.name}_00000000${
        selectedCourse < 10 && "0"
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
            strokeColor: "#5347AA",
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
          map.fitBounds(bounds);

          const totalDistance = calculateTotalDistance(coordinates);
          console.log(`총 거리: ${totalDistance.toFixed(2)} km`);
        }
      })
      .catch((err) => {
        setError("GPX 파일을 불러오는데 실패했습니다");
        console.error(err);
      });

    // Cleanup
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [mountain]);

  if (!mountain) {
    return <div>산을 찾을 수 없습니다.</div>;
  }

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
              목록으로
            </button>
          </div>

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <div
            ref={mapElement}
            className="w-full h-[600px] rounded-lg overflow-hidden shadow-inner"
          />
          <div className="pt-6">
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
                  fill="orange"
                  color="orange"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className=" text-gray-400 pb-4 ">{mountain.address}</div>
            <div className="font-thin">{mountain.reason}</div>

            <div className="pt-10">
              <div className="text-2xl ">코스</div>
              <div className="font-thin pb-4 text-xs">
                (* 코스 번호는 사용자 편의를 위해 임의로 설정한 값으로 실제
                코스명과 다를 수 있습니다.)
              </div>
              {courseList.map((item, i) => (
                <div
                  key={i}
                  className={`pt-1 pb-1 hover:shadow-md hover:bg-sky-50 cursor-pointer ${
                    selectedCourse === i + 1 && "bg-sky-100 opacity-95"
                  } rounded-lg
                  `}
                  onClick={() => {
                    handleClickCourse(item);
                  }}
                >
                  <span
                    className={`cursor-pointer text-lg ${
                      selectedCourse === i + 1
                        ? "text-slate-900"
                        : "text-slate-500"
                    }  pl-3`}
                  >
                    {item} 코스
                  </span>
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
