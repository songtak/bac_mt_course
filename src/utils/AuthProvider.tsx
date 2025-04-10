// AuthProvider.jsx
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebaseConfig"; // 이미 초기화된 Firebase Auth 인스턴스
import useUserStore from "../stores/useUserStore";

const AuthProvider = ({ children }: any) => {
  const userStore = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // onAuthStateChanged가 호출될 때마다 상태 갱신
      userStore.setUserInfo(user);
      userStore.setIsLogin(true);
    });
    return () => unsubscribe();
  }, [userStore.setUserInfo]);

  return <>{children}</>;
};

export default AuthProvider;
