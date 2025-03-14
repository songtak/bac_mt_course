import React from "react";

interface Props {
  content: React.ReactNode;
  style?: string;
}

const FillButton = ({ content, style }: Props) => {
  return (
    <div
      className={`${style} text-[12px] h-8  px-4 pt-[6px]  rounded-md text-white bg-blue-500 transition hover:bg-blue-700 hover:cursor-pointer `}
    >
      {content}
    </div>
  );
};

export default FillButton;
