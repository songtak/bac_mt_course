import React from "react";

import { geohashForLocation } from "geofire-common";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { mountains_db } from "../../utils/firebaseConfig";

const AddGeohashPage = () => {
  async function addGeohashToMountains() {
    // 산 정보가 저장된 컬렉션 참조
    const mountainsRef = collection(mountains_db, "mountains");
    // 모든 문서를 조회
    const snapshot = await getDocs(mountainsRef);

    // 각 문서별로 geohash 계산 및 업데이트
    const updatePromises = snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      // 값이 0 인 경우도 유효하기 때문에 null 또는 undefined 여부를 확인합니다.
      if (data.lat != null && data.lng != null) {
        // geofire-common의 geohashForLocation 함수 사용
        const geohash = geohashForLocation([data.lat, data.lng]);
        await updateDoc(doc(mountains_db, "mountains", docSnap.id), {
          geohash: geohash,
        });
        console.log(`Updated ${docSnap.id} with geohash: ${geohash}`);
      } else {
        // lat 또는 lng 값이 없는 경우, 예시로 geohash 값을 null 로 업데이트
        await updateDoc(doc(mountains_db, "mountains", docSnap.id), {
          geohash: null,
        });
        console.log(
          `Document ${docSnap.id} does not have valid lat/lng fields. Set geohash to null.`
        );
      }
    });

    // 모든 업데이트 작업이 완료될 때까지 대기합니다.
    await Promise.all(updatePromises);
    console.log("All mountain documents processed with geohash updates.");
  }

  return (
    <div>
      <div
        onClick={() => {
          addGeohashToMountains();
        }}
      >
        값 추가하기
      </div>
    </div>
  );
};

export default AddGeohashPage;
