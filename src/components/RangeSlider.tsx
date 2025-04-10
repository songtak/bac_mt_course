import React, { useState, useRef, useEffect } from "react";

interface RangeSliderProps {
  min?: number;
  max?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  onImmediatelyChange?: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 5,
  max = 30,
  initialValue = 15,
  onChange,
  onImmediatelyChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const currentValueRef = useRef<number>(initialValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  // 클라이언트의 Y 좌표로부터 값을 업데이트 (5단위로 반올림)
  // onChange는 호출하지 않고, 내부 상태와 ref 만 업데이트
  const updateValue = (clientY: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let newY = clientY - rect.top;
    newY = Math.max(0, Math.min(newY, rect.height)); // 슬라이더 범위 내로 제한
    const rawValue = max - (newY / rect.height) * (max - min);
    const steppedValue = Math.round(rawValue / 5) * 5;
    const clampedValue = Math.max(min, Math.min(steppedValue, max));
    // 즉시 ref 업데이트 (동기적)
    currentValueRef.current = clampedValue;
    // 상태 업데이트 (비동기적)
    setValue(clampedValue);
    onImmediatelyChange(clampedValue);
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    updateValue(e.clientY);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    updateValue(e.clientY);
  };
  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
      // 드래그 종료 시 현재 ref에 있는 값을 onChange 호출
      if (onChange) onChange(currentValueRef.current);
    }
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    if (e.touches.length > 0) {
      updateValue(e.touches[0].clientY);
    }
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (!dragging) return;
    if (e.touches.length > 0) {
      updateValue(e.touches[0].clientY);
    }
  };
  const handleTouchEnd = () => {
    if (dragging) {
      setDragging(false);
      if (onChange) onChange(currentValueRef.current);
    }
  };

  // 드래그 중 전역 이벤트로 이동 및 종료 감지
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

  // 슬라이더 높이에 따른 핸들의 위치 계산 (핸들 높이: 16px, 절반: 8px)
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
      {/* 세로 막대: 항상 상단(top-0)에 고정 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-[100px] w-3 bg-main-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.3)]" />
      {/* 슬라이더 핸들 (동그라미) */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bg-main-green-300 rounded-full w-[16px] h-[16px] shadow flex items-center justify-center"
        style={{ top: circleTop }}
      />
    </div>
  );
};

export default RangeSlider;
