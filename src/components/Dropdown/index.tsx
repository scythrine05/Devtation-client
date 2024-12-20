import { Dispatch, SetStateAction } from "react";

import { Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "/src/apis/firebase";
import { useAuth } from "/src/hooks/useAuth";

import "./dropdown.style.css";

//Icons
import { TbUser } from "react-icons/tb";
import { RiSettingsLine } from "react-icons/ri";
import { LuFolder, LuTrash } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

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

interface OptionsDropdownComponentProps {
  _id: string;
  setDeleteMode: Dispatch<SetStateAction<boolean>>;
}

export const OptionsDropdownComponent: React.FC<
  OptionsDropdownComponentProps
> = ({ _id, setDeleteMode }) => {
  return (
    <Dropdown
      renderTrigger={() => (
        <button className="relative bg-transparent hover:bg-[var(--color-dark-theme-sub-background-3)] mx-2 text-white p-2 rounded-md">
          <BsThreeDotsVertical size={20} />
        </button>
      )}
      label=""
      className="!bg-[var(--color-dark-theme-sub-background)] border-none absolute top-0 left-0 -ml-5 p-2"
    >
      <Link to={`/edit/project/${_id}`}>
        <Dropdown.Item
          className="dropdown-item text-[var(--color-dark-theme-font)] font-medium"
          icon={FiEdit3}
        >
          <div className="text-xs">Edit project</div>
        </Dropdown.Item>
      </Link>
      <Dropdown.Item
        className="dropdown-item text-[var(--color-dark-theme-font)] font-medium"
        icon={LuTrash}
        onClick={() => setDeleteMode(true)}
      >
        <div className="text-xs">Delete project</div>
      </Dropdown.Item>
    </Dropdown>
  );
};
