import React from "react";
import { TrendingUp } from "lucide-react";

const AltitudeBadge = ({ altitude }: any) => {
  return (
    <span className={`flex `}>
      <TrendingUp color="#CDF377" size={20} />
      <span className="ml-1.5 text-white text-sm font-thin">{altitude} m</span>
    </span>
  );
};

export default AltitudeBadge;
