import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

interface LoginResponse {
    token: string;
}

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
        const res = await axios.post<LoginResponse>("http://localhost:3005/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        navigate("/admin"); // ✅ Redirect to admin dashboard
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        setError("Invalid credentials");
    }
};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Login</h1>
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
