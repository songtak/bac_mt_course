import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { db, auth } from "../utils/firebaseConfig";
import useUserStore from "../stores/useUserStore";
import NavigationBar from "../components/NavigationBar";
import { Search, MoveRight, ChevronsUpDown, ChevronRight } from "lucide-react";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../components/Badges/index";

function MainPage() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const user = auth.currentUser;

  /** ================================================================================ */
  const openExternalLink = () => {
    window.open(
      "https://www.instagram.com/sn9tk",
      "_blank",
      "noopener,noreferrer"
    );
  };
  /** ================================================================================ */
  // <div
  //   className="min-h-screen bg-cover bg-center animate-pan flex flex-col"
  //   style={{
  //     backgroundImage:
  //       "url('https://songtak.github.io/bac_mt_course/assets/images/wallpaper.jpg')",
  //     backgroundSize: "auto 100%",
  //   }}
  // >
  return (
    <div className="">
      {/* 헤더 */}
      <header className="flex justify-between items-center pt-10 pb-2">
        {/* 왼쪽: PeakHunter 로고 */}
        <div>
          <img src="../public/assets/images/logo.png" alt="PeakHunter 로고" />
          <div className="pl-2 text-[12px] font-thin text-black">
            당신의 모든 산행이 이곳에
          </div>
        </div>
        {/* 오른쪽: 사용자 정보 */}
        <div className="flex flex-col items-end self-end">
          {userStore.isLogin ? (
            <>
              <span className="text-[22px]">{userStore.userInfo.nickname}</span>
              <div className="pl-2 text-[12px] font-thin text-black">
                새내기 사냥꾼
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </header>

      {/* 검색 바 */}
      <div className="pt-8">
        <div
          className="relative text-main-gray-300 bg-main-white rounded-full flex items-center h-[44px]  border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
          onClick={() => {
            navigate("/search");
          }}
        >
          <Search size={22} className="ml-5" />
          <span className="font-thin text-[14px] ml-3">
            찾고 있는 산이 있나요?
          </span>
          {/* <input
            type="text"
            placeholder="찾고 있는 산이 있나요?"
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full focus:outline-none text-gray-700 placeholder-gray-400"
          /> */}
        </div>
      </div>

      {/* 주요 카드들 */}
      <div className="mt-6 flex gap-3">
        {/* 왼쪽 카드: 오늘의 산 */}
        <div className="relative flex-1 h-24 bg-gray-200 rounded-[24px] overflow-hidden shadow">
          <img
            src="../public/assets/images/wallpaper.jpg"
            alt="가리왕산"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-3">
            <span className="text-sm text-gray-200 font-thin">오늘의 산</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl text-main-white font-medium">
                가리왕산
              </span>
              {/* <MoveRight className="text-sm text-main-white" /> */}
            </div>
          </div>
        </div>
        {/* 오른쪽 카드: 등산하기 */}
        <div className="flex-1 h-24 bg-main-green-200 rounded-[24px] shadow flex items-center justify-center">
          <span className="text-main-white text-lg font-thin">등 산 하 기</span>
          {/* <MoveRight className="text-sm text-main-white" /> */}
        </div>
      </div>

      {/* 가로 스크롤 날씨 예시 */}
      <div className=" mt-4 ">
        <div className="bg-main-blue-100 h-[60px] bg-opacity-30 rounded-full flex items-center overflow-x-auto justify-between  border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
          <div className="ml-4 py-2 font-light text-lg text-main-blue-200 w-[80px] overflow-hidden main-whitespace-nowrap text-ellipsis">
            감악산
          </div>
          <div className="flex space-x-4">
            {/* 요일 + 아이콘 + 온도 */}
            {["수", "목", "금", "토", "일"].map((day) => (
              <div
                key={day}
                className="flex flex-col items-start space-y-[-6px]"
              >
                <span className="text-[11px] text-main-blue-200 font-thin">
                  {day}
                </span>
                <span className="text-xl">☁️</span>
                <span className="text-[11px] text-main-blue-200 font-thin">
                  13°C
                </span>
              </div>
            ))}
          </div>
          <ChevronsUpDown className="text-main-blue-200 mr-4" />
          {/* <div className="px-3 text-gray-400">⇅</div> */}
        </div>
      </div>

      {/* 산 리스트 */}
      <div className=" mt-6 p-4  border border-main-gray-100 shadow-[0_4px_4px_rgba(0,0,0,0.1)] rounded-[24px]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-base text-gray-700 ">산 리스트</span>
          {/* <span className="text-sm text-gray-400">›</span> */}
          <ChevronRight className="text-main-gray-300" />
        </div>
        <div className="flex space-x-3 overflow-x-auto">
          {/* 카드 예시 */}
          {[
            {
              name: "감악산",
              height: 684.7,
              region: "경기도",
              badges: ["100대 명산"],
            },
            {
              name: "지리산",
              height: 1450,
              region: "경상남도",
              badges: ["100대 명산"],
            },
            {
              name: "한라산",
              height: 1950,
              region: "제주특별자치도",
              badges: [],
            },
            {
              name: "한라산",
              height: 1950,
              region: "제주특별자치도",
              badges: [],
            },
            {
              name: "한라산",
              height: 1950,
              region: "제주특별자치도",
              badges: [],
            },
          ].map((mountain, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 w-[120px] h-[213px] bg-gray-300 rounded-[24px] overflow-hidden shadow"
            >
              <img
                src={`../public/assets/images/wallpaper.jpg`}
                alt={mountain.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute p-3 inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-2">
                <RatingBadge rating={"2.4"} />
                <div className="text-main-white text-2xl font-light">
                  {mountain.name}
                </div>
                <AltitudeBadge altitude={mountain.height} />
                <div className="flex flex-wrap  mt-1">
                  <CapitalBadge capital={mountain.region} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 탭바 */}
      <NavigationBar />
    </div>
  );
}

export default MainPage;
