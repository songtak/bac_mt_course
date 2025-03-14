import React, { useEffect, useRef, useState } from "react";
// firebaseData.json 파일은 산 데이터 배열을 포함하고 있어야 합니다.
import firebaseData from "../../public/firebaseData.json";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import {
  ArrowLeft,
  Share,
  BookmarkIcon,
  MessageCircleQuestionIcon,
  MapPin,
  CheckCircle,
  Compass,
} from "lucide-react";
import _ from "lodash";
import * as BADGE from "../components/Badges/index";
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

interface Mountain {
  id: number;
  name: string;
  height: number;
  latitude: number;
  longitude: number;
  capital: string;
  address: string;
  fileLength: number;
  gpxId?: string;
  reason?: string;
  isBac: boolean;
  code?: string;
}

const MarkerMapPage: React.FC = () => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const user = auth.currentUser;

  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [activeTab, setActiveTab] = useState("mountains");
  /** 전체 산 */
  const [isAllMarker, setIsAllMarker] = useState<boolean>(true);
  /** 북마크 */
  const [isBookmarkMarker, setIsBookmarkMarker] = useState<boolean>(false);
  /** 등산 완료 */
  const [isSummitMarker, setIsSummitMarker] = useState<boolean>(false);

  /** 클릭한 산 */
  const [selectedMountain, setSelectedMountain] = useState<
    Mountain | undefined
  >();

  const [bookmarkList, setBookmarkList] = useState<any[]>([]);
  const [bookmarkMountainList, setBookmarkMountainList] = useState<any[]>([]);

  /** 등산 완료한 산 목록 */
  const [summitMountainList, setSummitMountainList] = useState<any[]>([]);
  /** 등산 완료한 산 상세내용 목록 */
  const [summitMountainDetailList, setSummitMountainDetailList] = useState<
    any[]
  >([]);

  const [summitMountainIds, setSummitMountainIds] = useState<number[]>([]);

  console.log("bookmarkMountainList", bookmarkMountainList);

  /** ======================================================================== */

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

  useEffect(() => {
    if (user && user.email) {
      getUserBookmarks();
      getUserSummitMountains();
    }
  }, [user]);

  /** ======================================================================== */

  useEffect(() => {
    if (!mapRef.current) return;

    // 기존 마커 모두 삭제
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 표시할 데이터 배열과 마커 색상을 결정합니다.
    let dataToShow: Mountain[] = [];
    let markerColor = "#3b82f6"; // 기본 파란색

    if (isAllMarker) {
      // 북마크 플래그 활성화: firebaseData를 사용 (북마크 산 목록)
      dataToShow = firebaseData; // firebaseData는 import한 JSON 데이터
      markerColor = "#3b82f6"; // 기본 파란색
    } else if (isSummitMarker) {
      // 등산 완료 플래그 활성화: summitMountainDetailList 사용
      dataToShow = summitMountainDetailList;
      markerColor = "#F59E0B"; // 앰버 색상
    } else if (isBookmarkMarker) {
      // 전체 산 플래그 활성화: bookmarkMountainList 사용 (또는 원하는 전체 산 데이터 배열)
      dataToShow = bookmarkMountainList;
      markerColor = "#10B981"; // 에메랄드 색상
    }

    // 선택한 데이터 배열에 대해 마커 생성
    dataToShow.forEach((mountain: Mountain) => {
      const position = new naver.maps.LatLng(
        mountain.latitude,
        mountain.longitude
      );
      const marker = new naver.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          content: `<div style="
          width:8px;
          height:8px;
          background:${markerColor};
          border-radius:50%;
          border:1px solid white;
          box-shadow: 0 0 8px rgba(0,0,0,0.2);
        "></div>`,
          anchor: new naver.maps.Point(10, 10),
        },
      });

      // 예시: 마커 클릭 시 해당 산의 상세 페이지로 이동
      naver.maps.Event.addListener(marker, "click", () => {
        // navigate(`/map-detail/${mountain.id}`);
        setSelectedMountain(mountain);
      });

      markersRef.current.push(marker);
    });
  }, [
    isAllMarker,
    isBookmarkMarker,
    isSummitMarker,
    bookmarkMountainList,
    summitMountainDetailList,
  ]);

  console.log("summitMountainIds", summitMountainIds);
  console.log("selectedMountain", selectedMountain);

  return (
    <div className="min-h-screen bg-cover bg-center animate-pan flex flex-col">
      <Header
        left={
          <button
            onClick={() => {
              if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
              } else {
                navigate("/list");
              }
            }}
            className="flex items-center text-gray-600 hover:text-gray-700 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
          </button>
        }
        right={
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
        }
      />
      <main className="flex-grow w-full max-w-screen-lg mx-auto px-6 py-8">
        <div ref={mapElement} className="h-[70vh] " />
        {!_.isUndefined(selectedMountain) && (
          <div
            onClick={() => navigate(`/map-detail/${selectedMountain.id}`)}
            className="mt-6 bg-white flex justify-between border border-gray-150 rounded-2xl shadow-sm p-4 hover:shadow-md transition cursor-pointer mx-3"
          >
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-light text-gray-900">
                  {selectedMountain.name}{" "}
                  <span className="text-[14px] font-[200]">
                    {selectedMountain.height}m
                  </span>
                </h3>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <BADGE.CapitalBadge capital={selectedMountain.capital} />
                {selectedMountain.isBac && <BADGE.IsBacBadge />}
                {summitMountainIds.find(
                  (id) => id === selectedMountain?.id
                ) && (
                  <span className="inline-block bg-orange-100 text-orange-700 text-[10px] px-2 py-[2px] rounded">
                    등산 완료
                  </span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Bookmark
                mountainId={selectedMountain.id}
                bookmarkList={bookmarkList}
                setBookmarkList={setBookmarkList}
              />
            </div>
          </div>
        )}
      </main>

      {/* 지도 하단 이벤트 버튼 그룹 */}
      {/* <section className="max-w-5xl mx-auto px-5 py-6">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={() => navigate("/national-mountains")}
            className="w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-md text-gray-900 font-light shadow-sm hover:bg-gray-50 transition"
          >
            전국 산보기
          </button>
          <button
            onClick={() => navigate("/bookmark-view")}
            className="w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-md text-gray-900 font-light shadow-sm hover:bg-gray-50 transition"
          >
            내 북마크 보기
          </button>
          <button
            onClick={() => navigate("/completed-mountains")}
            className="w-full sm:w-auto px-6 py-3 border border-gray-200 rounded-md text-gray-900 font-light shadow-sm hover:bg-gray-50 transition"
          >
            등산완료 보기
          </button>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="py-4 text-center text-gray-500 text-xs border-t border-gray-200">
        Crafted with precision and care.
      </footer> */}
    </div>
  );
};
const NavItem = ({ icon, label, isActive, onClick }: any) => {
  return (
    <button
      className={`flex flex-col items-center text-sm transition ${
        isActive ? "text-blue-600 font-semibold" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </button>
  );
};

export default MarkerMapPage;
