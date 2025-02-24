export interface Mountain {
  id: string;
  name: string;
  height: number;
  location: string;
  imageUrl: string;
  gpxUrl: string;
  initialLat: number;
  initialLng: number;
}

export const mountains: Mountain[] = [
  {
    id: "seoraksan",
    name: "설악산",
    height: 1708,
    location: "강원도 속초시, 양양군, 인제군",
    imageUrl: "https://images.unsplash.com/photo-1617448207423-9c3f13e99f37",
    gpxUrl: "/src/assets/vac_gpx/설악산/설악산_0000000003.gpx",
    initialLat: 38.119,
    initialLng: 128.465,
  },
  {
    id: "hallasan",
    name: "한라산",
    height: 1950,
    location: "제주특별자치도 제주시",
    imageUrl: "https://images.unsplash.com/photo-1548650168-1e42a6f1f0e3",
    gpxUrl: "/gpx/hallasan.gpx",
    initialLat: 33.362,
    initialLng: 126.529,
  },
  {
    id: "jirisan",
    name: "지리산",
    height: 1915,
    location: "경상남도 산청군, 하동군, 함양군, 전라남도 구례군",
    imageUrl: "https://images.unsplash.com/photo-1544735590-f3c4432674dd",
    gpxUrl: "/gpx/jirisan.gpx",
    initialLat: 35.337,
    initialLng: 127.731,
  },
  // 나머지 산들의 정보를 추가할 수 있습니다
];
