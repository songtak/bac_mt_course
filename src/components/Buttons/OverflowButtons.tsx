import React, { useLayoutEffect, useRef, useState } from "react";

interface OverflowButtonsProps {
  items: string[];
}

const OverflowButtons: React.FC<OverflowButtonsProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(items.length);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // 컨테이너의 전체 너비
    const containerWidth = containerRef.current.getBoundingClientRect().width;

    // 모든 버튼들을 측정 (모든 버튼들이 렌더링되어 있어야 합니다)
    const buttonNodes = containerRef.current.querySelectorAll("button");

    let totalWidth = 0;
    let count = 0;

    // "+N" 버튼 예상 너비 (필요에 따라 조정)
    const plusButtonWidth = 100;

    // 각 버튼의 너비를 순회하면서 visibleCount 결정
    for (let i = 0; i < buttonNodes.length; i++) {
      const btnWidth = buttonNodes[i].getBoundingClientRect().width;
      if (
        totalWidth + btnWidth + (i < items.length - 1 ? plusButtonWidth : 0) >
        containerWidth
      ) {
        break;
      }
      totalWidth += btnWidth;
      count++;
    }
    setVisibleCount(count);
  }, [items]);

  const hiddenCount = items.length - visibleCount;

  const showAll = () => {
    setVisibleCount(items.length);
  };

  return (
    <div ref={containerRef} className="flex space-x-2 overflow-x-auto">
      {items.slice(0, visibleCount).map((item, i) => (
        <button
          key={i}
          className="flex flex-shrink-0 items-center whitespace-nowrap h-[30px] px-3 py-1 border border-main-gray-200 text-main-gray-300 font-extralight text-[12px] rounded-full hover:bg-gray-200 transition bg-white"
        >
          {item}
        </button>
      ))}
      {hiddenCount > 0 && (
        <button
          onClick={showAll}
          className="h-[30px] px-3 py-1 border bg-white border-main-gray-200 text-main-gray-300 font-extralight text-[12px] rounded-full hover:bg-gray-200 transition"
        >
          +{hiddenCount}
        </button>
      )}
    </div>
  );
};

export default OverflowButtons;
