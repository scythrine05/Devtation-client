import React, { useState } from "react";
import { ThemeButton } from "/src/components/Button";
import TextInput from "/src/components/Inputs/TextInput";
import TextDivider from "/src/components/TextDivider";
import Oauth from "../Oauth";
import Info from "../Info";

import { signInWithEmail } from "/src/apis/firebase";
import { SignInData } from "/src/types";
import { validateForm } from "/src/helpers/validateForm";
import { validEmail } from "/src/helpers/validationRules";
import withAsyncHandler from "/src/hoc/withAsyncHandler";

interface SignProps {
  authType: string;
  onToggle: () => void;
  loading: boolean;
  asyncHandler: any;
}

const SignModal: React.FC<SignProps> = ({
  authType,
  onToggle,
  loading,
  asyncHandler,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fields = [
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];

  const authRules = [validEmail];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const validationErrors = await asyncHandler(async () =>
        validateForm(formData, null, authRules, null)
      );
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        await asyncHandler(async () =>
          signInWithEmail(formData).catch(() =>
            setErrors({
              email: "Invalid Credential",
              password: "Invalid Credential",
            })
          )
        );
      }
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Oauth authType={authType} disabled={loading} />
      <TextDivider text="or" />
      <div className="w-full flex justify-center flex-col">
        {authType === "signin" ? (
          <>
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name}>
                  <TextInput
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    handleChange={handleChange}
                    value={formData[field.name as keyof SignInData]}
                    helper={errors[field.name]}
                  />
                </div>
              ))}
              <div className="flex justify-center my-5">
                <ThemeButton loading={loading} type={"submit"}>
                  Sign{loading ? "ing" : ""} in
                </ThemeButton>
              </div>
            </form>
            <div className="text-center text-responsive-sm">
              Don't have an account ?{"  "}
              <span
                className="cursor-pointer text-devtiny-theme hover:text-devtiny-theme-light"
                onClick={onToggle}
              >
                Create account
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <Info />
            </div>
            <div className="text-center text-responsive-sm">
              Already have an account ?{"  "}
              <span
                onClick={onToggle}
                className="cursor-pointer text-devtiny-theme hover:text-devtiny-theme-light"
              >
                Sign in
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withAsyncHandler(SignModal);
