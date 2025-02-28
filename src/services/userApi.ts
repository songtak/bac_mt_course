import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import useUserStore from "../stores/useUserStore";

// const userStore = useUserStore();
/**
 *
 * @returns
 */
const getUserData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("로그인된 사용자가 없습니다.");
    return "로그인된 사용자가 없습니다.";
  }

  try {
    const userRef = doc(db, "users", user.email!); // 🔥 이메일 기반 문서 참조
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const setUserInfo = useUserStore.getState().setUserInfo;
      // userSnap.data()
      setUserInfo({
        name: userSnap.data().name,
        nickname: userSnap.data().nickname,
        email: userSnap.data().email,
      });

      return userSnap.data();
    } else {
      console.log("❌ Firestore에 해당 사용자 정보가 없습니다.");
      return "Firestore에 해당 사용자 정보가 없습니다.";
    }
  } catch (error) {
    console.error("❌ Firestore 사용자 정보 가져오기 실패:", error);
    return error;
  }
};

/**
 *
 * @returns
 */
const getUserBookmarks = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("로그인된 사용자가 없습니다.");
    return;
  }

  try {
    const bookmarkRef = doc(db, "bookmark", user.email!);
    const bookmarkSnap = await getDoc(bookmarkRef);

    if (bookmarkSnap.exists()) {
      console.log("🔥 북마크 데이터:", bookmarkSnap.data());
    } else {
      console.log("❌ Firestore에 북마크 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("❌ 북마크 데이터 가져오기 실패:", error);
  }
};

/**
 *
 * @returns
 */
const getUserSummits = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("로그인된 사용자가 없습니다.");
    return;
  }

  try {
    const summitRef = collection(db, "summit", user.email!, "log"); // 🔥 로그 컬렉션 접근
    const querySnapshot = await getDocs(summitRef);

    if (!querySnapshot.empty) {
      const logs = querySnapshot.docs.map((doc) => doc.data());
      console.log("🔥 등산 기록:", logs);
    } else {
      console.log("❌ Firestore에 등산 기록이 없습니다.");
    }
  } catch (error) {
    console.error("❌ 등산 기록 가져오기 실패:", error);
  }
};

/**
 *
 * @returns
 */
const fetchUserData = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.log("로그인된 사용자가 없습니다.");
    return;
  }

  try {
    // Firestore 참조
    const userRef = doc(db, "users", user.email!);
    const bookmarkRef = doc(db, "bookmark", user.email!);
    const summitRef = collection(db, "summit", user.email!, "log");

    // 🔥 여러 요청을 병렬로 실행
    const [userSnap, bookmarkSnap, summitSnap] = await Promise.all([
      getDoc(userRef),
      getDoc(bookmarkRef),
      getDocs(summitRef),
    ]);

    // ✅ 사용자 정보
    const userData = userSnap.exists() ? userSnap.data() : null;
    console.log("🔥 사용자 정보:", userData);

    // ✅ 북마크 데이터
    const bookmarkData = bookmarkSnap.exists() ? bookmarkSnap.data() : null;
    console.log("🔥 북마크 데이터:", bookmarkData);

    // ✅ 등산 기록 리스트
    const summitLogs = summitSnap.docs.map((doc) => doc.data());
    console.log("🔥 등산 기록:", summitLogs);
  } catch (error) {
    console.error("❌ 사용자 데이터 가져오기 실패:", error);
  }
};

export { getUserData, getUserBookmarks, getUserSummits, fetchUserData };
