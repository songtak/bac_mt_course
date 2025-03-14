import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ToastProps {
  message: string;
  duration?: number; // 토스트가 보이는 시간 (밀리초), 기본값 3000ms
  color?: string;
  isOpen: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  isOpen,
  message,
  duration = 1200,
  onClose,
  color = "blue",
}) => {
  // 내부 상태로 애니메이션 효과를 위해 토스트 렌더링 여부를 관리합니다.
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    setShouldRender(true);
  }, [isOpen]);

  // 토스트가 열릴 때 duration 이후에 onClose를 호출합니다.
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!shouldRender) return null;

  //   console.log("color", color);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-12 left-1/2 transform -translate-x-1/2 w-72 transition-opacity duration-300 bg-black bg-opacity-40 backdrop-blur-md px-4 py-2 rounded-md shadow-md ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-white text-sm text-center">{message}</span>
    </div>,
    document.getElementById("toast") as HTMLElement
  );
};

export default Toast;
