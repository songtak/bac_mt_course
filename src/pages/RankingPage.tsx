import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

const rankingData = [
  { nickname: "봉우리 헌터", item: "13" },
  { nickname: "헌터퐝", item: "11" },
  { nickname: "송아지", item: "10" },
  { nickname: "딸기우유", item: "8" },
  { nickname: "안녕", item: "7" },
];

const RankingPage = () => {
  const navigate = useNavigate();
  dayjs.extend(isoWeek);

  const getWeekRange = () => {
    const d = dayjs();
    // ISO week는 월요일이 주의 시작입니다.
    const startOfWeek = d.startOf("isoWeek");
    const endOfWeek = d.endOf("isoWeek");
    const formattedStart = startOfWeek.format("YYYY.MM.DD");
    const formattedEnd = endOfWeek.format("YYYY.MM.DD");
    return `${formattedStart} ~ ${formattedEnd}`;
  };

  return (
    <div className="min-h-screen bg-main-white flex flex-col">
      <header className="px-6 py-4 border-b border-gray-200 flex items-center">
        <button
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate("/list");
            }
          }}
          className="flex items-center text-gray-500 hover:text-gray-700 transition"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm">헌터 랭킹</span>
        </button>
      </header>
      <main className="flex-grow container mx-auto px-6 py-8">
        {/* 주간 헌터 랭킹  */}
        <div>
          <div className="bg-main-white border rounded-xl shadow-sm divide-y divide-gray-200">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end px-2 mt-4 min-h-[3rem]">
              <div className="text-2xl font-light text-gray-900 pb-4">
                🏆 주간 헌터 랭킹 – 최다 등산
              </div>
              <span className="font-light text-sm text-gray-500 mt-auto sm:mt-0 pb-1 text-end">
                ( {getWeekRange()} )
              </span>
            </div>
            {rankingData.map((rank, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 transition hover:bg-gray-50"
              >
                <span className="text-gray-900 text-lg font-light ml-6">
                  {index + 1} {rank.nickname}
                </span>
                <span className="text-gray-600 text-sm mr-6">{rank.item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 주간 헌터 랭킹 */}
      </main>

      {/* <footer className="py-4 text-center text-xs text-gray-500">
        Created with precision.
      </footer> */}
    </div>
  );
};

export default RankingPage;
