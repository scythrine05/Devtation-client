import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { signUpWithEmail } from "/src/apis/firebase";
import { SignUpData } from "/src/types";
import { validateForm } from "/src/helpers/validateForm";
import {
  validEmail,
  passwordMinLength,
  usernameExists,
  emailExists,
} from "/src/helpers/validationRules";
import { verifyRecaptchaToken } from "/src/apis/custom";
import TextInput from "/src/components/Inputs/TextInput";
import { ThemeButton } from "/src/components/Button";
import withAsyncHandler from "/src/hoc/withAsyncHandler";

interface InfoProps {
  loading: boolean;
  asyncHandler: any;
}

const Info: React.FC<InfoProps> = ({ loading, asyncHandler }) => {
  const [formData, setFormData] = useState<SignUpData>({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const fields = [
    { name: "username", type: "text", label: "Username" },
    { name: "name", type: "text", label: "Name" },
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" },
  ];
  const authRules = [
    validEmail,
    passwordMinLength,
    usernameExists,
    emailExists,
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!recaptchaToken) {
        setErrors({ recaptcha: "Please verify that you are not a robot" });
        return;
      }
      const validationErrors = await asyncHandler(async () =>
        validateForm(formData, null, authRules, null)
      );
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        const recaptchaVerified = await asyncHandler(async () =>
          verifyRecaptchaToken(recaptchaToken)
        );
        if (!recaptchaVerified) {
          setErrors({ recaptcha: "reCAPTCHA verification failed" });
          return;
        }
        await asyncHandler(async () =>
          signUpWithEmail(formData).catch((err) => console.error(err))
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

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="w-full flex justify-center flex-col">
      <form
        onSubmit={(e) =>
          handleSubmit(e).catch(() => console.error("Error Submitting"))
        }
      >
        {fields.map((field) => (
          <div key={field.name}>
            <TextInput
              label={field.label}
              type={field.type}
              name={field.name}
              handleChange={handleChange}
              value={formData[field.name as keyof SignUpData]}
              helper={errors[field.name]}
            />
          </div>
        ))}
        <div className="flex justify-center flex-col items-center">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
            onChange={handleRecaptchaChange}
          />
          <div>
            {errors.recaptcha && (
              <span className="mt-2 text-responsive-sm text-red-700">
                {errors.recaptcha}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center my-5">
          <ThemeButton loading={loading} type="submit">
            Creat{loading ? "ing" : "e"} Account
          </ThemeButton>
        </div>
      </form>
    </div>
  );
};

export default withAsyncHandler(Info);
