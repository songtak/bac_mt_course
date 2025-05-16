import React, { useState, useEffect, useRef } from "react";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Map,
  AlignJustify,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

import NavigationBar from "../components/NavigationBar";
import useUserStore from "../stores/useUserStore";
import ListItem from "../components/ListItem";
import Header from "../components/Header";

const sortList = [
  { title: "최신순", value: "createdAt" },
  { title: "이름순", value: "mountain_name" },
  { title: "높이순", value: "height" },
] as const;

type SortValue = (typeof sortList)[number]["value"];

const BookmarkPage = () => {
  const navigate = useNavigate();

  const { bookmarkList } = useUserStore();

  /** 정렬타입 */
  const [sortType, setSortType] = useState<SortValue>("createdAt");
  /** 오름차순 여부 */
  const [isASC, setIsASC] = useState(true);
  /** 정렬된 북마크 목록 */
  const [sortedList, setSortedList] = useState<any[]>([]);
  /** 리스트 컨테이너의 opacity (애니메이션 효과용) */
  const [listOpacity, setListOpacity] = useState(1);

  /** 북마크 오픈 형식 */
  const [openType, setOpenType] = useState<"list" | "map">("list");

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

  /** =================================================================================== */

  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);

  // 탭 전환 시마다 맵 다시 그리기
  useEffect(() => {
    if (openType !== "map" || !mapElement.current) return;

    // 1) 컨테이너 초기화
    mapElement.current.innerHTML = "";

    // 2) 중심 좌표 결정
    const center = bookmarkList.length
      ? new naver.maps.LatLng(
          bookmarkList[0].latitude,
          bookmarkList[0].longitude
        )
      : new naver.maps.LatLng(37.5665, 126.978);

    // 3) 지도 생성
    const map = new naver.maps.Map(mapElement.current, {
      center,
      zoom: 11,
      mapTypeControl: true,
    });
    mapRef.current = map;

    // 4) 생성 직후 resize + center 재설정 (타일 로딩 보장)
    setTimeout(() => {
      naver.maps.Event.trigger(map, "resize");
      map.setCenter(center);
    }, 0);

    // 5) 마커 추가
    bookmarkList.forEach((item) => {
      new naver.maps.Marker({
        position: new naver.maps.LatLng(item.latitude, item.longitude),
        map,
      });
    });
  }, [openType, bookmarkList]);

  /** =================================================================================== */

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
      {openType === "map" && (
        <main className="pt-[100px] relative">
          <div
            ref={mapElement}
            className="absolute top-0 left-1/2 w-screen -translate-x-1/2 h-[calc(100vh-80px)]"
          />
          {/* 화면 전환 버튼 */}
          <div className="fixed bottom-[112px] right-6 z-30">
            <button
              className="h-[56px] w-[56px] bg-main-green-200 text-main-white rounded-full flex items-center justify-center shadow-lg"
              onClick={() => setOpenType("list")}
            >
              <AlignJustify />
            </button>
          </div>
        </main>
      )}
      {openType === "list" && (
        <main className="pt-[100px]">
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
            {bookmarkList.length === 0 && (
              <div className="text-center text-main-gray-300 mt-[40%]">
                <div>저장된 산이 아직 없어요.</div>
                <div>산을 찾고, 나만의 목록을 채워보세요.</div>
                <button
                  onClick={() => {
                    navigate("/search");
                  }}
                  className={`mt-8 h-[50px] px-8 py-1 border border-main-gray-200 text-[16px] rounded-full transition
                 bg-main-green-200 text-white
                `}
                >
                  찾아보기
                </button>
              </div>
            )}
            {!_.isUndefined(sortedList) &&
              sortedList.map((item: any, i: number) => (
                <React.Fragment key={i}>
                  <ListItem mountain={item} />
                </React.Fragment>
              ))}
          </div>
          {/* 하단 오른쪽 플로팅 버튼 */}
          <div className="fixed bottom-[112px] right-6 z-30">
            <button
              className="h-[56px] w-[56px] bg-main-green-200 text-main-white rounded-full flex items-center justify-center shadow-lg"
              onClick={() => {
                setOpenType("map");
              }}
            >
              <Map />
            </button>
          </div>
        </main>
      )}
      <div className="fixed bottom-0 w-full left-1/2 -translate-x-1/2 h-[88px] bg-main-white shadow-[0_-4px_4px_rgba(0,0,0,0.1)]" />
      <NavigationBar />
    </div>
  );
};

export default BookmarkPage;
