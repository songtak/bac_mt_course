import React, { useState, useRef, useEffect } from "react";

interface HeightSliderProps {
  heightFilter: [number, number];
  setHeightFilter: (value: [number, number]) => void;
  isFilterReset: boolean;
}

const DualRangeSlider: React.FC<HeightSliderProps> = ({
  heightFilter,
  setHeightFilter,
  isFilterReset,
}) => {
  const min = 0;
  const max = 2000;
  const step = 50;

  // 마운트 시 부모의 초기값을 사용하고 이후에는 내부 상태로 관리
  const [minVal, setMinVal] = useState<number>(heightFilter[0]);
  const [maxVal, setMaxVal] = useState<number>(heightFilter[1]);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingThumb = useRef<"min" | "max" | null>(null);

  // 선택된 범위(파란 영역) 업데이트
  useEffect(() => {
    if (trackRef.current) {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      trackRef.current.style.left = `${minPercent}%`;
      trackRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal]);

  // 공통으로 사용할 값 업데이트 함수 (마우스와 터치 모두 사용)
  const updateValue = (clientX: number) => {
    if (!draggingThumb.current || !trackRef.current) return;
    const rect = trackRef.current.parentElement!.getBoundingClientRect();
    let newValue = ((clientX - rect.left) / rect.width) * (max - min) + min;
    newValue = Math.round(newValue / step) * step;
    if (draggingThumb.current === "min") {
      newValue = Math.min(newValue, maxVal - step);
      newValue = Math.max(newValue, min);
      setMinVal(newValue);
    } else if (draggingThumb.current === "max") {
      newValue = Math.max(newValue, minVal + step);
      newValue = Math.min(newValue, max);
      setMaxVal(newValue);
    }
  };

  // Mouse event listeners
  const mouseMoveListener = (e: MouseEvent) => {
    updateValue(e.clientX);
  };

  const mouseUpListener = () => {
    draggingThumb.current = null;
    window.removeEventListener("mousemove", mouseMoveListener);
    window.removeEventListener("mouseup", mouseUpListener);
  };

  // Touch event listeners
  const touchMoveListener = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      updateValue(e.touches[0].clientX);
    }
  };

  const touchEndListener = () => {
    draggingThumb.current = null;
    window.removeEventListener("touchmove", touchMoveListener);
    window.removeEventListener("touchend", touchEndListener);
  };

  // 시작 이벤트: 마우스와 터치 모두 등록
  const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    draggingThumb.current = thumb;
    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseup", mouseUpListener);
  };

  const handleTouchStart = (thumb: "min" | "max") => (e: React.TouchEvent) => {
    e.preventDefault();
    draggingThumb.current = thumb;
    window.addEventListener("touchmove", touchMoveListener);
    window.addEventListener("touchend", touchEndListener);
  };

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  useEffect(() => {
    setHeightFilter([minVal, maxVal]);
  }, [minVal, maxVal]);

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [isFilterReset]);

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 ">
        {/* <span>높이 </span> */}
        <span className="text-xs font-light">
          ( {minVal}m ~ {maxVal}m )
        </span>
      </label>
      <div className="relative w-full h-8">
        {/* 배경 트랙 */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-200 rounded-lg" />
        {/* 선택된 범위 표시 */}
        <div
          ref={trackRef}
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-500 rounded-lg"
        />
        {/* 최소 thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-main-white border-2 border-blue-500 rounded-full cursor-pointer"
          style={{ left: `${getPercent(minVal)}%`, zIndex: 3 }}
          onMouseDown={handleMouseDown("min")}
          onTouchStart={handleTouchStart("min")}
        />
        {/* 최대 thumb */}
        <div
          className="absolute top-1/2 left-10 -translate-y-1/2 w-5 h-5 bg-main-white border-2 border-blue-500 rounded-full cursor-pointer"
          style={{ left: `${getPercent(maxVal - 50)}%`, zIndex: 4 }}
          onMouseDown={handleMouseDown("max")}
          onTouchStart={handleTouchStart("max")}
        />
      </div>
    </div>
  );
};

export default DualRangeSlider;
