import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { auth } from "/src/configs/firebase";
import { reauthenticate, deleteAccount } from "/src/apis/firebase";

export default function DeleteAccount() {
  const user: User | null = auth.currentUser;
  const [password, setPassword] = useState("");
  const [providerKey, setProviderKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.providerData.length > 0) {
      const providerId = user.providerData[0].providerId;
      setProviderKey(providerId);
    }
  }, [user]);

  const handleDelete = async () => {
    if (!user) {
      console.error("No user is currently signed in.");
      return;
    }
    try {
      await reauthenticate(user, providerKey, password);
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
      <button
        onClick={() =>
          handleDelete().then(() => navigate("/", { replace: true }))
        }
      >
        Delete Account
      </button>
    </div>
  );
}
