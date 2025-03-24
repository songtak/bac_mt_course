import React from "react";
import { Star } from "lucide-react";

const RatingBadge = ({ rating }: any) => {
  return (
    <span
      className={`flex w-10 bg-main-green-400 text-main-green-100 text-[8px] px-1.5 pb-[2px] pt-[1px] rounded-[14px] `}
    >
      <Star size={10} fill="#C8F169" color="#C8F169" className="mr-1" />
      {/* {rating} */}
      2.4
    </span>
  );
};

export default RatingBadge;
