import { useEffect, useRef } from "react";

const NaverMap = ({ geoJsonUrl }: { geoJsonUrl: string }) => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const mapOptions = {
      center: new naver.maps.LatLng(37.5665, 126.978), // 서울 기본 좌표
      zoom: 13,
      mapTypeControl: true,
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // GeoJSON 데이터 불러오기
    fetch(geoJsonUrl)
      .then((response) => response.json())
      .then((geojson) => {
        const vectorLayer = new naver.maps.GeoJson(geojson, {
          map: map,
          style: {
            strokeColor: "#ff0000", // 선 색상 (빨간색)
            strokeWeight: 3, // 선 두께
            strokeOpacity: 0.8, // 투명도
          },
        });

        // GeoJSON 데이터의 바운드 자동 조정
        const bounds = new naver.maps.LatLngBounds();
        vectorLayer.getPaths().forEach((path) => {
          path.getArray().forEach((latlng) => {
            bounds.extend(latlng);
          });
        });
        map.fitBounds(bounds);
      })
      .catch((error) => console.error("GeoJSON 로드 실패:", error));
  }, [geoJsonUrl]);

  return <div ref={mapElement} style={{ width: "100%", height: "500px" }} />;
};

export default NaverMap;
