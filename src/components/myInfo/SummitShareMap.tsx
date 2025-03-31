import React from "react";
import Header from "../Header";
import { ChevronLeft, ArrowRight } from "lucide-react";
import useComponentStore from "../../stores/useComponentStore";

const SummitShareMap = () => {
  const componentStore = useComponentStore();

  console.log("summitShareMap");

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-main-white z-[51]">
      <Header
        disableSearch={true}
        left={
          <ChevronLeft
            onClick={() => {
              componentStore.setOpenFullModal("summitShareMap");
            }}
          />
        }
        right={
          <ArrowRight
            className=" w-5 h-5 mt-1 ml-3 transition-transform duration-300 hover:animate-arrow-shake"
            onClick={() => {
              componentStore.setOpenFullModal("summitResult");
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
          <div className="pt-8"></div>
        </div>
        <nav className="fixed  bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md border border-main-gray-100 flex justify-between items-center h-[60px] bg-white rounded-[34px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] px-16">
          <div className="font-extralight text-main-gray-300">4:3</div>
          <div
            className="font-extralight text-main-gray-300"
            style={{ color: "#1E1E1E", fontWeight: 400 }}
          >
            정방형
          </div>
          <div className="font-extralight text-main-gray-300">16:9</div>
        </nav>
      </div>
    </div>
  );
};

export default SummitShareMap;
