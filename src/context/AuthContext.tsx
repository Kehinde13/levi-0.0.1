import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContextDefinition"

// Auth Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  // Sync localStorage when userRole changes
  useEffect(() => {
    if (userRole) {
      localStorage.setItem("role", userRole);
    } else {
      localStorage.removeItem("role");
    }
  }, [userRole]);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};
