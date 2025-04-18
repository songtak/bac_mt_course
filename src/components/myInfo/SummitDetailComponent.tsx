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
import useMountainStore from "../../stores/useMountainStore";
import { formatDateKoShort, formatDuration } from "../../utils/helpers";
import dayjs from "dayjs";
import "dayjs/locale/ko";

type Props = {
  onClose: () => void;
};
const SummitDetailComponent = (props: Props) => {
  const navigate = useNavigate();
  const componentStore = useComponentStore();
  const mountainStore = useMountainStore();

  /**
   * @todo 날씨 정보, 뱃지 추가... 그리고 어떤 데이터를 더 보여줄 수 있지?
   */

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50">
      <Header
        disableSearch={true}
        left={
          <div
            className="p-4 cursor-pointer"
            onClick={() => {
              componentStore.setOpenFullModal("summitDetail");
            }}
          >
            <ChevronLeft />
          </div>
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
          <div className="text-[16px] font-light text-main-gray-300 tracking-wider">
            {dayjs(mountainStore.summitDetail?.endTime).format("YYYY.MM.DD")}{" "}
            {formatDateKoShort(mountainStore.summitDetail?.endTime)}
            {/* 2025. 3. 19. (수) 오후 3:50 */}
          </div>
        </div>
        <div className="flex items-end  pt-8">
          <div className="text-[42px] mr-2">
            {mountainStore.summitDetail?.mountainName}
          </div>
          <div className="pb-2">
            <AltitudeBadge altitude={647} />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <div>
            <div className="text-[22px] font-extralight">
              {mountainStore.summitDetail?.distance} m
            </div>
            <div className="text-[14px] font-extralight text-main-gray-300">
              거리
            </div>
          </div>
          <div>
            <div className="text-[22px] font-extralight">
              {mountainStore.summitDetail?.altitudeGain} m
            </div>
            <div className="text-[14px] font-extralight text-main-gray-300">
              상승 고도
            </div>
          </div>
          <div>
            <div className="text-[22px] font-extralight">
              {formatDuration(mountainStore.summitDetail?.duration)}
            </div>
            <div className="text-[14px] font-extralight text-main-gray-300">
              시간
            </div>
          </div>
        </div>
        <div className="pt-8">
          <img
            src={`https://songtak.github.io/bac_mt_course/assets/images/wallpaper.jpg`}
            alt={""}
            className="w-full h-full object-cover rounded-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default SummitDetailComponent;
