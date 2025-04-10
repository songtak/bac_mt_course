import React from "react";
import { useNavigate } from "react-router-dom";

const MyInfoGuestComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="h-[60px] mb-8 flex items-center bg-white rounded-[24px] border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
        onClick={() => {
          navigate("/login-list");
        }}
      >
        <span className="pl-6 font-extralight">로그인하기</span>
      </div>
      <div className="p-6 rounded-[24px] border bg-white border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
        <div className="pb-8">피크헌터가 되면 가능해지는 것들이에요.</div>
        <div>
          <div className="text-[14px] font-normal mb-2">
            🗺️ 내 등산 기록 관리
          </div>
          <div className="text-[12px] font-thin ml-6">
            정상 도달 기록을 저장하고 나만의 등산 캘린더를 만들어 보세요.
          </div>
        </div>
        <div className=" mt-6">
          <div className="text-[14px] font-normal mb-2 ">
            🏅 배지 획득 및 취향 분석{" "}
          </div>
          <div className="text-[12px] font-thin ml-6">
            등산 스타일을 분석하고 특별한 배지를 모아보세요.{" "}
          </div>
        </div>
        <div className=" mt-6">
          <div className="text-[14px] font-normal mb-2">📍 북마크 설정</div>
          <div className="text-[12px] font-thin ml-6">
            관심 있는 산을 저장하고, 언제든 빠르게 찾아보세요!{" "}
          </div>
        </div>
        {/* <div className=" mt-6">
        <div className="text-[14px] font-normal mb-2">
          📍 북마크 및 맞춤 추천{" "}
        </div>
        <div className="text-[12px] font-thin ml-6">
          관심 있는 산을 저장하고, 당신에게 딱 맞는 산을 추천받으세요.{" "}
        </div>
      </div> */}
        {/* <div className=" mt-6">
        <div className="text-[14px] font-normal mb-2">📊 랭킹 </div>
        <div className="text-[12px] font-thin ml-6">
          다른 헌터들과 등산 기록을 비교해 보세요.{" "}
        </div>
      </div> */}
        {/* <div className=" mt-6">
        <div className="text-[14px] font-normal mb-2">🌄 챌린지 참여 </div>
        <div className="text-[12px] font-thin ml-6">
          다양한 등산 미션을 수행하고 목표를 달성해 보세요.{" "}
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default MyInfoGuestComponent;
