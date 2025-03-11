import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import _ from "lodash";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  where,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import useUserStore from "../stores/useUserStore";
import { useInView } from "react-intersection-observer";
import { mountains } from "../utils/helpers";

const cities = _.uniq(mountains().map((mountain) => mountain.ctpvNm)).sort();

interface Mountain {
  id: string;
  name: string;
  height: number;
  latitude: number;
  longitude: number;
  capital: string;
  address: string;
  gpxId?: string;
  reason?: string;
  isBac: boolean;
  code?: string;
}

interface SearchFilters {
  name: string;
  height: [number, number];
  city: string;
  isBac: boolean;
}

const defaultFilters: SearchFilters = {
  name: "",
  height: [0, 2000],
  city: "",
  isBac: false,
};

const MountainListPage = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const { ref, inView } = useInView();

  const [mountainList, setMountainList] = useState<Mountain[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);

  /** 검색 여부 */
  const [isSearch, setIsSearch] = useState(false);

  // UI에서 사용하는 필터 상태
  const [nameFilter, setNameFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState<[number, number]>([0, 2000]);
  const [cityFilter, setCityFilter] = useState("");
  const [isBacFilter, setIsBacFilter] = useState(false);
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);

  // 실제 쿼리에 적용할 검색 필터 (검색 버튼 클릭 시 업데이트)
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultFilters);

  // 검색 결과 총 갯수
  const [resultCount, setResultCount] = useState<number>(0);

  // 기본 필터와 active 필터가 동일한지 확인하는 함수
  const isDefaultFilters = (): boolean => {
    return (
      searchFilters.name.trim() === "" &&
      searchFilters.city === "" &&
      searchFilters.isBac === false &&
      searchFilters.height[0] === defaultFilters.height[0] &&
      searchFilters.height[1] === defaultFilters.height[1]
    );
  };

  // Firestore 쿼리 생성 함수 (검색 조건 적용)
  const buildQuery = (paginate: boolean = false) => {
    const baseQuery = collection(db, "mountains");
    const constraints: any[] = [];

    if (searchFilters.city) {
      constraints.push(where("capital", "==", searchFilters.city));
    }
    if (searchFilters.isBac) {
      constraints.push(where("isBac", "==", true));
    }
    if (searchFilters.name.trim()) {
      constraints.push(
        where("name", ">=", searchFilters.name),
        where("name", "<=", searchFilters.name + "\uf8ff")
      );
      constraints.push(orderBy("name"));
    } else {
      constraints.push(
        where("height", ">=", searchFilters.height[0]),
        where("height", "<=", searchFilters.height[1])
      );
      constraints.push(orderBy("height"));
    }

    if (paginate && lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    constraints.push(limit(30));
    return query(baseQuery, ...constraints);
  };

  // 검색 조건에 맞는 총 결과 갯수 취득
  const fetchResultCount = async () => {
    try {
      let count: number = 0;
      const baseQuery = collection(db, "mountains");
      if (isDefaultFilters()) {
        // 검색 전: 전체 갯수를 가져옴 (필터 없이)
        const countQuery = query(baseQuery);
        const snapshot = await getCountFromServer(countQuery);
        count = snapshot.data().count;
      } else {
        // 검색 후: 검색 조건에 맞는 갯수를 가져옴
        const constraints: any[] = [];
        if (searchFilters.city) {
          constraints.push(where("capital", "==", searchFilters.city));
        }
        if (searchFilters.isBac) {
          constraints.push(where("isBac", "==", true));
        }
        if (searchFilters.name.trim()) {
          constraints.push(
            where("name", ">=", searchFilters.name),
            where("name", "<=", searchFilters.name + "\uf8ff")
          );
          constraints.push(orderBy("name"));
        } else {
          constraints.push(
            where("height", ">=", searchFilters.height[0]),
            where("height", "<=", searchFilters.height[1])
          );
          constraints.push(orderBy("height"));
        }
        // 검색 조건의 경우 limit를 크게 잡아서 충분한 문서를 가져온 후
        constraints.push(limit(1000));
        const countQuery = query(baseQuery, ...constraints);
        const querySnapshot = await getDocs(countQuery);
        let docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Mountain[];

        // 이름 검색이 있는 경우 클라이언트에서 높이 필터 적용
        if (searchFilters.name.trim()) {
          docs = docs.filter(
            (mountain) =>
              mountain.height >= searchFilters.height[0] &&
              mountain.height <= searchFilters.height[1]
          );
        }
        count = docs.length;
      }
      console.log("최종 개수:", count);
      setResultCount(count);
    } catch (error: any) {
      console.error("Error fetching count:", error.message);
      if (error.code === "failed-precondition") {
        alert(
          "Firestore에서 복합 인덱스가 필요합니다. 에러 메시지의 링크를 통해 인덱스를 생성하거나 Firebase 콘솔에서 직접 생성해 주세요."
        );
      }
    }
  };

  // 산 목록을 Firestore에서 가져오는 함수 (reset=true면 새로 검색)
  const fetchMountains = async (reset: boolean = false) => {
    try {
      setLoading(true);
      const q = buildQuery(!reset);
      const querySnapshot = await getDocs(q);
      let fetchedData: Mountain[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Mountain[];

      // 이름 검색 시 클라이언트에서 높이 범위 필터 추가 적용
      if (searchFilters.name.trim()) {
        fetchedData = fetchedData.filter(
          (mountain) =>
            mountain.height >= searchFilters.height[0] &&
            mountain.height <= searchFilters.height[1]
        );
      }

      if (reset) {
        setMountainList(fetchedData);
      } else {
        setMountainList((prev) => [...prev, ...fetchedData]);
      }
      const lastVisibleDoc =
        querySnapshot.docs[querySnapshot.docs.length - 1] ?? null;
      setLastVisible(lastVisibleDoc);
    } catch (error) {
      console.error("Error fetching mountains:", error);
    } finally {
      setLoading(false);
    }
  };

  // 검색 필터(searchFilters) 변경 시 목록과 총 갯수를 새로 취득
  useEffect(() => {
    setLastVisible(null);
    fetchMountains(true);
    fetchResultCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters]);

  // 무한 스크롤: 마지막 요소가 보이면 다음 페이지 불러오기
  useEffect(() => {
    if (resultCount === mountainList.length) return;
    if (inView && !loading) {
      fetchMountains();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, resultCount]);

  // 검색 버튼 클릭 시 UI의 필터값을 active 검색 필터에 적용
  const handleClickSearch = () => {
    setSearchFilters({
      name: nameFilter,
      height: heightFilter,
      city: cityFilter,
      isBac: isBacFilter,
    });
  };

  // 필터 초기화: UI 상태와 active 검색 필터 모두 초기 상태로
  const resetFilters = () => {
    setNameFilter("");
    setHeightFilter([0, 2000]);
    setCityFilter("");
    setIsBacFilter(false);
    setSearchFilters(defaultFilters);
  };

  // 높이 슬라이더 핸들러
  const handleHeightChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newHeight: [number, number] = [...heightFilter];
    newHeight[index] = parseInt(e.target.value);
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
          <div className="flex items-center mb-6 h-3"></div>
          <div>
            <h1
              className="text-3xl font-bold text-gray-800 mb-8 cursor-pointer"
              onClick={() => navigate("/")}
            >
              ⛰️ 봉우리 헌터
            </h1>
          </div>

          {!userStore.isLogin ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              로그인
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => {
                // handleLogout();
                navigate("/my");
              }}
            >
              {userStore.userInfo?.nickname}
            </div>
          )}
        </div>

        {/* 검색 필터 섹션 */}
        <div
          className={`bg-white rounded-lg shadow-md p-6 mb-8 ${
            isFilterShow === false && "cursor-pointer"
          }`}
          onClick={() => {
            isFilterShow === false && setIsFilterShow(true);
          }}
        >
          {isFilterShow ? (
            <div
              className="flex justify-between cursor-pointer"
              onClick={() => setIsFilterShow(false)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">검색</h2>
              <ArrowUp />
            </div>
          ) : (
            <div
              className="flex justify-between "
              // onClick={() => setIsFilterShow(true)}
            >
              <h2 className="text-xl font-semibold text-gray-800">검색</h2>
              <ArrowDown />
            </div>
          )}

          {isFilterShow && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

                {/* 100대 명산 필터 */}
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    100대 명산 여부
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isBacFilter}
                      onChange={(e) => setIsBacFilter(e.target.checked)}
                      className="mr-2"
                    />
                    <span>100대 명산</span>
                  </div>
                </div>
              </div>
              {/* <div className="flex justify-between"> */}
              <div className="">
                {/* 검색 결과 갯수 표시 */}
                <div className="flex flex-col justify-end mt-4 text-sm text-gray-600">
                  총 <span className="">{resultCount}</span>개의 산이
                  검색되었습니다.
                </div>
                {/* 필터 버튼 */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleClickSearch}
                    className="px-4 py-2 text-sm text-gray-700 bg-blue-100 rounded-md hover:bg-blue-200 mr-2"
                  >
                    검색
                  </button>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    필터 초기화
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 산 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mountainList.length > 0 ? (
            mountainList.map((mountain) => (
              <div
                key={mountain.id}
                onClick={() => navigate(`/map/${mountain.id}`)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden opacity-80 hover:opacity-100"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`${
                      mountain.isBac
                        ? `https://songtak.github.io/bac_mt_course/assets/bac_img/${mountain.name}.jpeg`
                        : "https://songtak.github.io/bac_mt_course/assets/bac_img/empty_thumbnail_1.jpeg"
                    }`}
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
                  {mountain.capital && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2 mr-2">
                      {mountain.capital}
                    </span>
                  )}
                  {mountain.isBac && (
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-2">
                      100대 명산
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

        {/* 로딩 표시 */}
        {loading && (
          <p className="text-center text-gray-500 mt-4">⏳ 더 불러오는 중...</p>
        )}

        {/* 무한 스크롤 감지 요소 */}
        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
};

export default MountainListPage;
