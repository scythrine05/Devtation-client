import { Link, useNavigate } from "react-router-dom";
import "./sidebar.style.css";

import Button from "/src/components/Button";

import { logout } from "/src/apis/firebase";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <ul className="nav-list-top">
        <li>
          <Link to="/">
            <span className="links_name">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/account/youraccount">
            <span className="links_name">Your Account</span>
          </Link>
        </li>
      </ul>
      <ul className="nav-list-bottom">
        <li>
          <Link to="/setting">
            <span className="links_name">Setting</span>
          </Link>
        </li>
        <li>
          <Button
            onClick={() =>
              logout()
                .then(() => navigate("/"))
                .catch((err) => console.error(err))
            }
          >
            <span className="links_name">Logout</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}
