import { User } from "@/app/actions/auth/types";
import { createContext, useContext } from "react";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  isMember: boolean;
  logout: () => void;
  onLogin: (redirect?: boolean) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
