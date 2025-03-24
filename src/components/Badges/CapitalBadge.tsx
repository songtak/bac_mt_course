import React from "react";

interface Props {
  capital: string;
}

const CapitalBadge = ({ capital }: Props) => {
  return (
    <span className="inline-block bg-main-blue-200 text-white text-[8px] px-2 pb-[2px] pt-[1px] rounded-[14px]">
      {capital}
    </span>
  );
};

export default CapitalBadge;
