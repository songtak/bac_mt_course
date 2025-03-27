import React from "react";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-main-white/50">
      <div className="flex flex-col items-center">
        {/* 원형 스피너 */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700 text-lg font-light">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
