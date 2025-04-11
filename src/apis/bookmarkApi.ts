import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { bookmarks_db } from "../utils/firebaseConfig";
import { auth } from "../utils/firebaseConfig"; // 이미 초기화된 Firebase Auth 인스턴스
import type { Timestamp } from "firebase/firestore";

export type BookmarkSortField = "createdAt" | "height";
export type SortOrder = "asc" | "desc";

/** 북마크 목록 취득 */
export async function getBookmarkList() {
  if (!auth.currentUser) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  try {
    const bookmarksRef = collection(bookmarks_db, "bookmarks");
    // userId 기준 필터링 후 createdAt 기준 내림차순 정렬
    const q = query(
      bookmarksRef,
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    // 각 문서의 id와 데이터를 포함한 배열로 반환
    const bookmarks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return bookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
}

/** 북마크 생성 */
export async function createBookmark(bookmarkData: any): Promise<string> {
  if (!auth.currentUser) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  try {
    const docRef = await addDoc(collection(bookmarks_db, "bookmarks"), {
      userId: auth.currentUser.uid, // 인증된 uid 사용
      mountain_name: bookmarkData.mountain_name,
      lat: bookmarkData.lat,
      lng: bookmarkData.lng,
      height: bookmarkData.height,
      mountain_id: bookmarkData.mountain_id,
      isBac: bookmarkData.isBac,
      address: bookmarkData.address,
      createdAt: serverTimestamp(),
    });
    console.log("Bookmark created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating bookmark: ", error);
    throw error;
  }
}

/** 북마크 제거 */
export async function deleteBookmark(bookmarkId: string): Promise<string> {
  try {
    await deleteDoc(doc(bookmarks_db, "bookmarks", bookmarkId));
    console.log("Bookmark deleted with ID:", bookmarkId);
    return bookmarkId;
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
}
