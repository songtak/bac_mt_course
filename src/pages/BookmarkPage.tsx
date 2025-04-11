import React, { useState, useEffect } from "react";
import { ArrowDownToLine, ArrowUpToLine } from "lucide-react";
import NavigationBar from "../components/NavigationBar";
import ListItem from "../components/ListItem";
import Header from "../components/Header";
import useUserStore from "../stores/useUserStore";
import _ from "lodash";

const sortList = [
  { title: "최신순", value: "createdAt" },
  { title: "이름순", value: "mountain_name" },
  { title: "높이순", value: "height" },
] as const;

type SortValue = (typeof sortList)[number]["value"];

const BookmarkPage = () => {
  const { bookmarkList } = useUserStore();
  /** 정렬타입 */
  const [sortType, setSortType] = useState<SortValue>("createdAt");
  /** 오름차순 여부 */
  const [isASC, setIsASC] = useState(true);
  /** 정렬된 북마크 목록 */
  const [sortedList, setSortedList] = useState<any[]>([]);
  /** 리스트 컨테이너의 opacity (애니메이션 효과용) */
  const [listOpacity, setListOpacity] = useState(1);

  const selectedSortItem = sortList.find((item) => item.value === sortType);

  /** 정렬 타입 변경 (클릭 시 다음 항목으로 전환) */
  const handleNextSort = () => {
    const currentIndex = sortList.findIndex((item) => item.value === sortType);
    const nextIndex = (currentIndex + 1) % sortList.length;
    setSortType(sortList[nextIndex].value);
  };

  // bookmarkList, sortType, isASC 변화에 따라 정렬 수행하면서 fade 효과 적용
  useEffect(() => {
    if (!bookmarkList || bookmarkList.length === 0) {
      setSortedList([]);
      return;
    }
    // 먼저 컨테이너를 fade-out: opacity 0
    setListOpacity(0.6);
    // 일정 시간(300ms) 후에 정렬된 데이터를 업데이트하고 fade-in 효과로 opacity 1로 전환
    const timeout = setTimeout(() => {
      const sorted = [...bookmarkList].sort((a, b) => {
        const aVal = a[sortType];
        const bVal = b[sortType];
        if (aVal < bVal) return isASC ? -1 : 1;
        if (aVal > bVal) return isASC ? 1 : -1;
        return 0;
      });
      setSortedList(sorted);
      setListOpacity(1);
    }, 300);
    return () => clearTimeout(timeout);
  }, [bookmarkList, sortType, isASC]);

  return (
    <div className="h-full mb-[100px]">
      <Header
        left={
          <div>
            <span className="text-[24px] font-extralight">북마크</span>
            <span className="text-[24px] ml-4 font-thin text-main-gray-300">
              {bookmarkList.length}
            </span>
          </div>
        }
      />

      <main className="pt-[80px]">
        <div className="flex justify-end items-end text-main-gray-300 mb-4">
          <div
            className="text-[14px] mr-2 underline cursor-pointer h-[22px]"
            onClick={handleNextSort}
          >
            <span
              key={sortType}
              className="transition-opacity duration-300 ease-in-out animate-fade"
            >
              {selectedSortItem?.title}
            </span>
          </div>
          <div
            className="relative cursor-pointer w-[20px] h-[20px]"
            onClick={() => setIsASC((prev) => !prev)}
          >
            <ArrowDownToLine
              className={`absolute w-[20px] h-[20px] transition-opacity duration-300 ease-in-out ${
                isASC ? "opacity-100" : "opacity-0"
              }`}
            />
            <ArrowUpToLine
              className={`absolute w-[20px] h-[20px] transition-opacity duration-300 ease-in-out ${
                !isASC ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <div
          className="pb-[100px] transition-opacity duration-300 ease-in-out"
          style={{ opacity: listOpacity }}
        >
          {!_.isUndefined(sortedList) &&
            sortedList.map((item: any, i: number) => (
              <React.Fragment key={i}>
                <ListItem mountain={item} />
              </React.Fragment>
            ))}
        </div>
      </main>
      <div className="fixed bottom-0 w-full left-1/2 -translate-x-1/2 h-[88px] bg-main-white shadow-[0_-4px_4px_rgba(0,0,0,0.1)]" />
      <NavigationBar />
    </div>
  );
};

export default BookmarkPage;
