import React from "react";
import mountains_with_coords_patched from "../../data/mountains_for_firebase_corrected.json";
import merged_todayMountain_with_forecast from "../../data/merged_todayMountain_with_forecast.json";
import final_mock_data from "../../data/final_mock_data.json";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { mountains_db } from "../../utils/firebaseConfig";

/** 산 */
const SetMountainDataPage = () => {
  // async function uploadMountainData() {
  //   console.log("고고~~~~");

  //   const batchName = "mountains";

  //   for (const mountain of structured_mountain_forecast) {
  //     const docRef = doc(
  //       collection(mountains_db, batchName),
  //       mountain.mountain_id.toString()
  //     );
  //     await setDoc(docRef, mountain);
  //   }

  //   console.log("✅ Mountain data uploaded to Firestore!");
  // }

  const uploadMountainData = async () => {
    console.log("🗑 기존 mountain 데이터 삭제 중...");

    const batchName = "mountains";
    const colRef = collection(mountains_db, batchName);
    const snapshot = await getDocs(colRef);

    for (const docSnap of snapshot.docs) {
      await deleteDoc(doc(colRef, docSnap.id));
    }

    console.log(
      `🧹 기존 데이터 삭제 완료. 총 ${snapshot.docs.length}개 삭제됨`
    );

    console.log("🆕 새로운 final_mock_data 업로드 시작");

    for (const mountain of final_mock_data) {
      const docRef = doc(colRef, mountain.mountain_id.toString());
      await setDoc(docRef, mountain);
    }

    console.log("✅ 새 mountain 데이터 업로드 완료!");
  };

  console.log("??");

  // const uploadTodayMountainData = async () => {
  //   console.log("📆 오늘의 산 업로드 시작");

  //   const collectionName = "todayMountains";

  //   for (const mountain of merged_todayMountain_with_forecast) {
  //     const date = mountain.date; // 예: '2025-04-07'
  //     const docRef = doc(collection(mountains_db, collectionName), date);
  //     await setDoc(docRef, mountain);
  //   }

  //   console.log("✅ 오늘의 산 목록 업로드 완료!");
  // };

  const uploadTodayMountainData = async () => {
    console.log("📆 오늘의 산 업로드 시작");

    const collectionName = "todayMountains";
    const colRef = collection(mountains_db, collectionName);

    // 🔥 1. 기존 문서 전체 삭제
    const existingDocs = await getDocs(colRef);
    const deletePromises = existingDocs.docs.map((docSnap) =>
      deleteDoc(docSnap.ref)
    );
    await Promise.all(deletePromises);
    console.log("🗑 기존 todayMountains 문서 삭제 완료");

    // ⛰ 2. 새로 업로드
    for (const mountain of merged_todayMountain_with_forecast) {
      const date = mountain.date; // 예: '2025-04-07'
      const docRef = doc(colRef, date);
      await setDoc(docRef, mountain);
    }

    console.log("✅ 오늘의 산 목록 업로드 완료!");
  };

  return (
    <div>
      <div
        onClick={() => {
          uploadMountainData();
        }}
      >
        전체 산 목록 추가
      </div>
      <div
        className="mt-12"
        onClick={() => {
          uploadTodayMountainData();
        }}
      >
        오늘의 산 목록 추가
      </div>
    </div>
  );
};

export default SetMountainDataPage;
