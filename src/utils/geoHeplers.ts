export const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

export const haversineDistance = (
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

export const customParseGpx = async (
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

export const calculateElevationGain = (
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

export const calculate3DDistance = (
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

export const isWithin50Meters = (
  userLat: number,
  userLon: number,
  targetLat: number,
  targetLon: number
): boolean => {
  const distance = haversineDistance(userLat, userLon, targetLat, targetLon);
  return distance <= 50; // 50m 이내인지 확인
};
