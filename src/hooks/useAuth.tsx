import { useState, useEffect, createContext, useContext } from "react";

import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "/src/configs/firebase";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: Error | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
