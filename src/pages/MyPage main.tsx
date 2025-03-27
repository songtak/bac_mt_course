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
import { toFormattedDate } from "../utils/helpers";

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

  useEffect(() => {
    if (user && user.email) {
      getUserBookmarks();
      getUserSummitMountains();
    }
  }, [user]);
  /** ================================================================================ */

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className="container mx-auto p-4 px-4 min-w-[360px]"
        style={{ maxWidth: "700px" }}
      >
        <div className="flex items-center justify-between mb-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer" />
          </button>
          <div className="h-10"></div>
        </div>
        {/* 내 등산 타이틀 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-8">
          내 등산 타이틀
        </h1>

        <div className="grid grid-cols-1  gap-6 ">
          {/* 지금 등산 중 섹션 - 전체 너비 사용 */}
          {mountainInProgress > 0 && (
            <section className="bg-main-white rounded-lg shadow p-4 md:col-span-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                지금 등산 중
              </h2>
              <p className="text-gray-600">
                여기에 현재 진행 중인 등산 정보가 표시됩니다.
              </p>
            </section>
          )}
          {/* 북마크 섹션 */}
          <section className="bg-main-white rounded-lg shadow p-4  min-w-[300px]">
            <div
              className="flex justify-between items-center text-justify"
              onClick={() => {
                !isOpenBookmark && setIsOpenBookmark(true);
              }}
            >
              <h2 className="text-xl  text-gray-800 ">🔖 북마크</h2>
              {isOpenBookmark ? (
                <ArrowUp
                  color="gray"
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setIsOpenBookmark(false);
                  }}
                />
              ) : (
                <ArrowDown
                  color="gray"
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setIsOpenBookmark(true);
                  }}
                />
              )}
            </div>
            {isOpenBookmark && (
              <div className="mt-4 divide-y divide-gray-200  border-gray-200 rounded-lg bg-main-white">
                {bookmarkMountainList.map((bookmark: any) => (
                  <div
                    key={bookmark.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer hover:shadow-md"
                    onClick={() => navigate(`/map/${bookmark.id}`)}
                  >
                    {/* 왼쪽 (이름 & 태그) */}
                    <div className="flex flex-col">
                      <span className="text-gray-800 leading-tight">
                        {bookmark.name}
                        {summitMountainIds.find(
                          (item) => item === bookmark.id
                        ) && (
                          <span className="text-xs ml-1 relative -top-[1px]">
                            {"  "}✅
                          </span>
                        )}
                        {/* 🚩 */}
                      </span>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="inline-block bg-blue-100 text-blue-800 text-[10px] px-1 py-0 rounded">
                          {bookmark.capital}
                        </span>
                        {bookmark.isBac && (
                          <span className="inline-block bg-orange-100 text-orange-800 text-[10px] px-1 py-0 rounded">
                            100대 명산
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 오른쪽 (높이 & 북마크) */}
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-600 font-medium">
                        {bookmark.height}m
                      </span>
                      <Bookmark
                        mountainId={bookmark.id}
                        bookmarkList={bookmarkList}
                        setBookmarkList={setBookmarkList}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* <p className="text-gray-600">
              여기에 북마크한 산 목록이 표시됩니다.
            </p> */}
          </section>

          {/* 등산 완료 목록 섹션 */}
          <section className="bg-main-white rounded-lg shadow p-4">
            <div
              className="flex justify-between items-center text-justify"
              onClick={() => {
                !isOpenSummit && setIsOpenSummit(true);
              }}
            >
              <h2 className="text-xl  text-gray-800 ">✌️ 정복 완료</h2>
              {isOpenSummit ? (
                <ArrowUp
                  color="gray"
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setIsOpenSummit(false);
                  }}
                />
              ) : (
                <ArrowDown
                  color="gray"
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setIsOpenSummit(true);
                  }}
                />
              )}
            </div>
            {isOpenSummit && (
              <div className="mt-4 divide-y divide-gray-200  border-gray-200 rounded-lg bg-main-white">
                {summitMountainList.map((summit: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer hover:shadow-md"
                    onClick={() => navigate(`/map/${summit.mountainId}`)}
                  >
                    {/* 왼쪽 (이름 & 태그) */}
                    <div className="flex flex-col">
                      <span className="text-gray-800 leading-tight">
                        {
                          summitMountainDetailList.filter(
                            (item) => item.id === summit.mountainId
                          )[0]?.name
                        }
                      </span>

                      <div className="flex items-center space-x-1 mt-1">
                        <span className="inline-block bg-blue-100 text-blue-800 text-[10px] px-1 py-0 rounded">
                          {
                            summitMountainDetailList.filter(
                              (item) => item.id === summit.mountainId
                            )[0]?.capital
                          }
                        </span>
                        {summitMountainDetailList.filter(
                          (item) => item.id === summit.mountainId
                        )[0]?.isBac && (
                          <span className="inline-block bg-orange-100 text-orange-800 text-[10px] px-1 py-0 rounded">
                            100대 명산
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 오른쪽 (높이 & 북마크) */}
                    <div className="flex items-center space-x-3">
                      <span className="pl-2 text-sm relative inline-block -top-[1px] text-gray-500">
                        {" "}
                        {toFormattedDate(summit?.createdAt)}
                      </span>
                      <span className="text-gray-600 font-medium">
                        {
                          summitMountainDetailList.filter(
                            (item) => item.id === summit.mountainId
                          )[0]?.height
                        }
                        m
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
