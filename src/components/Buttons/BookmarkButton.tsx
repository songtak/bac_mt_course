import React, { useState, useEffect } from "react";
import { BookmarkIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "../../stores/useUserStore";
import { createBookmark, deleteBookmark } from "../../apis/bookmarkApi";

const BookmarkButton = ({ mountain_detail }: any) => {
  const userStore = useUserStore();
  const bookmarkList = useUserStore((state) => state.bookmarkList);

  // bookmarkInfo 상태: 북마크 정보 객체 (존재하면 해당 산이 북마크된 것)
  const [bookmarkInfo, setBookmarkInfo] = useState<any>(null);

  // 북마크 생성 Mutation 연결
  const setBookmark = useMutation({
    mutationFn: createBookmark,
    onSuccess: (data) => {
      console.log("북마크 생성 완료, 문서 ID:", data);
      // 북마크 생성 후 bookmarkInfo 갱신(필요시 서버에서 새로 가져온 값을 사용하거나, 간단히 mountain_detail 기반 객체 생성)
      setBookmarkInfo({
        mountain_id: mountain_detail.mountain_id /* 다른 속성들 */,
      });
    },
    onError: (error) => {
      console.error("북마크 생성 실패:", error);
    },
  });

  // 북마크 생성 Mutation 연결
  const handleClickDeleteBookmark = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: (data) => {
      console.log("북마크 삭제 완료, 문서 ID:", data);
      // 북마크 삭제 성공 후 bookmarkInfo 상태를 null로 업데이트
      setBookmarkInfo(null);
    },
    onError: (error) => {
      console.error("북마크 삭제 실패:", error);
    },
  });

  const handleSubmit = () => {
    if (bookmarkInfo) {
      handleClickDeleteBookmark.mutate(bookmarkInfo.id as string);
    } else {
      setBookmark.mutate(mountain_detail);
    }
  };

  /** 게스트일 때 클릭 */
  const handleClickGuest = () => {
    console.log("로그인이 필요한 서비스입니다. 로그인할까요?");
  };

  console.log("bookmarkInfo", bookmarkInfo);

  useEffect(() => {
    if (!mountain_detail || !bookmarkList) return;

    // 북마크 목록에서 해당 산의 mountain_id와 일치하는 북마크 객체 찾기
    const foundBookmark = bookmarkList.find(
      (bookmark) => bookmark.mountain_id === mountain_detail.mountain_id
    );
    setBookmarkInfo(foundBookmark || null);
  }, [bookmarkList, mountain_detail]);

  return (
    <div className="flex text-main-gray-200">
      <BookmarkIcon
        // bookmarkInfo가 존재하면 이미 북마크된 상태로 스타일 또는 아이콘 상태 변경 가능
        className={bookmarkInfo ? "fill-current text-main-bookmark" : ""}
        onClick={() => {
          userStore.isLogin ? handleSubmit() : handleClickGuest();
        }}
      />
    </div>
  );
};

export default BookmarkButton;
