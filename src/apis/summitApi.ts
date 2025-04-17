import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  getCountFromServer,
  QueryConstraint,
} from "firebase/firestore";
import { summits_db, auth } from "../utils/firebaseConfig";

/** 최근 등산 3개 취득 */
export const getRecentSummits = async () => {
  try {
    const userId = auth.currentUser?.uid; // 현재 로그인된 사용자의 UID

    if (!userId) {
      console.error("사용자가 로그인되지 않았습니다.");
      return [];
    }

    // 'userId' 필드로 필터링하고, 'createAt' 필드로 내림차순 정렬하여 최근 3개 문서 가져오기
    const recentSummitsQuery = query(
      collection(summits_db, "summits"), // 'summits' 컬렉션에서 조회
      where("userId", "==", userId), // userId 필드로 매치
      orderBy("createAt", "desc"), // 'createAt' 필드로 내림차순 정렬
      limit(3) // 최신 3개 문서만 가져오기
    );

    // 쿼리 실행
    const querySnapshot = await getDocs(recentSummitsQuery);

    // 쿼리 결과를 배열로 변환
    const recentSummits = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("최근 3개 산 정보:", recentSummits);
    return recentSummits;
  } catch (error) {
    console.error("최근 산 정보 조회 실패:", error);
    return [];
  }
};

// 인증된 사용자와 관련된 모든 등산 기록을 가져오는 함수
export const getAllSummitsByUser = async () => {
  try {
    const userId = auth.currentUser?.uid; // 현재 로그인된 사용자의 UID

    if (!userId) {
      console.error("사용자가 로그인되지 않았습니다.");
      return [];
    }

    // 'userId' 필드로 필터링하고, 'createAt' 필드로 내림차순 정렬하여 모든 문서 가져오기
    const allSummitsQuery = query(
      collection(summits_db, "summits"), // 'summits' 컬렉션에서 조회
      where("userId", "==", userId), // userId 필드로 매치
      orderBy("createAt", "desc") // 'createAt' 필드로 내림차순 정렬 (최신 순)
    );

    // 쿼리 실행
    const querySnapshot = await getDocs(allSummitsQuery);

    // 쿼리 결과를 배열로 변환
    const allSummits = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("사용자의 모든 등산 목록:", allSummits);
    return allSummits;
  } catch (error) {
    console.error("사용자의 등산 목록 조회 실패:", error);
    return [];
  }
};
