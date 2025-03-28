import React from "react";
import { Home, Compass, Bookmark, ChevronRight } from "lucide-react"; // 예시 아이콘
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../components/Badges";

const ListItem = ({ mountain }: any) => {
  console.log("mountain", mountain);

  return (
    <div className="p-4 border h-[72px] border-main-gray-100 flex justify-between items-center bg-white rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] mb-4">
      <div className="">
        <div className="flex items-center mb-1">
          <div className="text-[22px] font-thin">{mountain.name}</div>
          <div className="ml-2">
            <AltitudeBadge altitude={mountain.height} />
          </div>
        </div>
        <div className="flex">
          <RatingBadge rating={mountain.rating} />
          <div className="p-1" />
          <CapitalBadge capital={mountain.capital} />
          {mountain.isBac === true && <IsBacBadge />}
        </div>
      </div>
      <div className="flex">
        <Bookmark className="w-[20px] h-[20px] text-main-gray-300 mr-2" />
        <ChevronRight className="w-[20px] h-[20px] text-main-gray-300" />
      </div>
    </div>
  );
};

export default ListItem;
