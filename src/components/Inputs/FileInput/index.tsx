import React, { useState } from "react";

interface FileInputProps {
  id: string;
  label: string;
  multiple?: boolean;
  onFileSelect: (files: File[]) => void;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label,
  multiple = false,
  onFileSelect,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
      onFileSelect(filesArray);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-bold">
        {label}
      </label>
      <input
        type="file"
        id={id}
        multiple={multiple}
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />
      <div className="mt-2">
        {selectedFiles.map((file, index) => (
          <div key={index} className="text-sm text-gray-600">
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileInput;
