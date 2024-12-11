import React, { useState, useEffect } from "react";

import Modal from "/src/components/Modal";
import Sign from "./Sign";
import { ModalProps } from "flowbite-react";

const AuthTemplate: React.FC<ModalProps> = ({ show, onClose }) => {
  const [currStep, setCurrStep] = useState("signin");

  useEffect(() => {
    if (!show) {
      setCurrStep("signin");
    }
  }, [show]);

  const getTitle = () => {
    switch (currStep) {
      case "signin":
        return "Welcome back";
      case "signup":
        return "Join the community";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (currStep) {
      case "signin":
        return (
          <Sign
            onToggle={() => setCurrStep("signup")}
            authType={currStep}
          />
        );
      case "signup":
        return (
          <Sign
            onToggle={() => setCurrStep("signin")}
            authType={currStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onClose={onClose} title={getTitle()}>
      {renderStep()}
    </Modal>
  );
};

export default AuthTemplate;
