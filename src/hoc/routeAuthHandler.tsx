import React from "react";
import { useAuth } from "/src/hooks/useAuth";

interface AuthHandlerProps {
  loadingComponent?: React.ReactNode;
  children: React.ReactNode;
  fallbackComponent?: React.ReactNode;
}

const AuthHandler: React.FC<AuthHandlerProps> = ({
  loadingComponent = <div>Loading...</div>, 
  children,
  fallbackComponent = null,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <>{loadingComponent}</>;
  }

  return user ? <>{children}</> : <>{fallbackComponent}</>;
};

export default AuthHandler;
