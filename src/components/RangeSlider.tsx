import React, { useState, useRef, useEffect } from "react";

const RangeSlider = ({ min = 5, max = 30, initialValue = 15, onChange }) => {
  const [value, setValue] = useState(initialValue);
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  // 클라이언트의 Y 좌표로부터 값을 업데이트 (5단위로 반올림)
  const updateValue = (clientY) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let newY = clientY - rect.top;
    newY = Math.max(0, Math.min(newY, rect.height)); // 슬라이더 범위 내로 제한
    // 맨 위: max, 맨 아래: min
    const rawValue = max - (newY / rect.height) * (max - min);
    // 5 단위로 반올림
    const steppedValue = Math.round(rawValue / 5) * 5;
    // 최소/최대 값 클램핑
    const clampedValue = Math.max(min, Math.min(steppedValue, max));
    setValue(clampedValue);
    if (onChange) onChange(clampedValue);
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e) => {
    setDragging(true);
    updateValue(e.clientY);
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    updateValue(e.clientY);
  };
  const handleMouseUp = () => {
    setDragging(false);
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e) => {
    setDragging(true);
    if (e.touches.length > 0) {
      updateValue(e.touches[0].clientY);
    }
  };
  const handleTouchMove = (e) => {
    if (!dragging) return;
    if (e.touches.length > 0) {
      updateValue(e.touches[0].clientY);
    }
  };
  const handleTouchEnd = () => {
    setDragging(false);
  };

  // 드래그 중일 때 전역 이벤트로 마우스/터치 이동 및 종료 감지
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dragging]);

  // 슬라이더 높이에 따른 핸들의 위치 계산 (핸들 높이 16px의 절반: 8)
  const sliderHeight = sliderRef.current?.clientHeight || 100;
  const percent = (max - value) / (max - min);
  const circleTop = percent * sliderHeight - 8;

  return (
    <div
      ref={sliderRef}
      className="relative h-[100px] w-12 select-none cursor-pointer"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* 세로 막대: top-0을 추가하여 항상 맨 위(0)에 고정 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[100px] w-3 bg-main-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.3)]"></div>
      {/* 슬라이더 핸들 (동그라미) */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bg-main-green-300 rounded-full w-[16px] h-[16px] shadow flex items-center justify-center"
        style={{ top: circleTop }}
      >
        {/* 필요시 값 표시 */}
        {/* <span className="text-sm text-main-blue-200">{value}</span> */}
      </div>
    </div>
  );
};

export default RangeSlider;
