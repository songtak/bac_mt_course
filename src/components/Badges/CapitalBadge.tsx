import React from "react";

interface Props {
  capital: string;
}

const CapitalBadge = ({ capital }: Props) => {
  return (
    <span className="inline-block bg-gray-100 text-gray-700 text-[10px] px-2 pb-[2px] pt-[1px] rounded">
      {capital}
    </span>
  );
};

export default CapitalBadge;
