import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { auth } from "/src/configs/firebase";
import { reauthenticate, deleteAccount } from "/src/apis/firebase";
import { DangerButton } from "/src/components/Button";
import TextInput from "/src/components/Inputs/TextInput";

export default function DeleteAccount() {
  const user: User | null = auth.currentUser;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [providerKey, setProviderKey] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.providerData.length > 0) {
      const providerId = user.providerData[0].providerId;
      setProviderKey(providerId);
    }
  }, [user]);

  const handleDelete = async () => {
    setLoading(true);
    if (!user) {
      console.error("No user is currently signed in.");
      return;
    }

    try {
      await reauthenticate(user, providerKey, password);
      await deleteAccount();
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-responsive-regular mb-5 text-center">
        <p className="text-sm">
          You're about to delete your account. Please be aware that this action
          is permanent resulting in
          <span className="font-semibold"> deleting your projects</span> and
          <span className="font-semibold"> cannot be undone</span>.
        </p>
      </div>
      {providerKey === "password" && (
        <div>
          <TextInput
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            helper={errors["password"]}
          />
        </div>
      )}
      <div className="mt-5 w-full flex justify-center">
        <DangerButton
          onClick={() =>
            handleDelete()
              .then(() => navigate("/", { replace: true }))
              .catch(() => setErrors({ password: "Not valid input" }))
          }
          loading={loading}
        >
          <div className="flex items-start text-responsive-sm">
            Delet{loading ? "ing" : "e"} account
          </div>
        </DangerButton>
      </div>
    </div>
  );
}
