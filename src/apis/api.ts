import dayjs from "dayjs";
import { db, auth, mountains_db } from "../utils/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
const SERVICE_KEY = import.meta.env.VITE_DATA_OPEN_API_SERVICE_KEY;
const now = dayjs(); // 현재 시간
const today = now.format("YYYYMMDD");
const currentHour = now.hour();

/** 오늘의 산 호출 */
export const fetchTodayMountain = async () => {
  const today = dayjs().format("YYYY-MM-DD"); // '2025-04-07'

  const docRef = doc(mountains_db, "todayMountains", today);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("오늘의 산 정보 없음");
  }

  return snapshot.data();
};

/** 메인 산 리스트 호출 */
export const fetchMountainsByCodes = async () => {
  const mountainCodeList = [
    111100101, 113050202, 113200102, 113500201, 113500101, 114100401, 116200201,
    116500601, 414800101, 416301201, 418204201, 438001301, 441500301, 421504602,
    428302602, 491301601,
  ];

  const mountainImg = [
    "https://www.forest.go.kr/images/data/down/mountain/20090918113100_04278.jpg",
    "https://www.forest.go.kr/images/data/down/mountain/20000317_1.jpg",
    "https://www.forest.go.kr/images/data/down/mountain/20000155_3.jpg",
    "https://www.forest.go.kr/images/data/down/mountain/B_M0405_3.jpg",
    "https://www.forest.go.kr/images/data/down/mountain/B_M0324_2.jpg",
  ];

  const chunked = chunkArray(mountainCodeList, 10); // Firestore in 조건은 최대 10개
  const result: any[] = [];

  for (const codeChunk of chunked) {
    const q = query(
      collection(mountains_db, "mountains"), // 컬렉션명 확인
      where("mountain_id", "in", codeChunk)
    );
    const snap = await getDocs(q);
    snap.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  }

  return result;
};

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunked: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunked.push(arr.slice(i, i + size));
  }
  return chunked;
}
