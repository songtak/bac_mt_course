import React from "react";
import { Home, Compass, Bookmark, ChevronRight } from "lucide-react"; // 예시 아이콘
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../components/Badges";
import { BookmarkButton } from "../components/Buttons";
import { useNavigate } from "react-router-dom";

const ListItem = ({ mountain }: any) => {
  const navigate = useNavigate();

  return (
    <div
      className="p-5 border h-[80px] border-main-gray-100 flex justify-between items-center bg-white rounded-[24px] shadow-[0_4px_4px_rgba(0,0,0,0.1)] mb-2"
      onClick={() => {
        navigate(`/mountain/${mountain.mountain_id}`);
      }}
    >
      <div className="">
        <div className="flex items-center mb-1">
          <div className="text-[22px] font-thin">
            {" "}
            {mountain?.mountain_name.split("_")[0]}
          </div>
          <div className="ml-2">
            <AltitudeBadge altitude={mountain.height} />
          </div>
        </div>
        <div className="flex">
          <RatingBadge rating={mountain.rating} />
          <div className="p-1" />
          <CapitalBadge capital={mountain.address} />
          {mountain.isBac === true && <IsBacBadge />}
        </div>
      </div>
      <div className="flex">
        <BookmarkButton mountain_detail={mountain} />
        {/* <Bookmark className="w-[20px] h-[20px] text-main-gray-300 mr-2" /> */}
        <ChevronRight className="w-[20px] h-[20px] text-main-gray-300" />
      </div>
    </div>
  );
};

export default ListItem;
