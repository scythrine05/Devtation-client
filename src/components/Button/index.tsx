import React from "react";
import "./button.style.css";
import { Button, Spinner } from "flowbite-react";

interface ButtonProps {
  children: React.ReactNode;
  [key: string]: any;
  loading?: boolean;
}

const TheRealButtonComponent: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <div>
      <Button
        className="bg-devtiny-theme bg-clip-content bg-gradient-to-r from-devtiny-theme to-devtiny-theme-2"
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export const ThemeButton: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <Button
      className="bg-devtiny-theme p-0 border-none font-normal font-display hover:!bg-devtiny-theme-light focus:outline-none focus:ring-0 active:outline-none"
      {...props}
    >
      {loading ? <Spinner size="sm" className="mx-2" color="purple" /> : null}
      {children}
    </Button>
  );
};

export const SecodaryButton: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <Button
      className="bg-[var(--color-dark-theme-sub-background-3)] p-0 border-none font-normal font-display hover:!bg-gray-500 focus:outline-none focus:ring-0 active:outline-none"
      {...props}
    >
      {loading ? <Spinner size="sm" className="mx-2" color="purple" /> : null}
      {children}
    </Button>
  );
};

export const DangerButton: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}) => {
  return (
    <Button
      color="failure"
      className="p-0 border-none font-normal font-display focus:outline-none focus:ring-0 active:outline-none"
      {...props}
    >
      {loading ? <Spinner size="sm" className="mx-2" color="red" /> : null}
      {children}
    </Button>
  );
};

export default TheRealButtonComponent;
