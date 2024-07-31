import { useState } from "react";

import Create from "./create.modal";
import Repo from "./repo.modal";

export default function ProjectTemplate() {
  const [currentStep, setCurrentStep] = useState("create");

  const renderStep = () => {
    switch (currentStep) {
      case "create":
        return <Create onNext={() => setCurrentStep("repo")} />;
      case "repo":
        return <Repo  />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
