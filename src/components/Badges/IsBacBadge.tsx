import React from "react";

interface Props {
  style?: string;
}

const IsBacBadge = ({ style }: Props) => {
  return (
    <span
      className={` bg-sky-100 text-sky-700 text-[10px] px-2 pb-[2px] pt-[1px] rounded ml-2 ${style}`}
    >
      100대 명산
    </span>
  );
};

export default IsBacBadge;
