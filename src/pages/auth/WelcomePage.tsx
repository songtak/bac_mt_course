import React from "react";

const WelcomePage = () => {
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
                    bg-main-green-200 text-main-white hover:bg-blue-600
            
                }`}
        >
          나만의 등산 취향 발견하기
        </button>
      </main>
    </div>
  );
};

export default WelcomePage;
