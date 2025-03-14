import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, Search, X } from "lucide-react";
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
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../utils/firebaseConfig";
import useUserStore from "../stores/useUserStore";
import { useInView } from "react-intersection-observer";
// import { mountains } from "../utils/helpers";
import HeightSlider from "../components/HeightSlider"; // HeightSlider 컴포넌트 import
import Bookmark from "../components/Bookmark";
import { signOut } from "firebase/auth";
import {
  customParseGpx,
  calculateElevationGain,
  calculate3DDistance,
  isWithinMeters,
} from "../utils/geoHeplers";
const cities = [
  "강원특별자치도",
  "경기도",
  "경상남도",
  "경상북도",
  "부산광역시",
  "서울특별시",
  "울산광역시",
  "인천광역시",
  "전라남도",
  "전북특별자치도",
  "제주특별자치도",
  "충청남도",
  "충청북도",
];

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

/** 산목록 */
const MountainListPage = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const { ref, inView } = useInView();

  const [mountainList, setMountainList] = useState<Mountain[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);

  // UI에서 사용하는 필터 상태
  const [nameFilter, setNameFilter] = useState("");
  const [heightFilter, setHeightFilter] = useState<[number, number]>([0, 2000]);
  const [cityFilter, setCityFilter] = useState("");
  const [isBacFilter, setIsBacFilter] = useState(false);
  const [isFilterShow, setIsFilterShow] = useState<boolean>(false);
  const [isFilterReset, setIsFilterReset] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const [bookmarkList, setBookmarkList] = useState<number[]>([]);

  // 실제 쿼리에 적용할 검색 필터 (검색 버튼 클릭 시 업데이트)
  const [searchFilters, setSearchFilters] =
    useState<SearchFilters>(defaultFilters);

  // 검색 결과 총 갯수
  const [resultCount, setResultCount] = useState<number>(0);
  /** ================================================================================ */
  const user = auth.currentUser;

  /** 북마크 정보 취득 */
  const getUserBookmarks = async (): Promise<string[]> => {
    if (!user || !user.email) {
      console.error("로그인된 사용자가 없습니다.");
      return [];
    }

    try {
      const bookmarkRef = doc(db, "bookmark", user.email);
      const bookmarkSnap = await getDoc(bookmarkRef);
      if (bookmarkSnap.exists()) {
        const data = bookmarkSnap.data();
        // mountainId 필드가 배열로 저장되어 있음

        setBookmarkList(data.mountainId);
        return data.mountainId || [];
      } else {
        // 북마크 문서가 없으면 빈 배열 반환
        return [];
      }
    } catch (error) {
      console.error("북마크 목록 호출 실패:", error);
      return [];
    }
  };

  /** 사용자 위치 정보 취득 */
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // naver.maps.LatLng 객체 생성 (필요시)
          const myLatLng = new naver.maps.LatLng(lat, lng);
          console.log("내 위치:", lat, lng);
          // 여기서 myLatLng을 사용해 추가 로직을 작성할 수 있습니다.
          getNearbyMountains(lat, lng);
        },
        (error) => {
          console.error("위치 정보를 가져오지 못했습니다.", error);
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  const getNearbyMountains = async (
    userLat: number,
    userLon: number,
    radiusInKm: number = 5
  ) => {
    // 반경에 따른 위도/경도 차이 계산
    const latDelta = radiusInKm / 111; // 약 5km에 해당하는 위도 차이
    const lonDelta = radiusInKm / (111 * Math.cos(userLat * (Math.PI / 180))); // 경도 차이는 위도에 따라 달라짐

    const minLat = userLat - latDelta;
    const maxLat = userLat + latDelta;
    const minLon = userLon - lonDelta;
    const maxLon = userLon + lonDelta;

    // 산 문서에는 'latitude'와 'longitude' 필드가 있어야 합니다.
    const mountainsRef = collection(db, "mountains");
    const q = query(
      mountainsRef,
      where("latitude", ">=", minLat),
      where("latitude", "<=", maxLat),
      where("longitude", ">=", minLon),
      where("longitude", "<=", maxLon)
    );

    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 클라이언트 사이드에서 정확한 거리 계산 후 필터링 (isWithinMeters 함수 사용)
    const nearbyMountains = results.filter((mountain: any) =>
      isWithinMeters(
        userLat,
        userLon,
        mountain.latitude,
        mountain.longitude,
        radiusInKm
      )
    );

    console.log("nearbyMountains", nearbyMountains);

    return nearbyMountains;
  };

  useEffect(() => {
    if (user && user.email) {
      getUserBookmarks();
    }
  }, [user]);

  useEffect(() => {
    getUserLocation();
  }, [navigator.geolocation]);

  /** ================================================================================ */

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
      // console.log("최종 개수:", count);
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
    setIsSearched(true);
  };

  // 필터 초기화: UI 상태와 active 검색 필터 모두 초기 상태로
  const resetFilters = () => {
    setNameFilter("");
    setHeightFilter([0, 2000]);
    setCityFilter("");
    setIsBacFilter(false);
    setSearchFilters(defaultFilters);
    setIsFilterReset(!isFilterReset);
    setIsSearched(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/list");
      console.log("로그아웃 성공!");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

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
          {!userStore.isLogin ? (
            <span
              onClick={() => navigate("/sign-in")}
              className="cursor-pointer font-light text-gray-900 transition hover:underline"
            >
              로그인
            </span>
          ) : (
            <span
              onClick={() => navigate("/my")}
              className="cursor-pointer font-light text-gray-900 transition hover:underline"
            >
              {userStore.userInfo?.nickname} 🦖
            </span>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-5 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex ">
            <h2 className="text-2xl font-light text-gray-700 mb-4 sm:mb-0">
              봉우리 목록
            </h2>
            <div
              className={`mt-[6px] h-6 w-6 inline-flex items-center justify-center p-1 border border-gray-300 rounded-full hover:cursor-pointer hover:bg-gray-100 ml-2 ${
                isFilterShow ? "bg-gray-100" : ""
              }`}
              onClick={() => setIsFilterShow(!isFilterShow)}
            >
              <Search className="text-gray-400" size={16} />
            </div>
          </div>
          <div className="flex mt-4 sm:mt-0">
            <div
              className="text-[14px] h-10 font-light px-4 py-2 border border-gray-300 rounded-md text-gray-900 transition hover:bg-gray-100 hover:cursor-pointer mr-2"
              onClick={() => navigate("/rank")}
            >
              헌터 랭킹
            </div>
            <div
              className="text-[14px] h-10 font-light px-4 py-2 border border-gray-300 rounded-md text-gray-900 transition hover:bg-gray-100 hover:cursor-pointer"
              onClick={() => navigate("/map")}
            >
              내 주변 봉우리 찾기
            </div>
          </div>
        </div>

        {/* 검색 필터 섹션 */}

        {/* <div
            className="flex justify-between items-center"
            onClick={() => setIsFilterShow(!isFilterShow)}
          >
            <Search className="text-gray-400" size={20} />
            {isFilterShow ? (
              <ArrowUp className="text-gray-400" size={20} />
            ) : (
              <ArrowDown className="text-gray-400" size={20} />
            )}
          </div> */}

        {isFilterShow && (
          <div
            className={`bg-white/95  rounded-xl shadow-lg p-6 mb-4 border transition duration-300 ${
              !isFilterShow && "cursor-pointer"
            }`}
            onClick={() => {
              !isFilterShow && setIsFilterShow(true);
            }}
          >
            <X
              className="text-gray-400 float-end mb-4 hover:cursor-pointer"
              size={24}
              onClick={() => {
                isFilterShow && setIsFilterShow(false);
              }}
            />

            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* 도시 필터 */}
                <div>
                  <label
                    htmlFor="cityFilter"
                    className="block text-sm font-light text-gray-700 mb-1"
                  >
                    도시
                  </label>
                  <select
                    id="cityFilter"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">모든 도시</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 높이 필터 */}
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-1">
                    높이
                  </label>
                  <HeightSlider
                    heightFilter={heightFilter}
                    setHeightFilter={setHeightFilter}
                    isFilterReset={isFilterReset}
                  />
                </div>

                {/* 이름 필터 */}
                <div>
                  <label
                    htmlFor="nameFilter"
                    className="block text-sm font-light text-gray-700 mb-1"
                  >
                    산 이름
                  </label>
                  <div className="relative">
                    <input
                      id="nameFilter"
                      type="text"
                      placeholder="산 이름 입력"
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search
                      className="absolute right-3 top-2.5 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>

                {/* 100대 명산 필터 */}
                <div className="flex flex-col justify-end">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isBacFilter}
                      onChange={(e) => setIsBacFilter(e.target.checked)}
                      className="mr-2 cursor-pointer"
                    />
                    <span
                      className="text-sm cursor-pointer"
                      onClick={() => setIsBacFilter(!isBacFilter)}
                    >
                      100대 명산
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
                <div className="text-sm text-gray-500">
                  총{" "}
                  <span className="text-blue-600 font-medium">
                    {resultCount}
                  </span>
                  개의 산 검색됨
                </div>
                <div className="mt-4 md:mt-0 flex space-x-4">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md shadow-sm hover:bg-gray-50 transition"
                  >
                    필터 초기화
                  </button>
                  <button
                    onClick={handleClickSearch}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-sky-700 transition"
                  >
                    검색
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {mountainList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {mountainList.map((mountain) => (
              <div
                key={mountain.id}
                onClick={() => navigate(`/map-detail/${mountain.id}`)}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
              >
                {/* 이미지 영역 (카드 상단에 플러시하게) */}
                <div className="h-48 overflow-hidden rounded-t-xl">
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
                {/* 산 정보 영역에만 패딩 적용 */}
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-light text-gray-900">
                      {mountain.name}
                    </h3>
                    <div
                      className="pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Bookmark
                        mountainId={mountain.id}
                        bookmarkList={bookmarkList}
                        setBookmarkList={setBookmarkList}
                      />
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
                      <span className="inline-block bg-sky-100 text-sky-700 text-xs px-2 py-1 rounded ml-2">
                        100대 명산
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          isSearched &&
          !loading && (
            <div className="bg-white rounded-lg shadow-md  transition-shadow duration-300  overflow-hidden ">
              <div className="col-span-3 text-center py-12 text-gray-700">
                <div className="text-2xl pb-4  font-light">결과가 없어요.</div>
                <div className="font-light">
                  다른 조건으로 한 번 더 찾아보시겠어요?
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* 로딩 표시 */}
      {loading && (
        <p className="text-center text-gray-500 mt-4">봉우리 오르는 중...</p>
      )}

      {/* 무한 스크롤 감지 요소 */}
      <div ref={ref} className="h-10" />
      {/* <div>
          <p className="text-gray-900 text-sm">⚠️ 이용 시 안내 말씀</p>
          <p className="text-xs text-gray-500 pt-2">
            봉우리 헌터는 여러분의 즐겁고 편안한 등산을 돕기 위해 공식적으로
            공개된 여러 정보를 바탕으로 산 정보를 제공하고 있어요.
          </p>
          <p className="text-xs text-gray-500 pt-2">
            다만, 자료를 정리하고 입력하는 과정에서 일부 정보가 실제와 조금 다를
            수 있습니다.
          </p>
          <p className="text-xs text-gray-500 pt-2">
            만약 잘못된 정보나 실제와 다른 부분을 발견하시면 언제든지 편하게
            알려주세요!
          </p>
          <p className="text-xs text-gray-500">
            빠르게 확인하고 반영해서 더 정확한 정보를 제공하겠습니다.
          </p>
          <p className="text-xs text-gray-500 pt-2">
            항상 더 좋은 봉우리 헌터가 되도록 최선을 다할게요!
          </p>
          <p className="text-xs text-gray-500 pt-2">고맙습니다! 🌄</p>
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default MountainListPage;
