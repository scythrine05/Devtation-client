import React, { useEffect, useRef } from "react";
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
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      // Initialize Quill
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write description...",
        modules: {
          toolbar: [
            [{ size: ["small", "normal", "large"] }],
            ["bold", "italic", "underline"],
          ],
        },
      });

      // Listen to "text-change" events
      quill.on("text-change", () => {
        const htmlContent = quill.root.innerHTML;
        onTextChange(htmlContent);
      });

      quillRef.current = quill;
    }
  }, [onTextChange]);

  useEffect(() => {
    const quill = quillRef.current;
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)"
        >
          {label}
        </label>
      )}
      <div
        ref={editorRef}
        className="bg-red p-2 border rounded"
        style={{ minHeight: "256px", overflow: "hidden" }}
      />
    </div>
  );
};

export default QuillEditor;
