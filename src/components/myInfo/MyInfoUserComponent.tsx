import React from "react";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../Badges";
import { Search, MoveRight, ChevronsUpDown, ChevronRight } from "lucide-react";

const mySummitList: any[] = [
  {
    id: 1,
    name: "감악산",
    altitude: 684.7,
    rating: 4.3,
    capital: "경기도",
    summitDate: "",
    mountainId: 5324,
    badges: [
      { title: "새내기 사냥꾼", icon: "🐣" },
      { title: "새내기 사냥꾼", icon: "🎁" },
    ],
  },
  {
    id: 2,
    name: "감악산",
    altitude: 684.7,
    rating: 4.3,
    capital: "경기도",
    summitDate: "",
    mountainId: 5324,
    badges: [],
  },
  {
    id: 3,
    name: "감악산",
    altitude: 684.7,
    rating: 4.3,
    capital: "경기도",
    summitDate: "",
    mountainId: 5324,
    badges: [{ title: "새내기 사냥꾼", icon: "🐣" }],
  },
];

const MyInfoUserComponent = () => {
  return (
    <div>
      {/* 내 기본 정보 */}
      <div className="  ">
        <div className="relative w-full z-[2]">
          <div className="h-[120px] flex justify-between items-center bg-main-green-200 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-[24px] p-6">
            <div>동그라미</div>
            <div className="flex flex-col items-end text-right">
              <div className="mb-1">
                <RatingBadge rating={"2.4"} />
              </div>
              <div className="text-[28px] text-main-white font-light">송탁</div>
              <div className="text-[12px] text-main-white font-thin">
                새내기 사냥꾼
              </div>
            </div>
          </div>
        </div>
        <div className="relative -mt-[24px] h-[124px] p-6 flex justify-between items-end border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-b-[24px]">
          <div className="text-right">
            <div className="text-[22px] font-light">6</div>
            <div className="text-[12px] font-light">오른 횟수</div>
          </div>
          <div className="text-right">
            <div className="text-[22px] font-light">6</div>
            <div className="text-[12px] font-light">완등한 산</div>
          </div>
          <div className="text-right">
            <div className="text-[22px] font-light">3530.6 m</div>
            <div className="text-[12px] font-light">누적 상승 고도</div>
          </div>
        </div>
      </div>
      {/* 메인 컨텐츠 */}
      <div className="mt-4">
        <div className=" p-4  border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-[24px]">
          <div className="flex  justify-between">
            <div className="p-2 text-[16px] font-extralight">최근 등산</div>
            <ChevronRight color="#808080" />
          </div>
          <div>
            {mySummitList.map((item, i) => (
              <div
                key={i}
                className=" p-4  mt-4 border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-[24px]"
              >
                <div className="flex  justify-between mb-4">
                  <div className="flex  justify-between">
                    <span className="text-[22px] font-extralight mr-2">
                      {item.name}
                    </span>
                    <span className="mt-2">
                      <AltitudeBadge altitude={item.altitude} />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <RatingBadge rating={2.5} />
                    <span className="w-1"></span>
                    <CapitalBadge capital="경기도" />
                  </div>
                </div>

                <div className="flex">
                  <img
                    src={`../public/assets/images/wallpaper.jpg`}
                    alt={item.name}
                    className="w-[56px] h-[42px] rounded-[4px] mr-3"
                  />
                  <div>
                    <div className="text-[14px] font-thin">2025.03.19</div>
                    <div className="text-[12px] font-thin text-main-gray-300">
                      수요일 오전 등산
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="text-right">
                    <div className="font-extralight">1,032 m</div>
                    <div className="text-[12px] font-thin text-main-gray-300">
                      거리
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extralight">534.2 m</div>
                    <div className="text-[12px] font-thin text-main-gray-300">
                      상승 고도
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-extralight">1:02:13</div>
                    <div className="text-[12px] font-thin text-main-gray-300">
                      시간
                    </div>
                  </div>
                </div>

                {item.badges.length > 0 && (
                  <>
                    <div className="border border-main-gray-100 mt-2 mb-2" />
                    <div>
                      {item.badges.map((badge, index) => (
                        <span key={index} className="mr-4">
                          {badge.icon}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoUserComponent;
