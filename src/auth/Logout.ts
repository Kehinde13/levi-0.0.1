import { AuthContext } from "@/context/AuthContextDefinition";
import { CustomerContext } from "@/context/customerContextDefinition";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3005/api";

export const Logout = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const customerContext = useContext(CustomerContext);

  if (!authContext) {
    throw new Error("AuthContext is null");
  }

  const { setUserRole } = authContext;
  const { setCustomer } = customerContext || {}; // Handle null case

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserRole(null);
        setCustomer?.(null);
        navigate("/auth");
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
        localStorage.removeItem("id"); // ✅ Remove only the user ID, not the basket

        setUserRole(null);
        setCustomer?.(null);

        navigate("/auth");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    logout();
  }, [navigate, setUserRole, setCustomer]);

  return null;
};
