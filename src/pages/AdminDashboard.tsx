import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3005/api/admin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized! Please log in as an admin.");
        navigate("/login"); // 🚨 Redirect to login if not authenticated
        return;
      }

      try {
        const userRes = await axios.get("http://localhost:3005/api/admin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(userRes.data);

        const adminData = userRes.data as { role: string };
        if (adminData.role !== "admin") {
          alert("Access Denied! Admins only.");
          navigate("/login");
          return;
        }

        setAdmin(userRes.data);
        const usersRes = await axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });
        const ordersRes = await axios.get(`${API_URL}/orders`, { headers: { Authorization: `Bearer ${token}` } });
        const productsRes = await axios.get(`${API_URL}/products`, { headers: { Authorization: `Bearer ${token}` } });

        setUsers(usersRes.data);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error loading admin data", error);
        alert("Session expired! Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
      setLoading(false);
    };

    fetchAdminData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      <p>Welcome, {admin?.name}!</p>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border">
          <h2 className="text-lg font-semibold">Users</h2>
          <p>{users.length} users</p>
        </div>
        <div className="p-4 border">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p>{orders.length} orders</p>
        </div>
        <div className="p-4 border">
          <h2 className="text-lg font-semibold">Products</h2>
          <p>{products.length} products</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
