import React from "react";
import { Modal } from "flowbite-react";
import { ModalProps } from "flowbite-react";

const ModalComponent: React.FC<ModalProps> = ({
  show,
  onClose,
  children,
  title,
}) => {
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
