import React, { useEffect } from "react";
import { Modal } from "flowbite-react";
import { ModalProps } from "flowbite-react";

import "./modal.style.css";

const ModalComponent: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  title,
}) => {

  // Use useEffect to handle body scroll lock
  useEffect(() => {
    if (show) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);
  
  if (!show) return null;

  return (
    <Modal
      show={show}
      onClose={onClose}
      className="bg-black flex justify-center items-center box-content"
    >
      <Modal.Header className="bg-[var(--color-dark-theme-sub-background)] border-none p-1" />
      <Modal.Body className="bg-[var(--color-dark-theme-sub-background)] flex justify-center flex-col items-center overflow-clip">
        <div className="bg-[var(--color-dark-theme-sub-background)] text-xl border-none text-center mb-5">
          <h1 className="text-[var(--color-dark-theme-font)] text-responsive-medium font-display font-medium">
            {title}
          </h1>
        </div>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
