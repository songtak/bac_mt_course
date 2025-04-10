import { collection, query, where, getDocs } from "firebase/firestore";
import { mountains_db } from "../utils/firebaseConfig";

// Haversine 공식을 사용해 두 좌표 간 거리를 (km) 계산하는 함수
function getDistanceFromLatLng(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 현재 위치 중심 반경 내 산 데이터를 조회하는 함수
export async function getNearbyMountains(
  centerLat: number,
  centerLng: number,
  radiusInKm: number = 5
): Promise<any[]> {
  // Bounding box 계산 (대략적인 범위)
  const latDelta = radiusInKm / 111; // 위도 1도 ≒ 111km
  const lngDelta = radiusInKm / (111 * Math.cos(centerLat * (Math.PI / 180)));

  const minLat = centerLat - latDelta;
  const maxLat = centerLat + latDelta;
  const minLng = centerLng - lngDelta;
  const maxLng = centerLng + lngDelta;

  console.log("Computed bounding box:", { minLat, maxLat, minLng, maxLng });

  // Firestore 쿼리: 위도, 경도 범위를 걸러서 산 데이터를 조회
  const mountainsRef = collection(mountains_db, "mountains");

  // 만약 문서의 구조가 { location: { lat: ..., lng: ... } } 형태라면 아래와 같이 수정:
  // const mountainsQuery = query(
  //   mountainsRef,
  //   where("location.lat", ">=", minLat),
  //   where("location.lat", "<=", maxLat),
  //   where("location.lng", ">=", minLng),
  //   where("location.lng", "<=", maxLng)
  // );

  const mountainsQuery = query(
    mountainsRef,
    where("lat", ">=", minLat),
    where("lat", "<=", maxLat),
    where("lng", ">=", minLng),
    where("lng", "<=", maxLng)
  );

  const querySnapshot = await getDocs(mountainsQuery);
  console.log(`Query returned ${querySnapshot.size} documents.`);

  let mountains: any[] = [];

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    console.log(`Document ${docSnap.id}:`, data);

    // 데이터가 중첩 객체라면 아래처럼 수정:
    // const mountainLat = Number(data.location.lat);
    // const mountainLng = Number(data.location.lng);

    const mountainLat = Number(data.lat);
    const mountainLng = Number(data.lng);

    const distance = getDistanceFromLatLng(
      centerLat,
      centerLng,
      mountainLat,
      mountainLng
    );
    console.log(
      `Mountain ${
        docSnap.id
      }: lat=${mountainLat}, lng=${mountainLng}, distance=${distance.toFixed(
        2
      )}km`
    );

    if (distance <= radiusInKm) {
      mountains.push({ id: docSnap.id, distance, ...data });
    }
  });

  console.log(`Found ${mountains.length} mountains within ${radiusInKm}km`);
  return mountains;
}
