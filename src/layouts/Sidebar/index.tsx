import { Link } from "react-router-dom";
import "./sidebar.style.css";

import Button from "/src/components/Button";

import { useAuth } from "/src/hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <ul className="nav-list-top">
        <li>
          <Link to="/">
            <span className="links_name">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/account">
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
          <Button onClick={logout}>
            <span className="links_name">Logout</span>
          </Button>
        </li>
      </ul>
    </div>
  );
}
