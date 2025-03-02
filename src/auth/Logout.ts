import { AuthContext } from "@/context/AuthContextDefinition";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3005/api";

export const Logout = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is null");
  }

  const { setUserRole } = authContext;

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token"); // Move inside useEffect

      if (!token) {
        setUserRole(null);
        navigate("/login");
        return;
      }

      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // Ensure cookies are included
        });

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("id");

        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    logout();
  }, [navigate, setUserRole]);

  return null; // ✅ Ensure the component returns something
};
