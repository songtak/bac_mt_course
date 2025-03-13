import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { auth, db } from "../utils/firebaseConfig";

interface ITokenStore {
  isLogin: boolean | null;
  setIsLogin: (login: boolean) => void;
  userInfo: any;
  setUserInfo: (info: any) => void;
  setLogout: () => void;
}

const useUserStore = create<ITokenStore>()(
  persist(
    (set) => ({
      isLogin: null,
      setIsLogin: (login: boolean) => {
        set({ isLogin: login });
      },
      userInfo: null,
      setUserInfo: (info: any) => {
        set({ userInfo: info });
      },
      setLogout: () => {
        set({
          isLogin: null,
          userInfo: null,
        });
      },
    }),
    {
      name: "user-storage", // 로컬스토리지에 저장될 키
      storage: createJSONStorage(() => localStorage), // ✅ JSON 변환 적용
    }
  )
);

export default useUserStore;
