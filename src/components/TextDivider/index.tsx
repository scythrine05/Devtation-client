import React from "react";

interface TextDividerProps {
  text: string;
}

const TextDivider: React.FC<TextDividerProps> = ({ text }) => {
  return (
    <div className="w-full flex items-center my-2">
      <div className="flex-grow border-t border-gray-500"></div>
      <span className="mx-3 text-gray-400 font-display text-responsive-sm">{text}</span>
      <div className="flex-grow border-t border-gray-500"></div>
    </div>
  );
};

export default TextDivider;
