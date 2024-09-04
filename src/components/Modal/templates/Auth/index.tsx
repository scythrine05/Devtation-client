import { useState } from "react";

import Sign from "./Sign";
import Info from "./Info";

export default function AuthTemplate() {
  const [currStep, setCurrStep] = useState("signin");

  const renderStep = () => {
    switch (currStep) {
      case "signin":
        return (
          <Sign
            onToggle={() => setCurrStep("signup")}
            authType={currStep}
            onNext={() => null}
          />
        );
      case "signup":
        return (
          <Sign
            onToggle={() => setCurrStep("signin")}
            authType={currStep}
            onNext={() => setCurrStep("info")}
          />
        );
      case "info":
        return <Info />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
