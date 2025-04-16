import dayjs from "dayjs";
import { db, auth } from "../utils/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const SERVICE_KEY = import.meta.env.VITE_DATA_OPEN_API_SERVICE_KEY;
const now = dayjs(); // 현재 시간
const today = now.format("YYYYMMDD");
const currentHour = now.hour();

/** 사용자 정보 취득 */
export const getUserInfo = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("현재 로그인한 사용자가 없습니다.");
  }

  console.log("currentUser.email", currentUser.email);

  // Firestore 문서는 이메일을 문서 ID로 저장되어 있음
  const userDocRef = doc(db, "users", currentUser.email);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const data = userSnapshot.data();
    // 문서 내부의 userId가 currentUser.uid와 다르다면 업데이트
    if (data.userId !== currentUser.uid) {
      await updateDoc(userDocRef, { userId: currentUser.uid });
    }
    // 업데이트 후 혹은 이미 동일하다면 데이터와 현재 uid를 반환합니다.
    return { ...data, userId: currentUser.uid };
  } else {
    throw new Error("Firestore에서 사용자 정보를 찾을 수 없습니다.");
  }
};
