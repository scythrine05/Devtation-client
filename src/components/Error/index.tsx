// ErrorComponent.tsx
import React from "react";

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => (
  <div className="w-screen h-screen flex items-center justify-center bg-[var(--color-dark-theme-background)]">
    <span className="bg-gray-900 font-display p-2 rounded-md">
      <h2>{error}</h2>
    </span>
  </div>
);

export default ErrorComponent;
