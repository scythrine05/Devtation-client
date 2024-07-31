import React from "react";
import Button from "/src/components/Button";

import { useAuth } from "/src/hooks/useAuth";

export default function Info() {

  const {login} = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    login((form[0] as HTMLInputElement).value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Username
        <input type="text" />
        Full Name
        <input type="text" />
        <input type="checkbox" />I agree blah blah, I got it. 
        <Button type="submit">Create Account</Button>
      </form>
    </div>
  );
}
