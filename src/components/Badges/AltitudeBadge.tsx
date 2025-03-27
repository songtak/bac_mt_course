import React from "react";
import { TrendingUp } from "lucide-react";

const AltitudeBadge = ({ altitude, isMain = false }: any) => {
  return (
    <>
      {isMain ? (
        <span className={`flex `}>
          <TrendingUp color="#CDF377" size={20} />
          <span className="ml-1.5 text-main-white text-sm font-thin">
            {altitude} m
          </span>
        </span>
      ) : (
        <span className={`flex `}>
          <TrendingUp color="#CDF377" size={20} />
          <span className="ml-1.5 text-main-gray-300 text-sm font-[100]">
            {altitude} m
          </span>
        </span>
      )}
    </>
  );
};

export default AltitudeBadge;
