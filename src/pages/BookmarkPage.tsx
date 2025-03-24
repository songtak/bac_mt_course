import React from "react";
import { Search, MoveRight, ChevronsUpDown, ChevronRight } from "lucide-react";
import NavigationBar from "../components/NavigationBar";

const BookmarkPage = () => {
  return (
    <div>
      <header className="flex justify-between items-center pt-4 pb-2">
        <div></div>
        <div className="w-[46px] h-[46px] text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
          <Search />
        </div>
      </header>

      <NavigationBar />
    </div>
  );
};

export default BookmarkPage;
