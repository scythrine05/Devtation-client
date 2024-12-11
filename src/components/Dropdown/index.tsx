import { Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "/src/apis/firebase";
import { useAuth } from "/src/hooks/useAuth";

import "./dropdown.style.css";

//Icons
import { TbUser } from "react-icons/tb";
import { RiSettingsLine } from "react-icons/ri";
import { LuFolder } from "react-icons/lu";
import { RxExit } from "react-icons/rx";

const DropdownComponent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Dropdown
      renderTrigger={() => (
        <button className="relative bg-transparent hover:bg-[var(--color-dark-theme-sub-background-3)] mx-2 text-white p-2 rounded-md">
          <TbUser size={24} />
        </button>
      )}
      label=""
      className="!bg-[var(--color-dark-theme-sub-background)] border-none absolute top-0 left-0 -ml-5 p-2"
    >
      <div className="p-4 text-[var(--color-dark-theme-font)] font-medium">
        {user?.displayName ? (
          <>
            <span className="block text-sm">{user?.displayName}</span>
            <span className="block truncate text-xs font-medium text-gray-500">
              {user?.email}
            </span>
          </>
        ) : (
          "Welcome, "
        )}
      </div>
      <Dropdown.Divider className="bg-gray-700" />
      <Link to="/account/youraccount">
        <Dropdown.Item
          className="dropdown-item text-[var(--color-dark-theme-font)] font-medium"
          icon={LuFolder}
        >
          Your dashboard
        </Dropdown.Item>
      </Link>

      <Link to="/setting">
        <Dropdown.Item
          className="dropdown-item text-[var(--color-dark-theme-font)] font-medium"
          icon={RiSettingsLine}
        >
          Your setting
        </Dropdown.Item>
      </Link>
      <Dropdown.Divider className="bg-gray-700" />
      <Dropdown.Item
        className="dropdown-item text-[var(--color-dark-theme-font)] font-medium"
        icon={RxExit}
        onClick={() =>
          logout()
            .then(() => navigate("/"))
            .catch((err) => console.error(err))
        }
      >
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default DropdownComponent;
