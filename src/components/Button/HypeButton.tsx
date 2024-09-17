import React, { useState } from "react";
import { hypeProject } from "/src/apis/custom";
import { useAuth } from "/src/hooks/useAuth";

interface HypeButtonProps {
  projectId: string;
  initialHasHyped: boolean;
  hypeCount: number;
}

const HypeButton: React.FC<HypeButtonProps> = ({
  projectId,
  initialHasHyped,
  hypeCount,
}) => {
  const [hasHyped, setHasHyped] = useState(initialHasHyped);
  const [hypeNum, setHypeNum] = useState(hypeCount);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const toggleHype = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await hypeProject(user, projectId);
      setHasHyped((hype) => !hype);
      setHypeNum((hype) => (hasHyped ? hype - 1 : hype + 1));
    } catch (error) {
      setHasHyped((hype) => hype);
      console.error("Error hype:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={toggleHype} disabled={loading}>
        {loading ? "Processing..." : hasHyped ? "Unhype" : "Hype"}
      </button>
      <div className="view-votes">{hypeNum} hypes</div>
    </>
  );
};

export default HypeButton;
