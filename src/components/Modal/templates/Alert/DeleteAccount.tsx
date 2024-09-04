import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "/src/configs/firebase";
import { reauthenticate, deleteAccount } from "/src/apis/firebase";

export default function DeleteAccount() {
  const user: User | null = auth.currentUser;
  const [password, setPassword] = useState("");
  const [providerKey, setProviderKey] = useState("");

  useEffect(() => {
    if (user && user.providerData.length > 0) {
      const providerId = user.providerData[0].providerId;
      if (providerId === "password") {
        setProviderKey("password");
      } else {
        setProviderKey("oauth");
      }
    }
  }, [user]);

  const handleDelete = async () => {
    if (!user) {
      console.error("No user is currently signed in.");
      return;
    }
    try {
      if (providerKey === "password") {
        await reauthenticate(user, password);
      }
      await deleteAccount();
    } catch (err) {
      throw err;
    }
  };

  return (
    <div>
      {providerKey === "password" && (
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}
