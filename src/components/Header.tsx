import React from "react";

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ left, center, right }) => {
  return (
    <header className="border-b border-gray-200 h-16 bg-main-white flex items-center">
      <div className="w-full max-w-screen-lg mx-auto px-6 py-4 flex items-center justify-between">
        {/* 왼쪽 영역 */}
        <div>{left}</div>
        {/* 중앙 영역 */}
        <div className="text-center">{center}</div>
        {/* 오른쪽 영역 */}
        <div className="text-right">{right}</div>
      </div>
    </header>
  );
};

export default Header;
