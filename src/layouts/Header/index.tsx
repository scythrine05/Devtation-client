import { useState } from "react";
import Button from "/src/components/Button";

import Modal from "/src/components/Modal";
import ProjectTemplate from "/src/components/Modal/templates/Project";
import { useAuth } from "/src/hooks/useAuth";
import { testUser } from "/src/apis/custom";

import "./header.style.css";

export default function Header() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUser = async () => {
    try {
      const response = await testUser(user);
      console.log(response);
    } catch (err) {
      console.log("error");
      console.error(err);
    }
  };

  return (
    <header>
      <div className="header-content">
        <div>Devtiny</div>
        <div>
          <Button onClick={handleUser}>New Project</Button>
        </div>
      </div>
      <Modal show={showModal} onClose={toggleModal}>
        <ProjectTemplate />
      </Modal>
    </header>
  );
}
