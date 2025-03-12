import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoutes";
import LandingPage from "./pages/LandingPage";
import Basket from "./components/ShoppingCart";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import { Logout } from "./auth/Logout";
import { CustomerProvider } from "./context/customerContext";
import Layout from "./pages/Layout"; 
import NotFound from "./pages/not-found";
import Contact from "./pages/Contact"
import About from "./pages/About"
import Auth from "./auth/Auth";

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/logout" element={<Logout />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
                <Route path="/vendor" element={<VendorDashboard />} />
              </Route>

              <Route path="*" element={<NotFound/>} />
            </Route>
          </Routes>
        </Router>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;
