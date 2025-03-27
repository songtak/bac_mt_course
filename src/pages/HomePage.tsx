import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function HomePage() {
  const navigate = useNavigate();
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
    <div className="max-w-md mx-auto p-4 space-y-6 text-gray-800 bg-main-white">
      {/* 상단 로고 & 유저 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light italic">
            Peak<span className="font-bold not-italic">Hunter</span>
          </h1>
          <p className="text-xs mt-1">당신의 모든 산행이 이곳에</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold">송탁</p>
          <p className="text-xs text-gray-400">새내기 사냥꾼</p>
        </div>
      </div>

      {/* 검색창 */}
      <div className="relative">
        <input
          type="text"
          placeholder="찾고 있는 산이 있나요?"
          className="w-full rounded-full bg-gray-100 pl-10 pr-4 py-2 focus:outline-none"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1016.65 16.65z"
          />
        </svg>
      </div>

      {/* 오늘의 산 & 등산하기 */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-2xl overflow-hidden relative">
          <img
            src="https://source.unsplash.com/featured/?mountain"
            alt="산"
            className="w-full h-24 object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-3 text-main-white">
            <p className="text-xs">오늘의 산</p>
            <p className="text-base font-semibold">가리왕산</p>
          </div>
        </div>
        <button className="flex-1 bg-green-400 text-main-white rounded-2xl text-lg font-semibold flex items-center justify-center">
          등산하기
        </button>
      </div>

      {/* 주간 날씨 */}
      <div className="bg-blue-50 rounded-full px-4 py-3 flex items-center justify-between overflow-auto text-xs text-gray-600">
        <p className="font-semibold">감악산</p>
        <div className="flex gap-3 ml-4 main-whitespace-nowrap">
          {["수", "목", "금", "토", "일"].map((day) => (
            <div key={day} className="flex flex-col items-center">
              <p>{day}</p>
              <p>☁️</p>
              <p>13°C</p>
            </div>
          ))}
        </div>
      </div>

      {/* 산 리스트 */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold">산 리스트</p>
          <span className="text-gray-400 text-sm">›</span>
        </div>
        <div className="flex gap-3 overflow-x-auto">
          {/* 반복되는 카드 */}
          {[
            {
              name: "감악산",
              height: "684.7 m",
              image: "https://source.unsplash.com/featured/?mountain,1",
              tags: ["★ 4.3", "경기도", "100대 명산"],
            },
            {
              name: "지리산",
              height: "1,450 m",
              image: "https://source.unsplash.com/featured/?mountain,2",
              tags: ["★ 4.3", "경상남도", "100대 명산"],
            },
          ].map((mountain, idx) => (
            <div
              key={idx}
              className="min-w-[140px] rounded-2xl overflow-hidden relative"
            >
              <img
                src={mountain.image}
                alt={mountain.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 p-3 text-main-white flex flex-col justify-end">
                <p className="text-sm font-semibold">{mountain.name}</p>
                <p className="text-xs">{mountain.height}</p>
                <div className="flex gap-1 flex-wrap text-xs mt-1">
                  {mountain.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-2 rounded-full ${
                        tag.includes("★")
                          ? "bg-green-500 text-main-white"
                          : tag.includes("도")
                          ? "bg-blue-200 text-blue-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
