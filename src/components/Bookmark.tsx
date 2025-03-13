import { useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import { BookmarkIcon, XIcon } from "lucide-react";
import { toggleValue } from "../utils/helpers";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

interface Props {
  mountainId: number | undefined;
  bookmarkList: number[];
  setBookmarkList: (bookmarkList: number[]) => void;
}

const Bookmark = ({ mountainId, bookmarkList, setBookmarkList }: Props) => {
  const navigate = useNavigate();

  const hasBookmark = bookmarkList.find((id: number) => id === mountainId);

  const user = auth.currentUser;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggleBookmark = async () => {
    if (!user || !user.email) {
      setIsOpenModal(true);
      console.error("로그인된 사용자가 없습니다.");
      return;
    }

    const bookmarkRef = doc(db, "bookmark", user.email);

    setBookmarkList(toggleValue(bookmarkList, mountainId));

    try {
      const bookmarkSnap = await getDoc(bookmarkRef);
      if (bookmarkSnap.exists()) {
        const data = bookmarkSnap.data();
        // mountainId 필드가 존재하고, 이미 포함되어 있다면 제거, 아니면 추가
        if (
          data.mountainId &&
          Array.isArray(data.mountainId) &&
          data.mountainId.includes(mountainId)
        ) {
          await updateDoc(bookmarkRef, {
            mountainId: arrayRemove(mountainId),
          });
          console.log(`북마크에서 ${mountainId} 제거됨.`);
        } else {
          await updateDoc(bookmarkRef, {
            mountainId: arrayUnion(mountainId),
          });
          console.log(`북마크에 ${mountainId} 추가됨.`);
        }
      } else {
        // 문서가 존재하지 않으면 새로 생성하고 mountainId 배열에 해당 산 ID를 추가
        await setDoc(bookmarkRef, { mountainId: [mountainId] });
        console.log(`북마크 문서를 생성하고 ${mountainId} 추가됨.`);
      }
    } catch (error) {
      console.error("북마크 토글 실패:", error);
    }
  };
  return (
    <>
      <div className="text-amber-500 pointer-events-auto">
        <BookmarkIcon
          color="currentColor"
          size={24}
          strokeWidth={2}
          fill={`${hasBookmark ? "currentColor" : "none"} `}
          className="cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark();
          }}
        />
      </div>
      <Modal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        children={
          <div className="fixed inset-0 flex items-center justify-center  pointer-events-auto">
            {/* 백드롭 */}
            <div
              className="absolute inset-0 bg-gray-800 opacity-75"
              onClick={() => {
                setIsOpenModal(false);
              }}
            ></div>
            {/* 모달 내용 */}
            <div className="relative bg-white rounded-lg shadow-lg p-4 z-10 max-w-sm w-full">
              {/* 왼쪽 상단 엑스 버튼 */}
              <XIcon
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 hover:cursor-pointer"
                onClick={() => {
                  setIsOpenModal(false);
                }}
              />
              <div className="p-2 pt-2 items-center">
                <h2 className="text-lg  mb-6 mt-6">
                  로그인하고 나만의 산 기록을 만들어 보세요.
                </h2>
                <button
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                  className="w-full mt-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  로그인하고 북마크하기 🔖
                </button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default Bookmark;
