import React from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, X, Upload } from "lucide-react";

const TrackingListPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        disableSearch={true}
        // left={
        //   <ChevronLeft
        //     onClick={() => {
        //       navigate(-1);
        //     }}
        //   />
        // }
        right={
          <div className="flex items-center">
            <div
              className="w-[46px] h-[46px] text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
              onClick={() => {
                navigate(-1);
              }}
            >
              <X />
            </div>
          </div>
        }
      />
      <div
        className="p-8 pt-[100px] overflow-y-auto "
        style={{ height: "calc(100vh)" }}
      >
        <div>
          <div className="text-[24px] font-light mb-4">GPX 찾기</div>
        </div>

        {/* 검색창 */}
        <div className=" top-0 left-0 right-0 px-4 py-2 border-[2px] border-main-green-200 rounded-[24px] flex items-center bg-white focus:outline-none focus:ring-2 focus:ring-green-300 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
          <Search size={22} />
          <input
            type="text"
            placeholder="검색"
            // value={mountainName}
            // onChange={handleNameChange}
            className="w-full ml-2 text-[14px] font-extralight focus:outline-none"
          />
        </div>

        <div></div>
      </div>
      {/* 하단 오른쪽 플로팅 버튼 */}
      <div className="fixed bottom-[60px] right-6 z-30">
        <button
          className="h-[56px] w-[56px] bg-main-green-200 text-main-white rounded-full flex items-center justify-center shadow-lg"
          onClick={() => {
            navigate("/tracking/upload");
          }}
        >
          <Upload />
        </button>
      </div>
    </div>
  );
};

export default TrackingListPage;
