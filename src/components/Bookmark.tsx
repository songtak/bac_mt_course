import React, { useState } from "react";
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
import Toast from "./Toast";
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
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  // 애니메이션 효과를 위한 상태
  const [animate, setAnimate] = useState(false);

  const toggleBookmark = async () => {
    if (!user || !user.email) {
      setIsOpenModal(true);
      console.error("로그인된 사용자가 없습니다.");
      return;
    }
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);

    const bookmarkRef = doc(db, "bookmark", user.email);

    setBookmarkList(toggleValue(bookmarkList, mountainId));

    try {
      const bookmarkSnap = await getDoc(bookmarkRef);
      if (bookmarkSnap.exists()) {
        const data = bookmarkSnap.data();
        if (
          data.mountainId &&
          Array.isArray(data.mountainId) &&
          data.mountainId.includes(mountainId)
        ) {
          await updateDoc(bookmarkRef, {
            mountainId: arrayRemove(mountainId),
          });
          console.log(`북마크에서 ${mountainId} 제거됨.`);
          setToastMessage("북마크에서 제거했습니다.");
          setIsOpenToast(true);
        } else {
          await updateDoc(bookmarkRef, {
            mountainId: arrayUnion(mountainId),
          });
          setToastMessage("북마크에 추가했습니다.");
          setIsOpenToast(true);
          console.log(`북마크에 ${mountainId} 추가됨.`);
        }
      } else {
        await setDoc(bookmarkRef, { mountainId: [mountainId] });
        console.log(`북마크 문서를 생성하고 ${mountainId} 추가됨.`);
      }
    } catch (error) {
      console.error("북마크 토글 실패:", error);
    }

    // 애니메이션 효과 트리거: 클릭과 동시에 바로 실행, 작고 짧게 움직임
  };

  return (
    <>
      <div className="text-gray-300 pointer-events-auto opacity-70">
        <BookmarkIcon
          color={
            hasBookmark
              ? "rgb(156 163 175 / var(--tw-text-opacity, 1))"
              : "rgb(156 163 175 / var(--tw-text-opacity, 1))"
          }
          size={24}
          strokeWidth={2}
          fill={
            hasBookmark
              ? "rgb(156 163 175 / var(--tw-text-opacity, 1))"
              : "none"
          }
          className={`cursor-pointer z-10 ${
            animate ? "animate-shake-splash" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark();
          }}
        />
      </div>
      <Toast
        isOpen={isOpenToast}
        message={toastMessage}
        onClose={() => setIsOpenToast(false)}
      />
      <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-auto">
          <div
            className="absolute inset-0 bg-gray-800 opacity-75"
            onClick={() => setIsOpenModal(false)}
          ></div>
          <div className="relative bg-main-white rounded-lg shadow-lg p-4 z-10 max-w-sm ">
            <XIcon
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 hover:cursor-pointer"
              size={24}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenModal(false);
              }}
            />
            <div className="p-2 pt-2 flex flex-col items-center">
              <h2 className="text-base mb-6 mt-6 font-light">
                로그인하고 나만의 기록을 만들어 보세요.
              </h2>
              <button
                onClick={() => navigate("/sign-in")}
                className="w-full mt-1 px-4 py-2 font-light bg-blue-500 text-main-white rounded hover:bg-blue-700 transition-colors"
              >
                로그인하고 북마크하기 🔖
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes shakeSplash {
          0% {
            transform: translateX(0) scale(1);
          }
          25% {
            transform: translateX(-1px) scale(1.03);
          }
          50% {
            transform: translateX(1px) scale(1.03);
          }
          75% {
            transform: translateX(-1px) scale(1.03);
          }
          100% {
            transform: translateX(0) scale(1);
          }
        }
        .animate-shake-splash {
          animation: shakeSplash 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default Bookmark;
