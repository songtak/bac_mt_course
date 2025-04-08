import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useQuery } from "react-query";
import _ from "lodash";
import { db, auth, mountains_db } from "../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import useUserStore from "../stores/useUserStore";
import NavigationBar from "../components/NavigationBar";
import { Search, MoveRight, ChevronsUpDown, ChevronRight } from "lucide-react";
import {
  CapitalBadge,
  IsBacBadge,
  RatingBadge,
  AltitudeBadge,
} from "../components/Badges/index";
import dayjs from "dayjs";
import { fetchTodayMountain, fetchMountainsByCodes } from "../apis/api";
import { getShortTermWeather, getMidTermWeather } from "../apis/weatherApi";
import { weatherEmojiMap } from "../utils/weatherParser";

function MainPage() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const user = auth.currentUser;

  /** 날씨 목록 */
  const [weatherList, setWeatherList] = useState<any[]>([]);

  /** 오늘의 산 취득 */
  const {
    data: todayMountain,
    isLoading,
    error,
  } = useQuery("todayMountain", fetchTodayMountain, {
    staleTime: Infinity, // 항상 신선하다고 간주 (무한 캐싱)
    cacheTime: Infinity, // 캐시를 영구 보관 (앱 꺼질 때까지)
    refetchOnWindowFocus: false, // 창 다시 포커스해도 refetch 안 함
    refetchOnMount: false, // 컴포넌트 재마운트해도 refetch 안 함
    refetchOnReconnect: false, // 인터넷 연결 회복해도 refetch 안 함
  });

  /** 단기 기상 정보 */
  const {
    data: shortTermWeather,
    isLoading: shortTermWeatherLoading,
    error: shortTermWeatherError,
  } = useQuery(
    [
      "shortTermWeather",
      {
        nx: todayMountain?.nx,
        ny: todayMountain?.ny,
      },
    ],
    getShortTermWeather,
    {
      enabled: !!todayMountain?.nx && !!todayMountain?.ny, // ✅ 조건부 fetch
    }
  );

  console.log("todayMountain", todayMountain);

  /** 중기 기상 정보 */
  const {
    data: midTermWeather,
    isLoading: midTermWeatherLoading,
    error: midTermWeatherError,
  } = useQuery(
    [
      "getMidTermWeather",
      {
        regId: todayMountain?.midTermForecast,
        address: todayMountain?.address,
      },
    ],
    getMidTermWeather,
    {
      enabled: !!todayMountain?.midTermForecast && !!todayMountain?.address, // ✅ 조건부 fetch
    }
  );

  // console.log("shortTermWeather", shortTermWeather);
  // console.log("midTermWeather", midTermWeather);

  /** 산 목록 취득 */
  const {
    data: mountainList,
    isLoading: mountainListLoading,
    error: mountainListError,
  } = useQuery("mountainList", fetchMountainsByCodes, {
    staleTime: Infinity, // 항상 신선하다고 간주 (무한 캐싱)
    cacheTime: Infinity, // 캐시를 영구 보관 (앱 꺼질 때까지)
    refetchOnWindowFocus: false, // 창 다시 포커스해도 refetch 안 함
    refetchOnMount: false, // 컴포넌트 재마운트해도 refetch 안 함
    refetchOnReconnect: false, // 인터넷 연결 회복해도 refetch 안 함
  });

  /** ================================================================================ */
  useEffect(() => {
    if (!!shortTermWeather && !!midTermWeather) {
      const combined = [...shortTermWeather, ...midTermWeather].slice(0, 5);
      setWeatherList(combined);
    }
  }, [shortTermWeather, midTermWeather]);

  /** ================================================================================ */
  const openExternalLink = () => {
    window.open(
      "https://www.instagram.com/sn9tk",
      "_blank",
      "noopener,noreferrer"
    );
  };

  console.log("weatherList", weatherList);

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
          <img
            src="https://songtak.github.io/bac_mt_course/assets/images/logo.png"
            alt="PeakHunter 로고"
          />
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
        <div
          className="relative flex-1 h-24 bg-gray-200 rounded-[24px] overflow-hidden shadow"
          onClick={() => {
            navigate(`/mountain/${todayMountain?.mountain_id}`);
          }}
        >
          <img
            src="https://songtak.github.io/bac_mt_course/assets/images/wallpaper.jpg"
            alt="가리왕산"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-3">
            <span className="text-sm text-gray-200 font-thin">오늘의 산</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl text-main-white font-medium">
                {todayMountain?.mountain_name}
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
            {weatherList.length > 0 &&
              weatherList.map((weather, i) => (
                <div
                  key={i}
                  className="flex flex-col items-start space-y-[-6px]"
                >
                  <span className="text-[11px] text-main-blue-200 font-thin">
                    {weather.day}
                  </span>
                  <span className="text-xl">
                    {/* 단기예보 */}
                    {weatherEmojiMap[weather.wf]}
                    {/* 중기예보 */}
                    {weatherEmojiMap[weather.wfPm]}
                  </span>
                  <span className="text-[11px] text-main-blue-200 font-thin">
                    {Math.round(
                      (Number(weather.taMin) + Number(weather.taMax)) / 2
                    )}
                    °C
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
          {mountainList &&
            mountainList.map((mountain, idx) => (
              <div
                key={idx}
                onClick={() => {
                  navigate(`/mountain/${mountain?.mountain_id}`);
                }}
                className="relative flex-shrink-0 w-[120px] h-[213px] bg-gray-300 rounded-[24px] overflow-hidden shadow"
              >
                <img
                  src={`https://songtak.github.io/bac_mt_course/assets/images/wallpaper.jpg`}
                  alt={mountain.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute p-3 inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-2">
                  <RatingBadge rating={"2.4"} />
                  <div className="text-main-white text-2xl font-light">
                    {mountain.mountain_name.split("_")[0]}
                  </div>
                  <AltitudeBadge altitude={mountain.height} />
                  <div className="flex flex-wrap  mt-1">
                    <CapitalBadge capital={mountain.address} />
                    {/* {mountain.isBac === true && <IsBacBadge />} */}
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
