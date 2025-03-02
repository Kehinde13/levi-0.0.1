import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";
import Basket from "./components/ShoppingCart";
import Login from "./auth/Login";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import { Logout } from "./auth/Logout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />


          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
            <Route path="/vendor" element={<VendorDashboard />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
