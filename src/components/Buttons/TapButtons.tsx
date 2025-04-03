import React from "react";

const TapButtonList = ({ tags }: any) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: any, i: number) => (
        <button
          key={i}
          type="button"
          className="px-3 py-1 border border-main-gray-200 text-main-gray-300 font-extralight text-[12px] rounded-full hover:bg-gray-200 transition bg-white whitespace-nowrap"
        >
          {tag.title}
        </button>
      ))}
    </div>
  );
};

export default TapButtonList;
