import { useState } from "react";
import Editor from "/src/pages/Editor";
import { BlockType } from "/src/types";

export default function New() {
  const [blocks, setBlocks] = useState<BlockType[]>([]);

  const addBlock = (type: "image" | "text") => {
    const newBlock: BlockType = { id: Date.now(), type, content: "" };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: number, content: string) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  return (
    <div className="App">
      <Editor blocks={blocks} addBlock={addBlock} updateBlock={updateBlock} />
    </div>
  );
}
