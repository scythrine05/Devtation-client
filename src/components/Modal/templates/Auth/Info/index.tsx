import React, { useState } from "react";
import Button from "/src/components/Button";
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

export default function Info() {
  
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
      const validationErrors = await validateForm(
        formData,
        null,
        authRules,
        null
      );
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        const recaptchaVerified = await verifyRecaptchaToken(recaptchaToken);
        if (!recaptchaVerified) {
          setErrors({ recaptcha: "reCAPTCHA verification failed" });
          return;
        }
        signUpWithEmail(formData).catch((err) => console.error(err));
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
    <form
      onSubmit={(e) =>
        handleSubmit(e).catch(() => console.error("Error Submitting"))
      }
    >
      {fields.map((field) => (
        <div key={field.name}>
          {field.label}
          <input
            type={field.type}
            name={field.name}
            onChange={handleChange}
            value={formData[field.name as keyof SignUpData]}
          />
          <div>{errors[field.name] && <span>{errors[field.name]}</span>}</div>
        </div>
      ))}
      <div>
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
          onChange={handleRecaptchaChange}
        />
        {errors.recaptcha && <span>{errors.recaptcha}</span>}
      </div>
      <div>
        <Button type="submit">Create Account</Button>
      </div>
    </form>
  );
}
