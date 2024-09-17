import Button from "/src/components/Button";
import React from "react";

import { Link } from "react-router-dom";

interface CreateProps {
  onNext: () => void;
}

const CreateModal: React.FC<CreateProps> = ({ onNext }) => {
  return (
    <div>
      {/* <div>
        <Button onClick={onNext}>Import from Github</Button>
      </div>
      <div>
        <Button onClick={onNext}>Import from Gitlab</Button>
      </div>
      <hr /> */}
      <div>
        <Link to="/new">
        <Button>Create New</Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateModal;
