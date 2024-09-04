import { useState, useEffect } from "react";
import Grid from "/src/containers/Grid";
import { useParams } from "react-router";
import { useAuth } from "/src/hooks/useAuth";
import { getUserAccount } from "/src/apis/custom";
import { AccountData } from "/src/types";

export default function Account() {
  const { identifier } = useParams<{ identifier: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const { user } = useAuth(); // Get the current authenticated user

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);

      try {
        const data = await getUserAccount(
          identifier === "youraccount" ? user : null,
          identifier !== "youraccount" ? identifier || null : null
        );
        setAccountData(data);
      } catch (err) {
        console.error("Failed to load user data:", err);
        setAccountData(null);
      } finally {
        setLoading(false);
      }
    };

    if (identifier) {
      loadUserData();
    }
  }, [identifier, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!accountData) {
    return <div>No account data found.</div>;
  }

  return (
    <div>
      <div>
        <div>
          <img src="#" />
        </div>
        <div>
          <div>{accountData?.username}</div>
          <div>{accountData?.name}</div>
          <div>{accountData?.bio}</div>
        </div>
      </div>
      <div>
        <Grid />
      </div>
    </div>
  );
}
