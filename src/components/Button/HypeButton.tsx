import React, { useState } from "react";
import { hypeProject } from "/src/apis/custom";
import { useAuth } from "/src/hooks/useAuth";
import { LuMegaphone } from "react-icons/lu";

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
      <div className="flex items-center rounded-md overflow-hidden divide-x font-semibold">
        <button
          onClick={toggleHype}
          disabled={loading}
          className={`flex items-center px-4 py-2 text-responsive-sm ${
            hasHyped
              ? "bg-[var(--color-purple-1)] text-[var(--color-white)] hover:bg-[var(--color-purple-2)]"
              : "bg-[var(--color-white-2)] text-[var(--color-black-3)] hover:bg-[var(--color-white-1)]"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="mr-1">
            <LuMegaphone size={16} />
          </div>
          {loading ? "hyping" : hasHyped ? "unhype" : "hype"}
        </button>
        <div className="flex items-center justify-center px-4 py-2 text-responsive-sm bg-[var(--color-white-1)] text-[var(--color-black-3)] rounded-e-md">
          {hypeNum}
        </div>
      </div>
    </>
  );
};

export default HypeButton;
