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

// 정렬 기준 필드와 정렬 순서를 타입으로 정의합니다.
export type BookmarkSortField = "createdAt" | "height";
export type SortOrder = "asc" | "desc";

/**
 * 특정 사용자의 북마크 목록을 정렬 옵션에 따라 반환합니다.
 * @param userId - 사용자 고유 아이디
 * @param sortField - 정렬 기준 필드 ('createdAt'이면 최신순, 'height'이면 높이순)
 * @param sortOrder - 정렬 순서 ('asc' 또는 'desc')
 * @returns 북마크 목록 배열
 */
export async function getBookmarksForUser(
  userId: string,
  sortField: BookmarkSortField = "createdAt",
  sortOrder: SortOrder = "desc"
) {
  try {
    const bookmarksRef = collection(bookmarks_db, "bookmarks");
    const q = query(
      bookmarksRef,
      where("userId", "==", userId),
      orderBy(sortField, sortOrder)
    );

    const querySnapshot = await getDocs(q);
    const bookmarks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return bookmarks;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
}

/** 북마크 목록 취득 */
export async function getBookmarkList() {
  if (!auth.currentUser) {
    throw new Error("인증된 사용자가 아닙니다.");
  }

  try {
    const bookmarksRef = collection(bookmarks_db, "bookmarks");
    const q = query(bookmarksRef, where("userId", "==", auth.currentUser.uid));
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

/** 북마크 제거 */
export async function deleteBookmark(bookmarkId: string): Promise<void> {
  try {
    await deleteDoc(doc(bookmarks_db, "bookmarks", bookmarkId));
    console.log("Bookmark deleted with ID:", bookmarkId);
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
}
