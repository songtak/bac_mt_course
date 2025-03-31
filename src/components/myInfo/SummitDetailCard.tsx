import React from "react";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../Badges";

const SummitDetailCard = (props: any) => {
  return (
    <div
      className=" p-4 bg-white mt-4 border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.2)] rounded-[24px]"
      onClick={() => {
        props.onClick();
      }}
    >
      <div className="flex  justify-between mb-4">
        <div className="flex  justify-between">
          <span className="text-[22px] font-extralight mr-2">
            {props.detail.name}
          </span>
          <span className="mt-2">
            <AltitudeBadge altitude={props.detail.altitude} />
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
          alt={props.detail.name}
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
          <div className="text-[12px] font-thin text-main-gray-300">거리</div>
        </div>
        <div className="text-right">
          <div className="font-extralight">534.2 m</div>
          <div className="text-[12px] font-thin text-main-gray-300">
            상승 고도
          </div>
        </div>
        <div className="text-right">
          <div className="font-extralight">1:02:13</div>
          <div className="text-[12px] font-thin text-main-gray-300">시간</div>
        </div>
      </div>

      {props.detail.badges.length > 0 && (
        <>
          <div className="border border-main-gray-100 mt-2 mb-2" />
          <div>
            {props.detail.badges.map((badge, index) => (
              <span key={index} className="mr-4">
                {badge.icon}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SummitDetailCard;
