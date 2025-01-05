// import { useState } from "react";
import { ThemeButton } from "/src/components/Button";
import { useAuth } from "/src/hooks/useAuth";
import { Link } from "react-router-dom";

import Dropdown from "/src/components/Dropdown";

//Icons
import { FaPlus } from "react-icons/fa6";

export default function Header() {
  const { user } = useAuth();
  return (
    <header
      className={`py-2 px-5 box-border w-full ${
        user
          ? "bg-[var(--color-dark-theme-sub-background-2)]"
          : "bg-[var(--color-dark-theme-background)]"
      } z-10`}
    >
      <div className="flex items-center justify-between">
        <Link to="/">
          <div>
            <h1 className="text-responsive-icon font-display font-semibold text-[var(--color-white-1)] select-none">
              <span className="font-icon font-extrabold">&lt;</span>devtation
              <span className="font-icon font-extrabold">&gt;</span>
            </h1>
          </div>
        </Link>
        {user ? (
          <div className="flex items-center">
            <Link to="/new">
              <ThemeButton>
                <div className="flex justify-between items-center">
                  <FaPlus />
                  <span className="ml-1 hidden lg:inline text-responsive-sm">
                    New project
                  </span>
                </div>
              </ThemeButton>
            </Link>
            <div>
              <Dropdown />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
