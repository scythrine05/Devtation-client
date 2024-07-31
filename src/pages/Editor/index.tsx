import React from 'react';
import { BlockType } from '/src/types';
import Block from '/src/components/Block';

type EditorProps = {
  blocks: BlockType[];
  addBlock: (type: 'image' | 'text') => void;
  updateBlock: (id: number, content: string) => void;
};

const Editor: React.FC<EditorProps> = ({ blocks, addBlock, updateBlock }) => {
  return (
    <div className="editor">
      <div className="buttons">
        <button onClick={() => addBlock('text')}>Add Text Block</button>
        <button onClick={() => addBlock('image')}>Add Image Block</button>
      </div>
      {blocks.map(block => (
        <Block key={block.id} block={block} updateBlock={updateBlock} />
      ))}
    </div>
  );
};

export default Editor;