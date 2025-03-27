import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContextDefinition";
import { IOrder, IOrderProduct, user } from "@/lib/types";
import loader from "@/assets/Animation Fire GIF by Chris Gannon.gif";

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const authContext = useContext(AuthContext);
  const userRole = authContext?.userRole;
  const [user, setUser] = useState({ name: "", email: "", role: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;

      try {
        const res = await axios.get<user>(`${API_URL}/users/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        if (res.data.role === "customer") fetchOrderHistory();
      } catch {
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const res = await axios.get<IOrder[]>(`${API_URL}/orders/user-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchUserProfile();
    fetchOrderHistory();
  }, [token, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.password && user.password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setPasswordError("");

    try {
      await axios.put(`${API_URL}/users/profile/update/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      setConfirmPassword("");
    } catch {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <img src={loader} alt="loading" className="w-full" />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="New Password (leave blank if unchanged)"
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="border p-2 w-full"
          placeholder="Confirm New Password"
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Update Profile
        </button>
      </form>

      {userRole === "customer" && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Order History</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((order: IOrder) => (
                <li key={order._id} className="border p-4 rounded">
                  <div className="font-semibold mb-1">
                    Order #{order._id.slice(-6).toUpperCase()} -{" "}
                    <span className="text-sm text-gray-500">{order.status}</span>
                  </div>
                  <ul className="text-sm text-gray-700">
                    {order.products.map((p: IOrderProduct, index: number) => (
                      <li key={index}>
                        {p.productId || "Unknown Product"} x {p.quantity}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm mt-2">
                    Total: <strong>${order.totalAmount.toFixed(2)}</strong>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
