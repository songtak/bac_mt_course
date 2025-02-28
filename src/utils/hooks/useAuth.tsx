import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("로그인됨:", user);
        setUser(user);
      } else {
        console.log("로그아웃됨");
        setUser(null);
      }
    });

    return () => unsubscribe(); // 구독 해제 (클린업)
  }, []);

  return user;
};

export default useAuth;
