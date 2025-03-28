import React from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

// ${
//   scrolled
//     ? "bg-main-white shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
//     : "bg-main-white"
// }

const Header: React.FC<HeaderProps> = ({ left }) => {
  const navigate = useNavigate();

  return (
    <header
      className={`fixed px-6 pt-[26px] top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-between items-center bg-main-white`}
      style={{ height: `80px` }}
    >
      {/* 왼쪽: 로고/타이틀 */}
      <div>
        {left}
        {/* {userStore.isLogin ? (
            <span className="text-[24px] font-extralight">마이페이지</span>
          ) : (
            <>
              <img
                src="../public/assets/images/logo.png"
                alt="PeakHunter 로고"
              />
              <div className="pl-2 text-[12px] font-thin text-black">
                당신의 모든 산행이 이곳에
              </div>
            </>
          )} */}
      </div>
      {/* 오른쪽: 사용자 정보 (아이콘은 항상 수직 중앙) */}
      <div className="flex items-center">
        <div className="w-[46px] h-[46px] text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
          <Search
            onClick={() => {
              navigate("/search");
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
