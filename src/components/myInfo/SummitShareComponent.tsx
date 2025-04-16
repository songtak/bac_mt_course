import React from "react";
import Header from "../Header";
import { ChevronLeft } from "lucide-react";
import useComponentStore from "../../stores/useComponentStore";

type Props = {
  onClose: () => void;
};

const SummitShareComponent = () => {
  const componentStore = useComponentStore();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-main-white z-50">
      <Header
        disableSearch={true}
        left={
          <div
            className="p-4 cursor-pointer"
            onClick={() => {
              componentStore.setOpenFullModal("summitShare");
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
          <div className="text-[24px] font-light">공유하기</div>
          <div className="pt-8">
            <div
              className="h-[60px] bg-white rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex items-center px-6 font-extralight  "
              onClick={() => {
                componentStore.setOpenFullModal("summitShareMap");
              }}
            >
              지도로 공유하기
            </div>
            <div
              className="h-[60px] mt-4 bg-white rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] flex items-center px-6 font-extralight  "
              onClick={() => {
                componentStore.setOpenFullModal("summitSharePicture");
              }}
            >
              사진으로 공유하기
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SummitShareComponent;
