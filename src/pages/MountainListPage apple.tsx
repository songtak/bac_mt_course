import React from "react";
import { useNavigate } from "react-router-dom";
import Bookmark from "../components/Bookmark";
import useUserStore from "../stores/useUserStore";
import { mountains } from "../utils/helpers";

function MountainListPage() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <h1
          className="text-3xl font-light text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          봉우리 헌터
        </h1>
        <nav className="space-x-6">
          <button
            onClick={() => navigate("/list")}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            산목록
          </button>
          <button
            onClick={() => navigate("/map")}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            지도
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-light text-gray-700 mb-8">산 목록</h2>
        {mountains() && mountains().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {mountains().map((mountain) => (
              <div
                key={mountain.id}
                onClick={() => navigate(`/map/${mountain.id}`)}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4 cursor-pointer"
              >
                {/* 이미지 영역 */}
                <div className="h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={
                      "https://songtak.github.io/bac_mt_course/assets/bac_img/empty_thumbnail_1.jpeg"
                    }
                    alt={mountain.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 산 정보 */}
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-light text-gray-900">
                      {mountain.name}
                    </h3>
                    <div
                      className="pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* <Bookmark
                        mountainId={mountain.id}
                        bookmarkList={bookmarkList}
                        setBookmarkList={setBookmarkList}
                      /> */}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{mountain.height}m</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {mountain.address}
                  </p>
                  <div className="mt-3">
                    {mountain.capital && (
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {mountain.capital}
                      </span>
                    )}
                    {mountain.isBac && (
                      <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded ml-2">
                        100대 명산
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm border-t border-gray-200">
        Created by Songtak.
      </footer>
    </div>
  );
}

export default MountainListPage;
