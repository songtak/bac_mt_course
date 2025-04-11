import { create } from "zustand";
import { MountainSearchParams } from "../interface/mountainInterface";

interface PAGINATION {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  pageNumber: number;
}

interface ISearchStore {
  searchMountainList: any[] | null;
  setSearchMountainList: (searchMountainList: any[]) => void;
  pagination: PAGINATION;
  setPagination: (pagination: PAGINATION) => void;
  searchParams: MountainSearchParams | null;
  setSearchParams: (searchParams: MountainSearchParams | null) => void;
  // 초기화 함수 추가
  resetSearchStore: () => void;
  isCloseSearchCard: boolean;
  setCloseSearchCard: () => void;
}

const initialPagination: PAGINATION = {
  totalPages: 0,
  totalElements: 0,
  pageSize: 0,
  pageNumber: 0,
};

const useSearchStore = create<ISearchStore>((set) => ({
  searchMountainList: null,
  setSearchMountainList: (searchMountainList: any[]) => {
    set({ searchMountainList: searchMountainList });
  },
  pagination: initialPagination,
  setPagination: (pagination: PAGINATION) => {
    set({ pagination: pagination });
  },
  searchParams: null,
  setSearchParams: (searchParams: MountainSearchParams | null) => {
    set({ searchParams: searchParams });
  },
  // 초기값으로 리셋하는 함수 구현
  resetSearchStore: () => {
    set({
      searchMountainList: null,
      pagination: initialPagination,
      searchParams: null,
    });
  },
  isCloseSearchCard: false,
  setCloseSearchCard: () => {
    set({
      isCloseSearchCard: true,
      // searchMountainList: null,
    });
  },
}));

export default useSearchStore;
