import React from "react";
import { BlockType } from "/src/types";

type BlockProps = {
  block: BlockType;
  updateBlock: (id: number, content: string) => void;
};

const Block: React.FC<BlockProps> = ({ block, updateBlock }) => {
  
  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updateBlock(block.id, e.target.value);
  };

  return (
    <div className="block">
      {block.type === "text" ? (
        <textarea
          value={block.content}
          onChange={handleContentChange}
          placeholder="Enter your text here..."
        />
      ) : (
        <input
          type="text"
          value={block.content}
          onChange={handleContentChange}
          placeholder="Enter image URL here..."
        />
      )}
    </div>
  );
};

export default Block;
