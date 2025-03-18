import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContextDefinition";

const API_URL = "http://localhost:3005/api";

const Profile = () => {
const authContext = useContext(AuthContext);
const userRole = authContext?.userRole;
const [user, setUser] = useState({ name: "", email: "", role: "", password: "" });
const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const token = localStorage.getItem("token");
const id = localStorage.getItem("id");

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      
      if (!token) return;
      try {
        const res = await axios.get(`${API_URL}/users/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        if (res.data.role === "customer") fetchOrderHistory();
      } catch (err) {
        setError("Failed to load user profile.");
      }
      setLoading(false);
    };

    const fetchOrderHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/user-orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    fetchUserProfile();
  }, [token, id]);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Handle Profile Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/users/profile/update/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>

      {/* ✅ Profile Edit Form */}
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
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Update Profile
        </button>
      </form>

      {/* ✅ Order History for Customers */}
      {userRole === "customer" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Order History</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="mt-2">
              {orders.map((order: any) => (
                <li key={order._id} className="border p-2 mt-2">
                  Order #{order._id} - ${order.totalAmount} - {order.status}
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
