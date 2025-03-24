import React from "react";

interface Props {
  style?: string;
}

const IsBacBadge = ({ style }: Props) => {
  return (
    <span
      className={` bg-[#F8EEBB] text-[#A48A06] text-[8px] px-2 pb-[2px] pt-[1px] rounded-[14px] ml-2 ${style}`}
    >
      100대 명산
    </span>
  );
};

export default IsBacBadge;
