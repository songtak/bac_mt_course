import { useEffect, useState } from "react";
import { ArrowLeft, ArrowDown, ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import Bookmark from "../components/Bookmark";
import dayjs from "dayjs";
import { signOut } from "firebase/auth";
import { toFormattedDate } from "../utils/helpers";
import "dayjs/locale/ko"; // 한국어 locale 임포트

const MyPage = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [bookmarkList, setBookmarkList] = useState<any[]>([]);
  const [bookmarkMountainList, setBookmarkMountainList] = useState<any[]>([]);

  const [isOpenBookmark, setIsOpenBookmark] = useState<boolean>(false);
  const [isOpenSummit, setIsOpenSummit] = useState<boolean>(false);
  /** 타고 있는 산 */
  const [mountainInProgress, setMountainInProgress] = useState<number>(0);
  /** 등산 완료한 산 목록 */
  const [summitMountainList, setSummitMountainList] = useState<any[]>([]);
  /** 등산 완료한 산 상세내용 목록 */
  const [summitMountainDetailList, setSummitMountainDetailList] = useState<
    any[]
  >([]);
  const [summitMountainIds, setSummitMountainIds] = useState<number[]>([]);

  // console.log(
  //   "summitMountainList",
  //   // summitMountainList[0]?.createdAt
  //   toFormattedDate(summitMountainList[3]?.createdAt)
  // );

  console.log("summitMountainDetailList", summitMountainDetailList);

  /** ============================================================================== */

  /** 내 북마크 목록 취득 */
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
        // mountainId 필드가 배열로 저장되어 있다고 가정
        getBookmarkedMountains(data.mountainId);
        setBookmarkList(data.mountainId);
        return data.mountainId || [];
      } else {
        // 북마크 문서가 없으면 빈 배열 반환
        return [];
      }
    } catch (error) {
      console.error("북마크 목록 불러오기 실패:", error);
      return [];
    }
  };

  /** 북마크 산 목록 */
  const getBookmarkedMountains = async (bookmarkIds: number[]) => {
    try {
      // Firestore in 쿼리는 최대 10개 값까지 지원됩니다.
      const q = query(
        collection(db, "mountains"),
        where("id", "in", bookmarkIds)
      );
      const querySnapshot = await getDocs(q);
      const mountainsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookmarkMountainList(mountainsData);

      return mountainsData;
    } catch (error) {
      console.error("북마크된 산 목록 불러오기 실패:", error);
      return [];
    }
  };

  // 등산 완료한 산 목록 불러오기: summitLogs 컬렉션에서 사용자 이메일로 검색 후 산 ID 목록 반환
  const getUserSummitMountains = async (): Promise<number[]> => {
    if (!user || !user.email) {
      console.error("로그인된 사용자가 없습니다.");
      return [];
    }
    try {
      const summitRef = collection(db, "summit");
      const q = query(summitRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      // 여러 번 등산한 산이 있을 수 있으므로, 중복 제거를 위해 Set 사용
      const mountainIds = new Set<number>();
      const summitMountain = new Set<any>();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.mountainId !== undefined) {
          mountainIds.add(data.mountainId);
          summitMountain.add(data);
        }
      });
      setSummitMountainList(Array.from(summitMountain));
      setSummitMountainIds(Array.from(mountainIds));
      getMountainsByIds(Array.from(mountainIds));
      console.log(" Array.from(mountainIds)", Array.from(mountainIds));

      return Array.from(mountainIds);
    } catch (error) {
      console.error("등산 완료한 산 목록 불러오기 실패:", error);
      return [];
    }
  };

  /** 등산 완료한 산 상세 내용 호출 */
  const getMountainsByIds = async (ids: number[]) => {
    if (ids.length === 0) return [];

    try {
      // Firestore의 in 연산자는 최대 10개의 값까지 지원합니다.
      const q = query(collection(db, "mountains"), where("id", "in", ids));
      const querySnapshot = await getDocs(q);
      const mountainsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSummitMountainDetailList(mountainsData);
      return mountainsData;
    } catch (error) {
      console.error("산 목록 불러오기 실패:", error);
      return [];
    }
  };

  /** ================================================================================ */

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      userStore.setLogout();
      navigate("/list");
      console.log("로그아웃 성공!");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
  /** ================================================================================ */

  useEffect(() => {
    if (user && user.email) {
      getUserBookmarks();
      getUserSummitMountains();
    }
  }, [user]);
  /** ================================================================================ */

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-200">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-light text-gray-900 cursor-pointer"
        >
          봉우리 헌터
        </h1>

        <nav
          className="font-light"
          onClick={() => {
            handleLogout();
          }}
        >
          로그아웃
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* 북마크 목록 섹션 */}
        <section className="mb-10 font-light">
          여기에 사용자 정보 알려주기
          <div>1. 총 등산 완료 횟수</div>
          <div>2. 등산 완료한 산들의 높이 총합</div>
          <div>3. 등산했던 capital 순위</div>
        </section>
        <section className="mb-10">
          <div
            className="flex justify-between"
            onClick={() => {
              setIsOpenBookmark(!isOpenBookmark);
            }}
          >
            <h2 className="text-2xl font-light text-gray-900 mb-4">북마크</h2>
            {isOpenBookmark ? (
              <ArrowUp className="text-gray-400" size={20} />
            ) : (
              <ArrowDown className="text-gray-400" size={20} />
            )}
          </div>
          {isOpenBookmark && (
            <div className="max-h-[300px] overflow-y-auto">
              {bookmarkMountainList.length > 0 ? (
                <div className="space-y-2">
                  {bookmarkMountainList.map((bookmark) => (
                    <div
                      key={bookmark.id}
                      onClick={() => navigate(`/map-detail/${bookmark.id}`)}
                      className="flex justify-between bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
                    >
                      <div>
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-light text-gray-900">
                            {bookmark.name}{" "}
                            <span className="text-[14px] font-[200]">
                              {bookmark.height}m
                            </span>
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="inline-block bg-gray-100 text-gray-700 text-[10px] px-2 py-[2px] rounded">
                            {bookmark.capital}
                          </span>
                          {(bookmark.hasBac || bookmark.isBac) && (
                            <span className="inline-block bg-sky-100 text-sky-700 text-[10px] px-2 py-[2px] rounded ml-2">
                              100대 명산
                            </span>
                          )}
                          {summitMountainIds.find(
                            (id) => id === bookmark.id
                          ) && (
                            <span className="inline-block bg-orange-100 text-orange-700 text-[10px] px-2 py-[2px] rounded ">
                              등산 완료
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Bookmark
                          mountainId={bookmark.id}
                          bookmarkList={bookmarkList}
                          setBookmarkList={setBookmarkList}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  북마크한 산이 없습니다.
                </p>
              )}
            </div>
          )}
        </section>

        {/* 등산 완료 목록 섹션 */}
        <section>
          <div
            className="flex justify-between"
            onClick={() => {
              setIsOpenSummit(!isOpenSummit);
            }}
          >
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              내가 오른 봉우리{" "}
            </h2>
            {isOpenSummit ? (
              <ArrowUp className="text-gray-400" size={20} />
            ) : (
              <ArrowDown className="text-gray-400" size={20} />
            )}
          </div>
          {isOpenSummit && (
            <div className="max-h-[300px] overflow-y-auto">
              {summitMountainList.length > 0 ? (
                <div className="space-y-4">
                  {summitMountainList.map((summit) => {
                    const detail = summitMountainDetailList.find(
                      (item) => item.id === summit.mountainId
                    );
                    return (
                      <div
                        key={summit.id}
                        onClick={() =>
                          navigate(`/map-detail/${summit.mountainId}`)
                        }
                        className="flex justify-between bg-white border border-gray-100 rounded-2xl shadow-sm p-4 hover:shadow-md transition cursor-pointer"
                      >
                        <div className="">
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-light text-gray-900">
                              {detail?.name}{" "}
                              <span className="text-[14px] font-[200] text-gray-500">
                                {detail?.height}m
                              </span>
                            </h3>
                          </div>

                          <div className="flex items-center space-x-2 mt-2">
                            <span className="inline-block bg-gray-100 text-gray-700 text-[10px] px-2 py-[2px] rounded">
                              {detail.capital}
                            </span>

                            {/* 100대 명산 여부 */}
                            {detail?.isBac && (
                              <span className="inline-block bg-sky-100 text-sky-700 text-[10px] px-2 py-[2px] rounded ml-2">
                                100대 명산
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[14px] font-[200] text-gray-500">
                            {dayjs(toFormattedDate(summit.createdAt)).format(
                              "YYYY.MM.DD (dd)"
                            )}
                          </div>
                          <div className="text-[14px] font-[200] text-gray-500">
                            {dayjs(toFormattedDate(summit.createdAt)).format(
                              "hh:mm"
                            )}{" "}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  등산 완료한 산이 없습니다.
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyPage;
