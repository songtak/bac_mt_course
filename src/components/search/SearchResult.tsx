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
import { cities, searchTagList } from "../../models/common";
import { OverflowButtons } from "../Buttons";
import ListItem from "../../components/ListItem";
import { useNavigate } from "react-router-dom";
import { SearchCard } from "./index";

const List: any[] = [
  {
    name: "감악산",
    height: 1432,
    rating: 2.4,
    capital: "경기도",
    isBookmerked: false,
    mountainId: 123,
    isBac: true,
  },
  {
    name: "지리산",
    height: 1432,
    rating: 2.4,
    capital: "충청북도",
    isBookmerked: true,
    mountainId: 123,
    isBac: true,
  },
  {
    name: "한라산",
    height: 1432,
    rating: 2.4,
    capital: "제주특별자치도",
    isBookmerked: false,
    mountainId: 123,
  },
  {
    name: "인왕산",
    height: 1432,
    rating: 2.4,
    capital: "서울특별시",
    isBookmerked: false,
    mountainId: 123,
  },
  {
    name: "감악산",
    height: 1432,
    rating: 2.4,
    capital: "경기도",
    isBookmerked: false,
    mountainId: 123,
    isBac: true,
  },
  {
    name: "지리산",
    height: 1432,
    rating: 2.4,
    capital: "충청북도",
    isBookmerked: true,
    mountainId: 123,
  },
  {
    name: "한라산",
    height: 1432,
    rating: 2.4,
    capital: "제주특별자치도",
    isBookmerked: false,
    mountainId: 123,
    isBac: true,
  },
  {
    name: "인왕산",
    height: 1432,
    rating: 2.4,
    capital: "서울특별시",
    isBookmerked: false,
    mountainId: 123,
  },
  {
    name: "감악산",
    height: 1432,
    rating: 2.4,
    capital: "경기도",
    isBookmerked: false,
    mountainId: 123,
  },
  {
    name: "지리산",
    height: 1432,
    rating: 2.4,
    capital: "충청북도",
    isBookmerked: true,
    mountainId: 123,
    isBac: true,
  },
  {
    name: "한라산",
    height: 1432,
    rating: 2.4,
    capital: "제주특별자치도",
    isBookmerked: false,
    mountainId: 123,
  },
  {
    name: "인왕산",
    height: 1432,
    rating: 2.4,
    capital: "서울특별시",
    isBookmerked: false,
    mountainId: 123,
  },
];

const SearchResult = () => {
  const navigate = useNavigate();

  const componentStore = useComponentStore();

  /** 검색창 오픈 여부 */
  const [isOpenSearchCard, setIsOpenSearchCard] = useState<boolean>(false);

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
              <span className="text-main-green-400 font-normal">3</span>
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
            <OverflowButtons items={cities} />
          )}
        </div>

        <div className="mt-3">
          {List.map((item, i) => (
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
