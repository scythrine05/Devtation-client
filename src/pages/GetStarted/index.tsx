import { useState } from "react";

import "./getStarted.style.css";

import Modal from "/src/components/Modal";
import AuthTemplate from "/src/templates/Auth";
import Button from "/src/components/Button";

export default function GetStarted() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="gs-wrapper">
      <div className="gs-content">
        <div className="gs-title">
          <h1>Showcase your Dev Powers</h1>
        </div>
        <div className="gs-description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
            incidunt totam ad necessitatibus fuga illo sunt voluptatem minus
            tempora eius molestiae beatae alias itaque quo, fugiat atque ratione
            adipisci reiciendis?
          </p>
        </div>
        <div className="gs-btn">
          <Button onClick={toggleModal}>Get Started</Button>
          <Modal show={showModal} onClose={toggleModal}>
            <AuthTemplate />
          </Modal>
        </div>
      </div>
    </div>
  );
}
