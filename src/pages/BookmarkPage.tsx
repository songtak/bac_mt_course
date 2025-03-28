import React, { useState } from "react";
import { Search, ArrowDownToLine, ArrowUpToLine } from "lucide-react";
import NavigationBar from "../components/NavigationBar";
import ListItem from "../components/ListItem";
import Header from "../components/Header";

const sortList = [
  { title: "이름순", value: "" },
  { title: "높이순", value: "" },
  { title: "별점수", value: "rating" },
];

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

const BookmarkPage = () => {
  /** 오름차순 여부 */
  const [isASC, setIsASC] = useState(true);

  return (
    <div className="h-full mb-[100px]">
      <Header
        left={
          <div>
            <span className="text-[24px] font-extralight">북마크</span>
            <span className="text-[24px] ml-4 font-thin text-main-gray-300">
              {List.length}
            </span>
          </div>
        }
      />

      {/* <header className="flex justify-between items-center pt-4 pb-2">
        <div>
          <span className="text-[24px] font-extralight">북마크</span>
          <span className="text-[24px] ml-4 font-thin text-main-gray-300">
            {List.length}
          </span>
        </div>
        <div className="w-[46px] h-[46px] text-main-gray-300 bg-main-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
          <Search />
        </div>
      </header> */}
      <main className="pt-[80px]">
        <div className="flex justify-end items-end text-main-gray-300 mb-4">
          <div className="text-[14px] mr-2 underline ">이름순</div>
          {isASC ? (
            <ArrowDownToLine
              className="w-[20px] h-[20px]"
              onClick={() => {
                setIsASC(false);
              }}
            />
          ) : (
            <ArrowUpToLine
              className="w-[20px] h-[20px]"
              onClick={() => {
                setIsASC(true);
              }}
            />
          )}
        </div>
        <div className="pb-[100px]">
          {List.map((item: any, i: number) => (
            <React.Fragment key={i}>
              <ListItem mountain={item} />
            </React.Fragment>
          ))}
        </div>
      </main>
      <div className="fixed  bottom-0 w-full left-1/2 -translate-x-1/2 h-[88px] bg-main-white shadow-[0_-4px_4px_rgba(0,0,0,0.1)]" />
      <NavigationBar />
    </div>
  );
};

export default BookmarkPage;
