import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/AuthContextDefinition";
import { CustomerContext } from "../context/customerContextDefinition"; // ✅ Import CustomerContext
import { LoginResponse } from "@/lib/types";

const Login = () => {
  const authContext = useContext(AuthContext);
  const customerContext = useContext(CustomerContext); // ✅ Get CustomerContext
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post<LoginResponse>("http://localhost:3005/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("id", res.data.user.id);

      authContext?.setUserRole(res.data.user.role); // ✅ Ensure AuthContext updates immediately

      // ✅ Fetch customer data immediately after login
      if (customerContext?.setCustomer) {
        customerContext.setCustomer({
          id: res.data.user.id,
          name: res.data.user.name,
          isApproved: res.data.user.isApproved,
          role: res.data.user.role,
        });
      }

      alert("Login successful!");

      if (res.data.user.role === "admin") {
        navigate("/admin"); // Redirect to admin dashboard
      } else if (res.data.user.role === "vendor") {
        navigate("/vendor"); // Redirect to vendor dashboard
      } else {
        navigate("/"); // Redirect to home page
      }
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
