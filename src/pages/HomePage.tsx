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
    <div
      className="min-h-screen bg-center animate-pan flex flex-col"
      style={{
        backgroundImage:
          "url('https://songtak.github.io/bac_mt_course/assets/images/wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top", // 필요에 따라 조정
      }}
    >
      {/* 콘텐츠 */}

      {/* Header */}
      <Header
        left={
          <div
            className="text-lg font-light text-gray-900 cursor-pointer w-20 y-20"
            onClick={() => navigate("/")}
          >
            {/* 봉우리 헌터 */}
            <img
              src="https://songtak.github.io/bac_mt_course/assets/images/logo_2.png"
              alt="봉우리헌터 로고"
              style={{
                filter:
                  "invert(43%) sepia(5%) saturate(0%) hue-rotate(179deg) brightness(110%) contrast(80%)",
              }}
              // style={{ filter: "grayscale(100%) brightness(75%)" }}
            />
          </div>
          // <h1
          //   className="text-lg font-light text-gray-900 cursor-pointer"
          //   onClick={() => navigate("/")}
          // >
          //   봉우리 헌터
          // </h1>
        }
        right={
          <nav className="space-x-6 font-light">
            <button
              onClick={() => navigate("/list")}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              목록
            </button>
            {/* <button
            onClick={() => navigate("/rank")}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            헌터 랭킹
          </button> */}
          </nav>
        }
      />

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center px-8 bg-black/70 ">
        <div className="max-w-xl text-center">
          <h2 className="text-[28px] md:text-4xl font-light text-white mb-4">
            당신의 모든 산행이 이곳에
          </h2>
          <p className="text-gray-300 mb-10 font-thin">
            전국의 명산을 발견하고 나만의 등산 히스토리를 완성하세요.
          </p>
        </div>
        <button
          onClick={() => navigate("/map")}
          className="px-8 py-3 bg-white/50 text-white text-lg font-light tracking-wide rounded-lg   shadow-sm transition-all duration-300 transform hover:scale-105"
        >
          지금 떠나기
        </button>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-xs bg-white font-light">
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            openExternalLink();
          }}
        >
          Created by Songtak.
        </div>
      </footer>

      {/* Background animation CSS */}
      <style>{`
        @keyframes pan {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-pan {
          animation: pan 200s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
