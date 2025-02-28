import { createContext } from "react";

// Define context type
interface AuthContextType {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
}

// Create Context
export const AuthContext = createContext<AuthContextType | null>(null);