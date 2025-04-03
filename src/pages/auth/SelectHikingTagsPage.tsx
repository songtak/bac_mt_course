import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { TapButtons } from "../../components/Buttons";
import { cities, searchTagList } from "../../models/common";

const SelectHikingTagsPage = () => {
  const navigate = useNavigate();

  const tags = [
    { title: "낮은산", value: "1" },
    { title: "낮은산", value: "1" },
    { title: "낮은산", value: "1" },
    { title: "낮은산", value: "1" },
    { title: "낮은산", value: "1" },
  ];

  return (
    <div className="h-full mb-[100px]">
      <Header
        left={
          <div>
            <span className="text-[24px] font-extralight">나의 등산 취향</span>
          </div>
        }
        disableSearch={true}
      />
      <main className="pt-[100px] p-8">
        <div className="border bg-white p-4 shadow-[0_4px_4px_rgba(0,0,0,0.1)] rounded-[24px]">
          <div>
            <div className="font-light mb-2">산 유형</div>
            <div>
              <div className="flex flex-wrap gap-2">
                <TapButtons tags={tags} />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`
                fixed h-54 bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md
                shadow-[0_4px_4px_rgba(0,0,0,0.1)]
                py-3 rounded-[24px] transition focus:outline-none 
                font-light
                    bg-main-green-200 text-main-white hover:bg-main-green-300
            
                }`}
          onClick={() => {
            navigate("/");
          }}
        >
          시작하기
        </button>
      </main>
    </div>
  );
};

export default SelectHikingTagsPage;
