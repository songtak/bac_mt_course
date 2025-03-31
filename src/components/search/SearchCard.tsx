import React, { useEffect, useState } from "react";
import { Search, ChevronLeft, X } from "lucide-react";
import { cities, searchTagList } from "../../models/common";
import HeightSlider from "../../components/HeightSlider"; // HeightSlider 컴포넌트 import

const SearchCard = () => {
  const [heightFilter, setHeightFilter] = useState<[number, number]>([0, 2000]);
  const [isFilterReset, setIsFilterReset] = useState<boolean>(false);

  return (
    <div className="max-w-sm w-full bg-white rounded-t-[20px] rounded-b-[24px] shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 px-4 py-2 border-[2px]  border-main-green-200 rounded-[24px] flex items-center bg-white focus:outline-none focus:ring-2 focus:ring-green-300 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
        <Search size={22} />
        <input
          type="text"
          placeholder="산 이름"
          className="w-full ml-2 text-[14px] font-extralight focus:outline-none"
        />
      </div>
      <div className="p-6 pt-14 shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
        {/* 산 이름 검색창 */}

        {/* 도시 태그 */}
        <div>
          <div className="text-sm text-main-gray-400 mb-2">도시</div>
          <div className="flex flex-wrap gap-2">
            {cities.map((item: string, i: number) => (
              <button
                key={i}
                className="h-[30px] px-3 py-1 border border-main-gray-200 text-main-gray-300 font-extralight text-[12px] rounded-full hover:bg-gray-200 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 높이 슬라이더 */}
        <div className="mt-4">
          <HeightSlider
            heightFilter={heightFilter}
            setHeightFilter={setHeightFilter}
            isFilterReset={isFilterReset}
          />
        </div>

        {/* 태그 */}
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">태그</div>
          <div className="flex flex-wrap gap-2">
            {searchTagList.map((item: any, i: number) => (
              <button
                key={i}
                className="h-[30px] px-3 py-1 border border-main-gray-200 text-main-gray-300 font-extralight text-[12px] rounded-full hover:bg-gray-200 transition"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* 탐색 버튼 */}
        <div className="mt-12 flex justify-center">
          <button className="w-[165px] h-[44px] py-2 bg-main-green-200 text-white rounded-[24px] text-[16px] font-[200] hover:bg-main-green-300 transition shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
            탐색
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
