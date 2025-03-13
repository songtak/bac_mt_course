import { useNavigate } from "react-router-dom";

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
  return (
    <div
      className="min-h-screen bg-cover bg-center animate-pan flex flex-col"
      style={{
        backgroundImage:
          "url('https://songtak.github.io/bac_mt_course/assets/images/wallpaper.jpg')",
        backgroundSize: "auto 100%", // 배경을 확대해서 움직임 효과를 부각시킴
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200 bg-white">
        <h1
          className="text-3xl font-light text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          봉우리 헌터
        </h1>
        <nav className="space-x-6 font-light">
          <button
            onClick={() => navigate("/list")}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            봉우리 목록
          </button>
          <button
            onClick={() => navigate("/rank")}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            헌터 랭킹
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center px-8 bg-black/70 ">
        <div className="max-w-xl text-center">
          <h2 className="text-[28px] md:text-4xl font-light text-white mb-4">
            당신의 모든 산행이 이곳에
          </h2>
          <p className="text-gray-500 mb-10">
            전국의 명산을 발견하고 나만의 등산 히스토리를 완성하세요.
          </p>
        </div>
        <div className="flex space-x-8">
          <button
            onClick={() => navigate("/map")}
            className="px-8 py-3 bg-white text-gray-500 text-lg font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-all duration-300"
          >
            지금 떠나기
          </button>
        </div>
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
