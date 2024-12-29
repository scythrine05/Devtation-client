import React, { ChangeEvent, useState, DragEvent } from "react";

interface FileInputProps {
  onChange: (files: File[] | File | ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  className?: string;
  name: string;
}

const FileInputComponent: React.FC<FileInputProps> = ({
  onChange,
  multiple = false,
  className = "h-64 w-full",
  name,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onChange(multiple ? filesArray : filesArray[0]); // Emit File[] or File
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onChange(multiple ? filesArray : filesArray[0]); // Emit File[] or File
    } else {
      onChange(e); // Fallback to emitting the event
    }
  };

  return (
    <div className="flex items-center w-full">
      <div
        className={`flex flex-col items-center justify-center  rounded-lg border-2 border-dashed text-center ${
          isDragging
            ? "bg-[var(--color-dark-theme-sub-background-3)] border-gray-500"
            : "bg-transparent border-gray-600"
        }  ${className}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <svg
            className="mb-4 h-8 w-8 text-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-200">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-400">
            SVG, PNG, JPG, or GIF (MAX. 200x200px)
          </p>
        </label>
        <input
          id="file-upload"
          type="file"
          name={name}
          className="hidden"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileInputComponent;
