import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillProps {
  id: string;
  label?: string;
  onTextChange: (value: string) => void;
  value?: string;
}

export const QuillEditor: React.FC<QuillProps> = ({
  id,
  label,
  onTextChange,
  value,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<Quill | null>(null);
  const [editorHeight, setEditorHeight] = useState<number>(256); // Default height: 256px (h-64)

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  useEffect(() => {
    if (editorRef.current && !editor) {
      const quill = new Quill(editorRef.current, {
        placeholder: "Write description...",
        theme: "snow",
        modules: modules,
      });

      setEditor(quill);

      quill.on("text-change", () => {
        const htmlContent = quill.root.innerHTML;
        onTextChange(htmlContent);

        const newHeight = quill.root.scrollHeight + 20;
        setEditorHeight(newHeight);
      });

      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }
    }

    return () => {
      if (editor) {
        editor.off("text-change");
      }
    };
  }, [editor, value]);

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)"
      >
        {label}
      </label>
      <div
        ref={editorRef}
        className="bg-red p-2 border rounded"
        style={{ overflow: "hidden", minHeight: `${editorHeight}px` }} // Dynamic height
      />
    </div>
  );
};

export default QuillEditor;
