import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Make sure to import Quill's CSS

interface QuillProps {
  id: string,  
  label: string;
  onTextChange: (value: string) => void;
}

export const QuillEditor: React.FC<QuillProps> = ({ id, label, onTextChange }) => {
  const editorRef = useRef<HTMLDivElement>(null); // Reference to the editor DOM element
  const [editor, setEditor] = useState<Quill | null>(null);

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }], // Text size
      ["bold", "italic", "underline"], // Bold, Italic, Underline
      [{ list: "ordered" }, { list: "bullet" }], // Ordered & Unordered lists
    ],
  };

  useEffect(() => {
    if (editorRef.current && !editor) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: modules,
      });

      setEditor(quill);

      // Add a listener for the text-change event
      quill.on("text-change", () => {
        const htmlContent = quill.root.innerHTML;
        onTextChange(htmlContent);
      });
    }

    return () => {
      if (editor) {
        editor.off("text-change");
      }
    };
  }, [editor]);

  return <div><label htmlFor={id} className="block mb-2 text-sm font-bold">
  {label}
</label><div ref={editorRef} className="bg-red p-2 border rounded h-64" /></div>;
};

export default QuillEditor;
