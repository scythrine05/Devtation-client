import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import RouteAuthHandler from "/src/hoc/routeAuthHandler";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <RouteAuthHandler fallbackComponent={null}>{children}</RouteAuthHandler>
  );
};

export default ProtectedRoute;
