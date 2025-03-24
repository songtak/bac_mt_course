import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Search, MoveRight, ChevronsUpDown, ChevronRight } from "lucide-react";
import RangeSlider from "../components/RangeSlider";

const MyLocationPage = () => {
  return (
    <div>
      <header className="flex justify-between items-center pt-4 pb-2">
        <div></div>
        <div className="w-[46px] h-[46px] text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
          <Search />
        </div>
      </header>

      <div className="flex items-end justify-end mt-3">
        <RangeSlider
          min={5}
          max={30}
          initialValue={5}
          onChange={(val) => console.log("Slider value:", val)}
        />
      </div>

      <NavigationBar />
    </div>
  );
};

export default MyLocationPage;
