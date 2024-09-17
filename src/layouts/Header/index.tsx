// import { useState } from "react";
import Button from "/src/components/Button";

// import Modal from "/src/components/Modal";
// import ProjectTemplate from "/src/components/Modal/templates/Project";
import { Link } from "react-router-dom";

import "./header.style.css";

export default function Header() {
  // const [showModal, setShowModal] = useState(false);

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <header>
      <div className="header-content">
        <div>Devtiny</div>
        <Link to="/new">
          <div>
            <Button /*onClick={toggleModal}*/>New Project</Button>
          </div>
        </Link>
      </div>
      {/* <Modal show={showModal} onClose={toggleModal}>
        <ProjectTemplate />
      </Modal> */}
    </header>
  );
}
