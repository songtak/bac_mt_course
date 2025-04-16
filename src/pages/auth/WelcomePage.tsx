import React from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../utils/firebaseConfig";
import { getUserInfo } from "../../apis/userApi";
import { useQuery } from "@tanstack/react-query";

const WelcomePage = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    staleTime: Infinity, // 항상 신선하다고 간주 (무한 캐싱)
    refetchOnWindowFocus: false, // 창 다시 포커스해도 refetch 안 함
    refetchOnMount: false, // 컴포넌트 재마운트해도 refetch 안 함
    refetchOnReconnect: false, // 인터넷 연결 회복해도 refetch 안 함
  });

  console.log("userInfo", userInfo);

  return (
    <div className="h-full mb-[100px] hide-scrollbar">
      <header
        className={`fixed px-6 pt-[26px] top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-between items-center bg-main-white`}
        style={{ height: `100px` }}
      ></header>
      <main className="pt-[100px]">
        <div className="flex justify-center items-center">
          <div>
            <img
              src="https://songtak.github.io/bac_mt_course/assets/images/logo.png"
              alt="PeakHunter 로고"
            />
            <div className="pl-2 text-[12px] font-thin text-black text-center">
              당신의 모든 산행이 이곳에
            </div>
          </div>
        </div>
        <div className="p-8 text-main-gray-300">
          <div className="text-[24px] font-light mb-4 text-main-black">
            환영합니다! 송탁님
          </div>
          <div className="mt-4 font-extralight">
            이제 당신만의 등산 기록을 남겨보세요.
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
            navigate("/select-hiking-style");
          }}
        >
          나만의 등산 취향 발견하기
        </button>
      </main>
    </div>
  );
};

export default WelcomePage;
