import React from "react";

interface ItemInputProps {
  id: string;
  label: string;
  onAdd: (value: string, id: string) => void;
  items: string[];
  placeholder?: string;
  errors: Record<string, string>;
}

const ItemInput: React.FC<ItemInputProps> = ({
  id,
  label,
  onAdd,
  items,
  placeholder,
  errors
}) => {
  const handleAdd = (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldId: string
  ) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      onAdd(e.currentTarget.value.trim(), fieldId);
      e.currentTarget.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 text-sm font-bold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        onKeyDown={(e) => {
          handleKeyDown(e);
          if (e.key === "Enter") {
            handleAdd(e, id);
          }
        }}
        className="w-full p-2 border rounded"
        placeholder={placeholder || ""}
      />
      {errors[id] && <span>{errors[id]}</span>}
      <div className="mt-2 flex flex-wrap">
        {items.map((item, index) => (
          <span
            key={index}
            className={`${
              item.startsWith("http")
                ? "text-blue-500 underline"
                : "bg-gray-200"
            } text-sm rounded p-1 mr-2`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ItemInput;
