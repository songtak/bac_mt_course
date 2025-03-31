import React, { useState } from "react";
import Header from "../Header";
import { ChevronLeft, Share2 } from "lucide-react";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../Badges";
import { useNavigate } from "react-router-dom";
import useComponentStore from "../../stores/useComponentStore";

type Props = {
  onClose: () => void;
};
const SummitDetailComponent = (props: Props) => {
  const navigate = useNavigate();
  const componentStore = useComponentStore();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50">
      <Header
        disableSearch={true}
        left={
          <ChevronLeft
            onClick={() => {
              componentStore.setOpenFullModal("summitDetail");
            }}
          />
        }
        right={
          <div className="flex items-center pl-[10px] h-[46px] w-[46px] text-main-gray-300 text-[24px] bg-white rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.2)] text-center">
            <Share2
              onClick={() => {
                componentStore.setOpenFullModal("summitShare");
              }}
            />
          </div>
        }
      />
      <div className="pt-[100px] bg-main-white h-[120px] w-[100vw]"></div>
      {/* 모달 내부 콘텐츠 */}
      <div className="p-8">
        <div>
          <div className="text-[16px] font-light text-main-gray-300">
            2025. 3. 19. (수) 오후 3:50
          </div>
        </div>
        <div className="flex items-end  pt-8">
          <div className="text-[42px] mr-2">감악산</div>
          <div className="pb-2">
            <AltitudeBadge altitude={647} />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <div>
            <div className="text-[22px] font-extralight">1,032 m</div>
            <div className="text-[14px] font-extralight text-main-gray-300">
              거리
            </div>
          </div>
          <div>
            <div className="text-[22px] font-extralight">534.3 m</div>
            <div className="text-[14px] font-extralight text-main-gray-300">
              상승 고도
            </div>
          </div>
          <div>
            <div className="text-[22px] font-extralight">1:02:13</div>
            <div className="text-[14px] font-extralight text-main-gray-300">
              시간
            </div>
          </div>
        </div>
        <div className="pt-8">
          <img
            src={`../public/assets/images/wallpaper.jpg`}
            alt={""}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SummitDetailComponent;
