import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IMountainStore {
  summitDetail: any | null;
  setSummitDetail: (summitDetail: any) => void;
}

const useMountainStore = create<IMountainStore>()((set) => ({
  summitDetail: null,
  setSummitDetail: (detail: any) => {
    set(() => ({ summitDetail: detail }));
  },
}));

export default useMountainStore;
