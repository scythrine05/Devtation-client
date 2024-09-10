// ErrorComponent.tsx
import React from "react";

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => (
  <div>
    <h2>Error: {error}</h2>
  </div>
);

export default ErrorComponent;
