import { useState } from "react";

import SignModal from "./sign.modal";
import Otp from "./otp.modal";
import Password from "./password.modal";
import Info from "./info.modal";

export default function AuthTemplate() {
  const [currentStep, setCurrentStep] = useState("signin");

  const renderStep = () => {
    switch (currentStep) {
      case "signin":
        return (
          <SignModal
            onToggle={() => setCurrentStep("signup")}
            authType={currentStep}
            onNext={() => null}
          />
        );
      case "signup":
        return (
          <SignModal
            onToggle={() => setCurrentStep("signin")}
            authType={currentStep}
            onNext={() => setCurrentStep("otp")}
          />
        );
      case "otp":
        return <Otp onNext={() => setCurrentStep("pass")} />;
      case "pass":
        return <Password onNext={() => setCurrentStep("info")} />;
      case "info":
        return <Info />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
