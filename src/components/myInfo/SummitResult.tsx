import React from "react";
import Header from "../Header";
import { ChevronLeft, ArrowRight } from "lucide-react";
import useComponentStore from "../../stores/useComponentStore";
const SummitResult = () => {
  const componentStore = useComponentStore();

  const closeModals = () => {
    componentStore.closefullModal([
      "summitShare",
      "summitShareMap",
      "summitSharePicture",
      "summitResult",
    ]);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-main-white z-[52]">
      <Header
        disableSearch={true}
        left={
          <div
            className="p-4 cursor-pointer"
            onClick={() => {
              componentStore.setOpenFullModal("summitResult");
            }}
          >
            <ChevronLeft />
          </div>
        }
        right={
          <div
            className="font-light"
            onClick={() => {
              closeModals();
            }}
          >
            완료
          </div>
          //   <ArrowRight
          //     className=" w-5 h-5 mt-1 ml-3 transition-transform duration-300 hover:animate-arrow-shake"
          //     onClick={() => {}}
          //   />
        }
      />
      {/* 모달 내부 콘텐츠 영역: Header 높이를 제외한 영역에 스크롤 설정 */}
      <div
        className="p-8 pt-[100px] overflow-y-auto"
        style={{ height: "calc(100vh)" }}
      >
        <div>
          {/* <div className="text-[24px] font-light">공유하기</div> */}
          <div className="h-96">이미지</div>
          <div className="pt-8">
            <div
              className="h-[60px] bg-white rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex items-center px-6 font-extralight  "
              onClick={() => {
                // componentStore.setOpenFullModal("summitShareMap");
              }}
            >
              이미지 저장하기
            </div>
            <div
              className="h-[60px] mt-4 bg-white rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex items-center px-6 font-extralight  "
              onClick={() => {
                // componentStore.setOpenFullModal("summitSharePicture");
              }}
            >
              공유하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummitResult;
