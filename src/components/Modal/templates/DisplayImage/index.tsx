import React, { useState, useEffect, ChangeEvent } from "react";
import FileInputComponent from "/src/components/custom/FileUpload";
import Cropper from "/src/components/custom/ImageCropper";
import Modal from "/src/components/Modal";
import { ModalProps } from "flowbite-react";

interface DPModalProps extends ModalProps {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const DPTemplate: React.FC<DPModalProps> = ({
  show,
  onClose,
  image,
  setImage,
  setImageUrl,
}) => {
  const [currStep, setCurrStep] = useState<"imgUpload" | "imgCrop">(
    "imgUpload"
  );

  // Reset the step when the modal is closed
  useEffect(() => {
    if (!show) {
      setCurrStep("imgUpload");
    }
  }, [show]);

  // Get title based on the current step
  const getTitle = () => {
    switch (currStep) {
      case "imgUpload":
        return "Upload your view";
      case "imgCrop":
        return "Crop your view";
      default:
        return "Undefined Step";
    }
  };

  // Handle file upload (drag-and-drop or input selection)
  const handleFileUpload = (file: File) => {
    setImage(file);
    setCurrStep("imgCrop");
  };

  // Render step content
  const renderStep = () => {
    switch (currStep) {
      case "imgUpload":
        return (
          <FileInputComponent
            name="displayPicture"
            onChange={(
              input: File[] | File | ChangeEvent<HTMLInputElement>
            ) => {
              if (Array.isArray(input)) {
                //Multiple files
                input.forEach((file) => handleFileUpload(file));
              }
              //Single File
              else if (input instanceof File) {
                handleFileUpload(input);
              } else if (input.target.files?.[0]) {
                handleFileUpload(input.target.files[0]);
              }
            }}
          />
        );
      case "imgCrop":
        return <Cropper onClose={onClose} image={image} setImageUrl={setImageUrl} />;
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

export default DPTemplate;
