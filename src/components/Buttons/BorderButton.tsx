import React from "react";

interface Props {
  content: React.ReactNode;
}

const BorderButton = ({ content }: Props) => {
  return (
    <div className="text-[12px] h-8  px-4 py-[4.5px] border  border-gray-300 rounded-md text-gray-600 transition hover:bg-gray-100 hover:cursor-pointer">
      {content}
    </div>
  );
};

export default BorderButton;
