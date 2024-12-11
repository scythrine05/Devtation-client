import React, { ChangeEvent, useRef } from "react";

interface TextInputProps {
  name: string;
  label?: string;
  helper?: React.ReactNode;
  type?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaProps extends Omit<TextInputProps, "handleChange"> {
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextInputComponent: React.FC<TextInputProps> = ({
  helper,
  name,
  label,
  type,
  handleChange,
  value,
  disabled,
  placeholder,
}) => {
  return (
    <div className="w-full my-3">
      <div>
        <label
          htmlFor={name}
          className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          className={`block text-responsive-sm w-full p-1.5 px-2 bg-transparent border-1 ${
            helper ? "border-red-700" : "border-[var(--color-white)]"
          } ${
            disabled
              ? "border-gray-800 text-gray-500"
              : "border-[var(--color-white)] text-[var(--color-dark-theme-font)]"
          } rounded-lg focus:ring-devtiny-theme-light focus:border-devtiny-theme-light`}
        />
        <div className="mt-1 mb-2 block px-2">
          {helper && (
            <p className="text-responsive-sm text-red-700">{helper}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({
  helper,
  name,
  label,
  handleChange,
  value,
  disabled,
}) => {
  return (
    <div className="w-full my-3">
      <div>
        <div className="flex justify-between">
          <label
            htmlFor={name}
            className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)"
          >
            {label}
          </label>
          {!disabled && (
            <p className="block mb-2 px-2 text-xs text-var(--color-white-2)">
              {value?.length ?? 0} / 100
            </p>
          )}
        </div>
        <textarea
          maxLength={100}
          name={name}
          rows={4}
          style={{ resize: "none" }}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`block text-responsive-sm w-full p-1.5 px-2 bg-transparent border-1 ${
            helper ? "border-red-700" : "border-[var(--color-white)]"
          } ${
            disabled
              ? "border-gray-800 text-gray-500"
              : "border-[var(--color-white)] text-[var(--color-dark-theme-font)]"
          } rounded-lg  focus:ring-devtiny-theme-light focus:border-devtiny-theme-light`}
        />
        {helper && (
          <p className="mt-2 text-responsive-sm text-red-700">{helper}</p>
        )}
      </div>
    </div>
  );
};

export const CustomTextInputComponent: React.FC<TextAreaProps> = ({
  helper,
  name,
  label,
  handleChange,
  value,
  disabled,
  placeholder,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-expand function
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }
    handleChange(e);
  };

  return (
    <div className="w-full my-3">
      <div>
        <label
          htmlFor={name}
          className="block mb-2 px-2 text-responsive-sm text-var(--color-white-2)"
        >
          {label}
        </label>
        <textarea
          ref={textAreaRef}
          name={name}
          rows={2}
          style={{ resize: "none", overflow: "hidden", lineHeight: "1.5em" }}
          value={value}
          placeholder={placeholder}
          onChange={handleInput}
          disabled={disabled}
          className={`block text-responsive-medium w-full p-1.5 px-2 bg-transparent border-0 ${
            helper ? "border-red-700" : "border-[var(--color-white)]"
          } ${
            disabled
              ? "border-gray-800 text-gray-500"
              : "border-[var(--color-white)] text-[var(--color-dark-theme-font)]"
          } focus:ring-0 focus:border-0`}
        />
        <div className="mt-1 mb-2 block px-2">
          {helper && (
            <p className="text-responsive-sm text-red-700">{helper}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextInputComponent;
