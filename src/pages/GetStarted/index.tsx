import { useState } from "react";

import AuthTemplate from "/src/components/Modal/templates/Auth";
import { ThemeButton } from "/src/components/Button";
import Header from "/src/layouts/Header";

export default function GetStarted() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(() => !showModal);
  };

  return (
    <>
      <AuthTemplate show={showModal} onClose={toggleModal} />
      <Header />
      <div className="w-full h-screen flex justify-center items-center bg-[var(--color-dark-theme-background)]">
        <div className="flex flex-col justify-center items-center">
          <div className="font-display text-responsive-lg font-medium text-center">
            <h1>
              Showcase your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-devtiny-theme to-devtiny-theme-2">
                dev abilities
              </span>
            </h1>
          </div>
          <div className="w-3/5 text-center text-responsive-regular mt-5">
            <p>
              Join our community to share your projects, whether it’s a side
              gig, a startup prototype, or a portfolio piece, so developers and
              innovators can discover your work and help take it to the next
              level.
            </p>
          </div>
          <div className="m-10">
            <ThemeButton onClick={toggleModal}>Get Started</ThemeButton>
          </div>
        </div>
      </div>
    </>
  );
}
