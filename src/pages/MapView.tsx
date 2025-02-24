import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
// import { mountains } from "../data/mountains";
import { parseGpx } from "../utils/gpxParser";
import { mountains, createNumberList } from "../utils/helpers";

interface NaverMap {
  setCenter: (latlng: naver.maps.LatLng) => void;
  setZoom: (level: number) => void;
  fitBounds: (bounds: naver.maps.LatLngBounds) => void;
}

function MapView() {
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
              <ArrowLeft className="w-5 h-5 mr-2" />
              목록으로
            </button>
            <h1 className="text-2xl font-bold">{mountain.name}</h1>
          </div>

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <div
            ref={mapElement}
            className="w-full h-[600px] rounded-lg overflow-hidden shadow-inner"
          />
          <div>
            {courseList.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  handleClickCourse(item);
                }}
              >
                {item} 코스
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
