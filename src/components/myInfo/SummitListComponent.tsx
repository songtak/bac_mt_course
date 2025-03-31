import React, { useState } from "react";
import Header from "../Header";
import { ChevronLeft } from "lucide-react";
import { SummitDetailCard, SummitDetailComponent } from "./index";
import useComponentStore from "../../stores/useComponentStore";

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
  {
    id: 4,
    name: "감악산",
    altitude: 684.7,
    rating: 4.3,
    capital: "경기도",
    summitDate: "",
    mountainId: 5324,
    badges: [{ title: "새내기 사냥꾼", icon: "🐣" }],
  },
  {
    id: 5,
    name: "감악산",
    altitude: 684.7,
    rating: 4.3,
    capital: "경기도",
    summitDate: "",
    mountainId: 5324,
    badges: [{ title: "새내기 사냥꾼", icon: "🐣" }],
  },
];

type Props = {
  onClose: () => void;
};

const SummitListComponent = () => {
  const componentStore = useComponentStore();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-main-white z-50">
      <Header
        disableSearch={true}
        left={
          <ChevronLeft
            onClick={() => {
              componentStore.setOpenFullModal("summitList");
            }}
          />
        }
      />
      {/* 모달 내부 콘텐츠 영역: Header 높이를 제외한 영역에 스크롤 설정 */}
      <div
        className="p-8 pt-[100px] overflow-y-auto"
        style={{ height: "calc(100vh)" }}
      >
        <div>
          <div className="text-[24px] font-light">모든 등산</div>
          {/* <div>
          <div>이름순</div>
      </div> */}
        </div>
        <div>
          {mySummitList.map((item, i) => (
            <SummitDetailCard
              detail={item}
              key={i}
              onClick={() => {
                componentStore.setOpenFullModal("summitDetail");
              }}
            />
          ))}
        </div>
      </div>
      {/* {isOpenSummitDetail && (
        <SummitDetailComponent
          onClose={() => {
            setIsOpenSummitDetail(false);
          }}
        />
      )} */}
    </div>
  );
};

export default SummitListComponent;
