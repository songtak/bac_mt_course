import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Search, ChevronLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cities, searchTagList } from "../models/common";
import useComponentStore from "../stores/useComponentStore";
import { SearchResult } from "../components/search";
import { SearchCard } from "../components/search";
import useSearchStore from "../stores/useSearchStore";

const SearchPage = () => {
  const navigate = useNavigate();
  const componentStore = useComponentStore();
  const searchStore = useSearchStore();

  // console.log("componentStore", componentStore.openfullModal);

  // useEffect(() => {
  //   componentStore.setOpenFullModal("searchResult");
  // }, []);

  // 언마운트 시에 searchStore를 초기화
  useEffect(() => {
    return () => {
      searchStore.resetSearchStore();
    };
  }, []);

  return (
    <div>
      {componentStore.isOpenFullModal("searchResult") && <SearchResult />}
      <Header
        disableSearch={true}
        // left={
        //   <ChevronLeft
        //     onClick={() => {
        //       navigate(-1);
        //     }}
        //   />
        // }
        right={
          <div className="flex items-center">
            <div
              className="w-[46px] h-[46px] text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
              onClick={() => {
                navigate(-1);
              }}
            >
              <X />
            </div>
          </div>
        }
      />
      <div
        className="p-8 pt-[100px] overflow-y-auto"
        style={{ height: "calc(100vh)" }}
      >
        <div>
          <div className="text-[24px] font-light mb-4">어디로 갈까요?</div>
          {/* <div>
          <div>이름순</div>
      </div> */}
        </div>
        <SearchCard />
      </div>
    </div>
  );
};

export default SearchPage;
