export interface MountainSearchParams {
  mountain_name?: string; // 부분 검색 (ex: "북악")
  cities?: string[]; // 시/군/구 필터 (ex: ["종로구", "서귀포시"])
  heightRange?: {
    min: number;
    max: number;
  }; // 높이 필터 (ex: 300 ~ 1500)
  tags?: string[]; // 태그 기반 검색 (ex: ["100대명산", "일출명소"])
  perPage?: number; // 페이지당 결과 수 (default: 10 등 지정 가능)
  page?: number; // 현재 페이지 번호 (1부터 시작)
  sortField?: "mountain_name" | "height"; // 정렬 필드 선택
  sortOrder?: "asc" | "desc"; // 정렬 방향
}

export interface Mountain {
  address: string; // 예: "서울특별시  종로구 청운동 "
  dataCollectedAt: number; // 예: 20201201 (날짜 데이터 형식: 필요시 Date로 변환 고려)
  description: string; // 산에 대한 상세 설명
  geohash: string; // 예: "wydmc7e7n7"
  height: number; // 산 높이, 예: 342.5
  isBac: boolean; // 예: false
  isBac_description: string; // 관련 설명 (빈 문자열일 수도 있음)
  lat: number; // 위도
  lng: number; // 경도
  management_city: string; // 관리하는 도시, 예: "종로구청"
  management_tel: string; // 관리 기관 전화번호, 예: "02-2148-1114"
  midTermForecast: string; // 예: "11B10101"
  mountain_id: number; // 산 고유 ID, 예: 111100101
  mountain_name: string; // 산 이름, 예: "북악산"
  nx: number; // 예: 60
  ny: number; // 예: 127
  overview: string; // 간략한 개요 (빈 문자열일 수도 있음)
  shortTermForecast: number; // 예: 1111000000
}
