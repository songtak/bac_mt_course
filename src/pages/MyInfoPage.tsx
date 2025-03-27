import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import NavigationBar from "../components/NavigationBar";
import useUserStore from "../stores/useUserStore";
import { auth } from "../utils/firebaseConfig";
import {
  MyInfoGuestComponent,
  MyInfoUserComponent,
} from "../components/myInfo";

const MyInfoPage = () => {
  const userStore = useUserStore();
  const user = auth.currentUser;
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setScrolled(currentY > 80); // 80px 이상 스크롤 시 scrolled가 true
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 스크롤이 0일 때는 100px, 80px 이상일 때는 60px로 선형 보간합니다.
  const ratio = Math.min(scrollY / 80, 1); // 0 ~ 1 사이
  const headerHeight = 100 - 40 * ratio; // 100px -> 60px

  return (
    <div className="h-full mb-[100px]">
      <header
        className={`fixed px-6 top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-between items-center ${
          scrolled
            ? "bg-main-white shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
            : "bg-main-white"
        }`}
        style={{ height: `${headerHeight}px` }}
      >
        {/* 왼쪽: 로고/타이틀 */}
        <div>
          {userStore.isLogin ? (
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
          )}
        </div>
        {/* 오른쪽: 사용자 정보 (아이콘은 항상 수직 중앙) */}
        <div className="flex items-center">
          <div className="w-[46px] h-[46px] text-main-gray-300 bg-main-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
            <Search />
          </div>
        </div>
      </header>

      {/* 고정 헤더로 인한 내용 오버랩 방지를 위해 상단 여백 추가 */}
      <div className="pt-[100px]">
        {userStore.isLogin ? <MyInfoUserComponent /> : <MyInfoGuestComponent />}
      </div>

      <NavigationBar />
    </div>
  );
};

export default MyInfoPage;
