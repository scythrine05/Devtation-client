import React from "react";
import Button from "/src/components/Button";

interface PassProps {
  onNext: () => void;
}

const Password: React.FC<PassProps> = ({ onNext }) => {
  return (
    <div>
      Password
      <input type="password" />
      Confirm Password
      <input type="password" />
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};

export default Password;
