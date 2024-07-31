import React from "react";
import Button from "/src/components/Button";
import { Link } from "react-router-dom";

const Repositories: React.FC = () => {
  return (
    <div>
      <ul>
        <li>Repository 1</li>
        <li>Repository 2</li>
        <li>Repository 3</li>
        <li>Repository 4</li>
        <li>Repository 5</li>
      </ul>
      <Link to="/new">
        <Button>Next</Button>
      </Link>
    </div>
  );
};

export default Repositories;
