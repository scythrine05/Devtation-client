import React, { useState } from "react";
import Button from "/src/components/Button";
import Oauth from "../Oauth";

import { signInWithEmail } from "/src/apis/firebase";
import { SignInData } from "/src/types";
import { signInError } from "/src/helpers/errorhandler";

interface SignProps {
  authType: string;
  onNext: () => void;
  onToggle: () => void;
}

const SignModal: React.FC<SignProps> = ({ authType, onNext, onToggle }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();

  const fields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmail(formData)
      .then((response) => console.log(response))
      .catch((err) => setError(signInError(err)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Oauth authType={authType} />
      <hr />
      <div>
        {authType === "signin" ? (
          <>
            <div>
              <span>{error}</span>
            </div>
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name}>
                  {field.label}
                  <input
                    type={field.type}
                    name={field.name}
                    onChange={handleChange}
                    value={formData[field.name as keyof SignInData]}
                  />
                </div>
              ))}
              <Button type={"submit"}>Sign In</Button>
            </form>
            <div>
              <Button onClick={onToggle}>Create Account</Button>
            </div>
          </>
        ) : (
          <>
            <Button onClick={onNext}>Email</Button>
            <div>
              <Button onClick={onToggle}>Already Account</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignModal;
