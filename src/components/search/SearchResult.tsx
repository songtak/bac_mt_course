import React, { useState } from "react";
import Header from "../Header";
import {
  Search,
  ChevronLeft,
  X,
  ArrowDownToLine,
  ArrowUpToLine,
} from "lucide-react";
import useComponentStore from "../../stores/useComponentStore";
import useSearchStore from "../../stores/useSearchStore";
import { cities, searchTagList } from "../../models/common";
import { OverflowButtons } from "../Buttons";
import ListItem from "../../components/ListItem";
import { useNavigate } from "react-router-dom";
import { SearchCard } from "./index";
import _ from "lodash";

const SearchResult = () => {
  const navigate = useNavigate();

  const componentStore = useComponentStore();
  const mountainStore = useSearchStore();
  const [isOpenSearchCard, setIsOpenSearchCard] = useState<boolean>(false);

  const extractSearchParamsValues = (): string[] => {
    if (!_.isNull(mountainStore.searchParams)) {
      const { mountain_name, cities, heightRange, tags } =
        mountainStore.searchParams;
      const result: string[] = [];

      // 산 이름 (존재하면 추가)
      if (mountain_name && mountain_name.trim() !== "") {
        result.push(mountain_name.trim());
      }

      // 도시 (cities 배열 평면화)
      if (cities && Array.isArray(cities)) {
        cities.forEach((city) => {
          if (city && city.trim() !== "") {
            result.push(city.trim());
          }
        });
      }

      // 높이 범위 (있으면 "min~max" 형태로 추가)
      if (
        heightRange &&
        typeof heightRange.min === "number" &&
        typeof heightRange.max === "number"
      ) {
        result.push(`${heightRange.min}m ~ ${heightRange.max}m`);
      }

      // 태그 (tags 배열 평면화)
      if (tags && Array.isArray(tags)) {
        tags.forEach((tag) => {
          if (tag && tag.trim() !== "") {
            result.push(tag.trim());
          }
        });
      }

      return result;
    } else {
      return [];
    }
  };

  console.log("searchParams", mountainStore.searchParams);
  console.log("=-=-=-=-=", extractSearchParamsValues());

  /** 검색창 오픈 여부 */

  /** 오름차순 여부 */
  const [isASC, setIsASC] = useState(true);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-main-white z-[52] flex flex-col">
      <Header
        disableSearch={true}
        left={
          <ChevronLeft
            onClick={() => {
              componentStore.setOpenFullModal("searchResult");
            }}
          />
        }
        right={
          <div className="flex items-center">
            <div className="w-[46px] h-[46px] mr-4 text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
              <Search
                onClick={() => {
                  setIsOpenSearchCard(!isOpenSearchCard);
                }}
              />
            </div>
            <div className="w-[46px] h-[46px] text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
              <X
                onClick={() => {
                  navigate(-1);
                  componentStore.setOpenFullModal("searchResult");
                }}
              />
            </div>
          </div>
        }
      />
      <main className="flex-grow overflow-y-auto pt-[120px] p-6">
        <div className="flex justify-between">
          <div className="flex text-[24px]">
            <div>탐색 결과</div>
            <div className="ml-2 text-[14px] font-light flex items-center">
              <span>총 </span>
              <span className="text-main-green-400 font-normal">
                {mountainStore.pagination.totalElements}
              </span>
              <span>개</span>
            </div>
          </div>
          <div className="flex text-main-gray-300 items-center">
            <div className="flex items-center text-[14px] mr-2 underline">
              이름순
            </div>
            {isASC ? (
              <ArrowDownToLine
                className="w-[20px] h-[20px]"
                onClick={() => setIsASC(false)}
              />
            ) : (
              <ArrowUpToLine
                className="w-[20px] h-[20px]"
                onClick={() => setIsASC(true)}
              />
            )}
          </div>
        </div>
        <div className="mt-3">
          {isOpenSearchCard ? (
            <SearchCard />
          ) : (
            <OverflowButtons items={extractSearchParamsValues()} />
          )}
        </div>

        <div className="mt-3">
          {!_.isNull(mountainStore.searchMountainList) &&
            mountainStore.searchMountainList.map((item, i) => (
              <React.Fragment key={i}>
                <ListItem mountain={item} />
              </React.Fragment>
            ))}
        </div>
      </main>
    </div>
  );
};

export default SearchResult;
