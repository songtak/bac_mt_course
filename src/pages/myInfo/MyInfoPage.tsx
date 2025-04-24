import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import NavigationBar from "../../components/NavigationBar";
import useUserStore from "../../stores/useUserStore";
import { auth } from "../../utils/firebaseConfig";
import {
  MyInfoGuestComponent,
  MyInfoUserComponent,
  SummitListComponent,
  SummitDetailComponent,
} from "../../components/myInfo";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const MyInfoPage = () => {
  const navigate = useNavigate();

  const userStore = useUserStore();
  const user = auth.currentUser;
  const scrollContainerRef = useRef();
  const [scrollY, setScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  /** =========================================================================== */

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      userStore.setLogout();
      navigate("/");
      console.log("로그아웃 성공!");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  /** =========================================================================== */

  // useEffect(() => {
  //   const onScroll = () => {
  //     const currentY = window.scrollY;
  //     setScrollY(currentY);
  //     setScrolled(currentY > 80); // 80px 이상 스크롤 시 scrolled가 true
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);
  /** =========================================================================== */
  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const y = scrollEl.scrollTop;
      setScrollY(y);
      setScrolled(y > 80);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤이 0일 때는 100px, 80px 이상일 때는 60px로 선형 보간합니다.
  const ratio = Math.min(scrollY / 70, 1); // 0 ~ 1 사이

  const headerHeight = 100 - 40 * ratio; // 100px -> 60px
  /** =========================================================================== */

  return (
    <div className="h-full mb-[100px] hide-scrollbar">
      <header
        className={`fixed px-6 pt-[26px] top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out flex justify-between items-center ${
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
                src="https://songtak.github.io/bac_mt_course/assets/images/logo.png"
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
          <div>
            <div
              onClick={() => {
                handleLogout();
              }}
            >
              임시 로그아웃 버튼
            </div>
            <div
              onClick={() => {
                if (window?.ReactNativeWebView?.postMessage) {
                  window.ReactNativeWebView.postMessage("START_TRACKING");
                } else {
                  console.log("웹 환경에서는 메시지를 보낼 수 없습니다.");
                }
              }}
            >
              임시 시작하기 버튼
            </div>
          </div>
          <div
            className="w-[46px] h-[46px] text-main-gray-300 bg-white rounded-full flex items-center justify-center shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
            onClick={() => {
              navigate("/search");
            }}
          >
            <Search />
          </div>
        </div>
      </header>

      {/* 고정 헤더로 인한 내용 오버랩 방지를 위해 상단 여백 추가 */}
      <div
        className="pt-[100px] pb-[100px] hide-scrollbar"
        ref={scrollContainerRef}
      >
        {user ? <MyInfoUserComponent /> : <MyInfoGuestComponent />}
      </div>
      <div className="fixed  bottom-0 w-full left-1/2 -translate-x-1/2 h-[88px] bg-main-white shadow-[0_-4px_4px_rgba(0,0,0,0.1)]" />

      <NavigationBar />
    </div>
  );
};

export default MyInfoPage;
