import React from "react";

//Icons
import { AiOutlineTag } from "react-icons/ai";

interface ItemInputProps {
  name: string;
  label: string;
  onAdd: (value: string, id: string) => void;
  onRemove: (value: string) => void; // Add a new prop for removing an item
  items: string[];
  placeholder?: string;
  errors?: string;
}

const ItemInput: React.FC<ItemInputProps> = ({
  name,
  label,
  onAdd,
  onRemove, // Use the new prop
  items,
  placeholder,
  errors,
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
    <div className="w-full mb-6">
      <label
        htmlFor={name}
        className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)"
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        onKeyDown={(e) => {
          handleKeyDown(e);
          if (e.key === "Enter") {
            handleAdd(e, name);
          }
        }}
        className={`block text-responsive-sm w-full p-1.5 px-2 bg-transparent border-1 ${
          errors ? "border-red-700" : "border-[var(--color-white)]"
        }  rounded-lg focus:ring-devtiny-theme-light focus:border-devtiny-theme-light`}
        placeholder={placeholder || ""}
      />
      {errors && (
        <p className="mt-2 text-responsive-sm text-red-700">{errors}</p>
      )}
      <div className="mt-2 flex flex-wrap">
        {items.map((item, index) => (
          <div
            key={index}
            className="mt-2 flex items-center bg-[var(--color-dark-theme-sub-background-3)] rounded p-1 mr-2 text-responsive-sm text-var(--color-white-2)"
          >
            <span className="mr-1">
              <AiOutlineTag />
            </span>
            <span>{item}</span>
            <button
              onClick={() => onRemove(item)}
              className="ml-2 text-gray-300 hover:text-gray-50"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemInput;
