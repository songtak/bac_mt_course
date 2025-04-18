import React, { useState } from "react";
import Header from "../Header";
import { ChevronLeft } from "lucide-react";
import { SummitDetailCard, SummitDetailComponent } from "./index";
import useComponentStore from "../../stores/useComponentStore";
import { getAllSummitsByUser } from "../../apis/summitApi";
import { useQuery } from "@tanstack/react-query";
import useMountainStore from "../../stores/useMountainStore";

type Props = {
  onClose: () => void;
};

const SummitListComponent = () => {
  const componentStore = useComponentStore();
  const mountainStore = useMountainStore();

  /** 최근 등산 목록 취득 */
  const {
    data: allSummits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allSummits"],
    queryFn: getAllSummitsByUser,
    staleTime: Infinity, // 항상 신선하다고 간주 (무한 캐싱)
    cacheTime: Infinity, // 캐시를 영구 보관 (앱 꺼질 때까지)
    refetchOnWindowFocus: false, // 창 다시 포커스해도 refetch 안 함
    refetchOnMount: false, // 컴포넌트 재마운트해도 refetch 안 함
    refetchOnReconnect: false, // 인터넷 연결 회복해도 refetch 안 함
  });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-main-white z-50">
      <Header
        disableSearch={true}
        left={
          <div
            className="p-4 cursor-pointer"
            onClick={() => {
              componentStore.setOpenFullModal("summitList");
            }}
          >
            <ChevronLeft />
          </div>
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
          {allSummits &&
            allSummits.map((item, i) => (
              <SummitDetailCard
                detail={item}
                key={i}
                onClick={() => {
                  mountainStore.setSummitDetail(item);
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
