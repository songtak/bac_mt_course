import { useNavigate } from "react-router-dom";
import { Mountain } from "lucide-react";
import { jsonToGpx, jsonData } from "../utils/helpers";

function HomePage() {
  const navigate = useNavigate();

  // console.log("jsonToGpx", jsonToGpx(jsonData));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-green-50">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
          봉우리 헌터
        </h1>

        <button
          onClick={() => navigate("/list")}
          className="group relative w-32 h-32 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300">
            ⛰️
          </span>
        </button>
      </main>

      {/* <footer className="bg-white py-4 text-center shadow-lg">
        <p className="text-gray-600">한국등산-트레킹지원센터 정보 제공</p>
        https://www.komount.or.kr
      </footer> */}
    </div>
  );
}

export default HomePage;
