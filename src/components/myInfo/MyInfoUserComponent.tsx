import React, { useState } from "react";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../Badges";
import { Search, MoveRight, ChevronsUpDown, ChevronRight } from "lucide-react";
import useComponentStore from "../../stores/useComponentStore";

import {
  SummitListComponent,
  SummitDetailComponent,
  SummitDetailCard,
  SummitShareComponent,
  SummitShareMap,
  SummitSharePicture,
  SummitResult,
} from "./index";

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
  const componentStore = useComponentStore();
  /** summitList, summitDetail, summitShare */

  return (
    <div className="hide-scrollbar">
      {componentStore.isOpenFullModal("summitList") && <SummitListComponent />}
      {componentStore.isOpenFullModal("summitShareMap") && <SummitShareMap />}
      {componentStore.isOpenFullModal("summitResult") && <SummitResult />}
      {componentStore.isOpenFullModal("summitSharePicture") && (
        <SummitSharePicture />
      )}
      {componentStore.isOpenFullModal("summitDetail") && (
        <SummitDetailComponent
          onClose={() => {
            componentStore.setOpenFullModal("");
          }}
        />
      )}
      {componentStore.isOpenFullModal("summitShare") && (
        <SummitShareComponent
          onClose={() => {
            componentStore.setOpenFullModal("");
          }}
        />
      )}
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
        <div className="relative -mt-[24px] h-[124px] p-6 flex justify-between items-end border bg-white border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-b-[24px]">
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
        <div className=" p-4  border bg-white border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-[24px]">
          <div className="flex  justify-between">
            <div className="p-2 text-[16px] font-extralight">최근 등산</div>
            <ChevronRight
              color="#808080"
              className="mt-2"
              onClick={() => {
                componentStore.setOpenFullModal("summitList");
              }}
            />
          </div>
          <div>
            {mySummitList.map((item, i) => (
              <SummitDetailCard
                detail={item}
                key={i}
                onClick={() => {
                  componentStore.setOpenFullModal("summitDetail");
                  // setIsOpenSummitDetail(true);
                }}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <div
              className="font-light mt-4 h-[40px] text-[14px] bg-main-green-200 text-main-white w-[240px] rounded-[24px] flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.2)]"
              onClick={() => {
                componentStore.setOpenFullModal("summitList");
              }}
            >
              전체 보기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoUserComponent;
