import React from "react";
import "./button.style.css"

interface PrimaryProps {
  children: React.ReactNode;
  [key: string]: any; 
}

const Button: React.FC<PrimaryProps> = ({ children, ...props }) => {
  return <button className="primary-btn" {...props}>{children}</button>;
};

export default Button;
