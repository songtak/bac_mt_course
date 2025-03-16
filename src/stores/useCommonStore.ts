import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ITokenStore {
  prevLocation: any | null;
  setPrevLocation: (location: any) => void;
}

const useCommonStore = create<ITokenStore>()(
  persist(
    (set) => ({
      prevLocation: null,
      setPrevLocation: (location: any) => {
        set({ prevLocation: location });
      },
    }),
    {
      name: "common-storage", // 로컬스토리지에 저장될 키
      storage: createJSONStorage(() => localStorage), // ✅ JSON 변환 적용
    }
  )
);

export default useCommonStore;
