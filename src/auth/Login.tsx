import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import googleIcon from "../assets/Icon-Google.png";

import { AuthContext } from "../context/AuthContextDefinition";
import { CustomerContext } from "../context/customerContextDefinition";
import { LoginResponse } from "@/lib/types";

type Prop = {
  toggleLogin: () => void;
};

function Login({ toggleLogin }: Prop) {
  const authContext = useContext(AuthContext);
  const customerContext = useContext(CustomerContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post<LoginResponse>("http://localhost:3005/api/auth/login", {
        email,
        password,
      });

      // Store authentication data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("id", res.data.user.id);

      // Update Auth Context
      authContext?.setUserRole(res.data.user.role);

      // Update Customer Context
      customerContext?.setCustomer({
        id: res.data.user.id,
        name: res.data.user.name,
        isApproved: res.data.user.isApproved,
        role: res.data.user.role,
        email: res.data.user.email,
      });

      alert("Login successful!");

      // Redirect user based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/");
      }
    } catch{
      setError("invalid credentials. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-6 mt-5 md:w-[80%]">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="py-3 border-gray-400 border-b bg-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="py-3 border-gray-400 border-b"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="flex gap-2 justify-between">
        <p onClick={toggleLogin} className="cursor-pointer">
          Sign Up
        </p>
        <p className="text-[#DB4444] cursor-pointer">Forgot Password?</p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <button
          type="submit"
          className="bg-[#DB4444] rounded-md py-2 md:px-6 p-2 text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <button
          type="button"
          className="rounded-md py-2 flex border md:px-6 p-2 border-gray-400 justify-center gap-3"
        >
          <img src={googleIcon} alt="google icon" />
          Log In with Google
        </button>
      </div>
    </form>
  );
}

export default Login;
