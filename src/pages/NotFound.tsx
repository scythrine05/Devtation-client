import { ThemeButton } from "/src/components/Button";
import { Link } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div>
        <h1 className="text-responsive-lg font-display font-semibold text-[var(--color-white-1)] select-none">
          <span className="font-icon font-extrabold">&lt;</span>404 Error
          <span className="font-icon font-extrabold">&gt;</span>
        </h1>
      </div>
      <div className="text-responsive-sm font-display text-[var(--color-white-1)] select-none">
        Page not found
      </div>
      <div className="mt-5">
        <Link to="/">
          <ThemeButton>
            <div className="flex justify-between items-center">
              <BiSolidHome />
              <span className="ml-1 hidden lg:inline text-responsive-sm">
                Back to home
              </span>
            </div>
          </ThemeButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
