import React from "react";
import { Star } from "lucide-react";
import _ from "lodash";

const RatingBadge = ({ rating, isMain = false }: any) => {
  return (
    <>
      {isMain ? (
        <span className="flex items-center w-10 bg-main-green-400 text-main-green-100 text-[8px] px-1.5 rounded-[14px]">
          <Star
            size={10}
            fill="#C8F169"
            color="#C8F169"
            className="mr-1 align-middle"
          />
          <span className="flex items-center">
            {!_.isUndefined(rating) ? rating : "- . -"}
          </span>
        </span>
      ) : (
        <span className="flex items-center font-bold justify-center w-10 h-[16px] bg-main-green-100 text-main-green-300 text-[8px] rounded-[14px]">
          <Star
            size={10}
            fill="#2A6F2B"
            color="#2A6F2B"
            className="mr-1 align-middle"
          />
          <span className="flex items-center">
            {!_.isUndefined(rating) ? rating : "- . -"}
          </span>
        </span>
      )}
    </>
  );
};

export default RatingBadge;
