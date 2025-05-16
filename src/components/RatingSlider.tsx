import React, { useState, useRef, useEffect } from "react";

interface RatingSliderProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const RatingSlider: React.FC<RatingSliderProps> = ({
  min = 0,
  max = 5,
  step = 0.5,
  initialValue = 0,
  onChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const calculateValue = (clientX: number): number => {
    if (!sliderRef.current) return value;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.min(Math.max(steppedValue, min), max);
  };

  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    const newValue = calculateValue(clientX);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleInteractionMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    const newValue = calculateValue(clientX);
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // 드래그 중 텍스트 선택 방지
    handleInteractionStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    handleInteractionMove(e.clientX);
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    handleInteractionEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleInteractionStart(touch.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleInteractionMove(touch.clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    handleInteractionEnd();
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleMouseUp(e);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        handleTouchMove(e);
      }
    };

    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (isDraggingRef.current) {
        handleTouchEnd(e);
      }
    };

    if (isDraggingRef.current) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });
      window.addEventListener("touchend", handleGlobalTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging]);

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full px-6">
      {/* Current Value Display */}
      <div className="text-center">
        <span className="text-xl font-semibold">{value.toFixed(1)}</span>
      </div>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="relative h-14 select-none touch-none cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-200 rounded-full transform -translate-y-1/2" />

        {/* Active Track */}
        <div
          className="absolute top-1/2 left-0 h-3 bg-main-green-200 rounded-full transform -translate-y-1/2 transition-all duration-150"
          style={{ width: `${percent}%` }}
        />

        {/* Handle */}
        <div
          className={`absolute top-1/2 w-6 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 border-2 border-main-green-200 ${
            isDragging ? "scale-110" : ""
          }`}
          style={{
            left: `${percent}%`,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default RatingSlider;
