import { Spinner } from "flowbite-react";
import React from "react";

const LoadingComponent: React.FC = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-[var(--color-dark-theme-background)]">
    <Spinner aria-label="Large spinner example" size="md" color={"purple"} />
  </div>
);

export default LoadingComponent;
