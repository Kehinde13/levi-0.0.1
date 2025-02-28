import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextDefinition";

// Role-based Route Protection
const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { userRole } = useContext(AuthContext) || {};

  // Redirect to login if the role is not allowed
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
