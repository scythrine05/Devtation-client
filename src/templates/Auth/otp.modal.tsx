import React from "react";
import Button from "/src/components/Button";

interface OtpProps {
  onNext: () => void;
}

const Otp: React.FC<OtpProps> = ({ onNext }) => {
  return (
    <div>
      <div>
        Type in the OTP
        <input type="text" />
        <Button onClick={onNext}>next</Button>
      </div>
    </div>
  );
};

export default Otp;
