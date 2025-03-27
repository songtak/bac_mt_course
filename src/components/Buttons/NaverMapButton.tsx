import React from "react";
import * as BUTTON from "../Buttons/index";

interface NaverMapButtonProps {
  name: string;
  latitude: number;
  longitude: number;
}

const NaverMapButton: React.FC<NaverMapButtonProps> = ({
  name,
  latitude,
  longitude,
}) => {
  const openNaverMap = () => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // 모바일: 네이버 지도 앱을 여는 URL 스킴
      // appname은 여러분의 앱 패키지명(있는 경우) 또는 임의 문자열로 지정할 수 있습니다.
      const appName = "com.example.myapp"; // 필요에 따라 수정하세요.
      const url = `nmap://search?query=${encodeURIComponent(
        name
      )}&lat=${latitude}&lng=${longitude}&appname=${appName}`;
      window.location.href = url;
    } else {
      // PC: 네이버 지도 웹사이트 URL (새 탭에서 열기)
      const url = `https://map.naver.com/v5/search/${encodeURIComponent(
        name
      )}%20${longitude},${latitude}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <BUTTON.FillButton
      content={<span onClick={openNaverMap}>네이버 지도에서 보기</span>}
      style="!bg-[#03C75A]"
    />
    // <button
    //   onClick={openNaverMap}
    //   className="px-4 py-2 bg-blue-600 text-main-white rounded hover:bg-blue-700 transition"
    // >
    //   네이버 지도에서 보기
    // </button>
  );
};

export default NaverMapButton;
