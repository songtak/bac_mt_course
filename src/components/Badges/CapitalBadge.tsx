import React from "react";

interface Props {
  capital: string;
  isMain?: boolean;
}

const CapitalBadge = ({ capital, isMain = false }: Props) => {
  return (
    <>
      {isMain ? (
        <span className="inline-block h-[16px] bg-main-blue-200 text-main-white text-[8px] px-2 pb-[2px] pt-[2px] rounded-[14px]">
          {capital}
        </span>
      ) : (
        <span className="font-normal inline-block h-[16px] bg-main-gray-200 text-[#255A72]  text-[8px] px-2 pb-[2px] pt-[2px] rounded-[14px]">
          {capital}
        </span>
      )}
    </>
  );
};

export default CapitalBadge;
