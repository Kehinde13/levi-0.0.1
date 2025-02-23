import { useEffect, useState } from "react";
import axios from "axios";
import { IProduct, IUser } from "@/lib/types";

const API_URL = "http://localhost:3005/api/admin";


const AdminDashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [vendors, setVendors] = useState<IUser[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized! Please log in as an admin.");
        return;
      }

      try {
        const usersRes = await axios.get<IUser[]>(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const vendorsRes = await axios.get<IUser[]>(`${API_URL}/vendors`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productsRes = await axios.get<IProduct[]>(`${API_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(usersRes.data);
        setVendors(vendorsRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading data");
      }
      setLoading(false);
    };

    fetchAdminData();
  }, []);

  const approveVendor = async (vendorId: string, status: boolean) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `${API_URL}/approve-vendor/${vendorId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Vendor ${status ? "approved" : "rejected"} successfully!`);
      setVendors((prev) => prev.map((v) => (v._id === vendorId ? { ...v, isApproved: status } : v)));
    } catch (err: any) {
      alert("Error approving vendor");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

      <h2 className="text-xl font-semibold mt-6">Pending Vendors</h2>
      <ul>
        {vendors
          .filter((vendor) => !vendor.isApproved)
          .map((vendor) => (
            <li key={vendor._id} className="flex justify-between p-2 border">
              <p>{vendor.name} ({vendor.email})</p>
              <button onClick={() => approveVendor(vendor._id, true)} className="bg-green-500 text-white px-4 py-1">
                Approve
              </button>
              <button onClick={() => approveVendor(vendor._id, false)} className="bg-red-500 text-white px-4 py-1">
                Reject
              </button>
            </li>
          ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="p-2 border">
            {user.name} ({user.email}) - {user.role}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="p-2 border">
            {product.name} - ${product.price} (Vendor: {product.vendor?.name || "Unknown"})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
