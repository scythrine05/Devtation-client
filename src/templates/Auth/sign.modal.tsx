import React from "react";
import Button from "/src/components/Button";
import { useAuth } from "/src/hooks/useAuth";

interface SignProps {
  authType: string;
  onNext: () => void;
  onToggle: () => void;
}

const SignModal: React.FC<SignProps> = ({ authType, onNext, onToggle }) => {
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    login((form[0] as HTMLInputElement).value);
  };

  return (
    <div>
      <div>
        <Button onClick={() => login("Github")}>Github</Button>
      </div>
      <div>
        <Button onClick={() => login("Gitlab")}>Gitlab</Button>
      </div>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          {authType === "signin" ? (
            <>
              <input type="password" placeholder="Password" />
              <Button type={"submit"}>Sign In</Button>
              <div>
                <Button onClick={onToggle}>Create Account</Button>
              </div>
            </>
          ) : (
            <>
              <Button type={"submit"} onClick={onNext}>
                Sign Up
              </Button>
              <div>
                <Button onClick={onToggle}>Already Account</Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignModal;
