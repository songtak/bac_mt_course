import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ArrowDown, ArrowUp } from "lucide-react";
import axios from "axios";
// import kor_bac from "../assets/kor_bac.json";
import { mountains, createNumberList } from "../utils/helpers";
import _ from "lodash";

const cities = _.uniq(mountains().map((mountain) => mountain.ctpvNm)).sort();

// http://openapi.forest.go.kr/openapi/service/trailInfoService/getforestspatialdataservice

function MountainListPage() {
  /** */
  const [mountainList, setMountainList] = useState<any[]>(mountains());
  const [filteredList, setFilteredList] = useState<any[]>(mountains());
  const [nameFilter, setNameFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState([0, 2000]);
  const [cityFilter, setCityFilter] = useState("");
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);

  const navigate = useNavigate();

  // 필터 적용 함수
  const applyFilters = () => {
    let filtered = [...mountainList];

    // 이름 필터링
    if (nameFilter.trim()) {
      filtered = filtered.filter((mountain) =>
        mountain.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // 높이 필터링
    filtered = filtered.filter(
      (mountain) =>
        mountain.height >= heightFilter[0] && mountain.height <= heightFilter[1]
    );

    // 도시 필터링
    if (cityFilter) {
      filtered = filtered.filter((mountain) => mountain.ctpvNm === cityFilter);
    }

    setFilteredList(filtered);
  };

  // 필터 초기화 함수
  const resetFilters = () => {
    setNameFilter("");
    setHeightFilter([0, 2000]);
    setCityFilter("");
    setFilteredList(mountainList);
  };

  // 필터 변경시 적용
  useEffect(() => {
    if (mountainList.length > 0) {
      applyFilters();
    }
  }, [nameFilter, heightFilter, cityFilter, mountainList]);

  // 높이 슬라이더 핸들러
  const handleHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newHeight = [...heightFilter];
    newHeight[index] = parseInt(e.target.value);

    // 최소값이 최대값보다 크지 않도록 확인
    if (index === 0 && newHeight[0] > newHeight[1]) {
      newHeight[0] = newHeight[1];
    } else if (index === 1 && newHeight[1] < newHeight[0]) {
      newHeight[1] = newHeight[0];
    }

    setHeightFilter(newHeight);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between">
          <div className="flex items-center mb-6 h-3"> </div>
          {/* <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
            돌아가기
          </button> */}
          <div
            className="cursor-pointer"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            회원가입
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          100대 명산 목록
        </h1>

        {/* 검색 필터 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {isFilterShow ? (
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => {
                setIsFilterShow(false);
              }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                검색 필터
              </h2>
              <ArrowDown />
            </div>
          ) : (
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => {
                setIsFilterShow(true);
              }}
            >
              <h2 className="text-xl font-semibold text-gray-800 ">
                검색 필터
              </h2>
              <ArrowUp />
            </div>
          )}
          {isFilterShow && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 이름 필터 */}
                <div>
                  <label
                    htmlFor="nameFilter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    산 이름
                  </label>
                  <div className="relative">
                    <input
                      id="nameFilter"
                      type="text"
                      placeholder="산 이름을 입력하세요"
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* 높이 필터 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    높이 범위 ({heightFilter[0]}m ~ {heightFilter[1]}m)
                  </label>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500">
                        최소: {heightFilter[0]}m
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={2000}
                        step={50}
                        value={heightFilter[0]}
                        onChange={(e) => handleHeightChange(e, 0)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">
                        최대: {heightFilter[1]}m
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={2000}
                        step={50}
                        value={heightFilter[1]}
                        onChange={(e) => handleHeightChange(e, 1)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* 도시 필터 */}
                <div>
                  <label
                    htmlFor="cityFilter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    도시
                  </label>
                  <select
                    id="cityFilter"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">모든 도시</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 필터 버튼 */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 mr-2"
                >
                  필터 초기화
                </button>
              </div>

              {/* 검색 결과 카운트 */}
              <div className="mt-4 text-sm text-gray-600">
                {filteredList.length}개의 산이 검색되었습니다. (전체{" "}
                {mountainList.length}개)
              </div>
            </>
          )}
        </div>

        {/* 산 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.length > 0 ? (
            filteredList.map((mountain) => (
              <div
                key={mountain.id}
                onClick={() => navigate(`/map/${mountain.name}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`/src/assets/bac_img/${mountain.name}.jpeg`}
                    alt={mountain.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {mountain.name}
                  </h2>
                  <p className="text-gray-600 mt-2">{mountain.height}m</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {mountain.address}
                  </p>
                  {mountain.ctpvNm && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                      {mountain.ctpvNm}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              검색 결과가 없습니다. 다른 필터 조건을 시도해보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MountainListPage;
