import { useEffect, useState } from "react";
import axios from "axios";
import { ApiProductResponse, IProduct, IUser } from "@/lib/types";

const API_URL = "http://localhost:3005/api";

const VendorDashboard = () => {
  const [vendor, setVendor] = useState<IUser | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<IProduct>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVendorData = async () => {
      const vendorId = localStorage.getItem("id");

      if (!token) {
        setError("Unauthorized! Please log in as a vendor.");
        return;
      }

      try {
        // Fetch vendor details
        const vendorRes = await axios.get<IUser>(
          `${API_URL}/users/${vendorId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setVendor(vendorRes.data);

        // Fetch vendor's products
        const productsRes = await axios.get<ApiProductResponse>(
          `${API_URL}/products/vendor/products`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(productsRes.data.products);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error loading data");
      }
      setLoading(false);
    };

    fetchVendorData();
  }, [token, products]);

  const addProduct = async () => {
    
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.stock) {
      alert("Please fill in all fields before adding a product.");
      return;
    }
  
    try {
      const res = await axios.post<IProduct>(
        `${API_URL}/products/add`,
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Optimistically update products without waiting for useEffect
      setProducts((prev) => [...prev, res.data]);
  
      alert("Product added successfully!");
  
      // Reset form
      setNewProduct({ name: "", description: "", price: 0, category: "", stock: 0, image: "" });
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add product");
    }
  };
  

  const updateProduct = async (
    productId: string,
    updatedProduct: Partial<IProduct>
  ) => {
    try {
      const res = await axios.put<IProduct>(
        `${API_URL}/products/${productId}/update`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Optimistically update the product list
    setProducts((prev) =>
        prev.map((product) =>
          product._id === updatedProduct._id ? res.data : product
        )
      );
      alert("Product updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${API_URL}/products/${productId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Vendor Dashboard</h1>

        <div className="border p-4 mb-4">
            <h2 className="font-semibold">Vendor Details</h2>
            <p>Name: {vendor?.name}</p>
            <p>Email: {vendor?.email}</p>
            <p>Role: {vendor?.role}</p>
            <p>Approved: {vendor?.isApproved ? "Yes" : "No"}</p>
        </div>  

      <div className="container mx-auto p-6">
        <h2 className="text-xl font-semibold mt-6">Manage Product</h2>

        {/* Add Product Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="border p-2 w-full"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
          />
          <input
            type="text"
            placeholder="Category"
            className="border p-2 w-full"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Stock"
            className="border p-2 w-full"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: Number(e.target.value) })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            className="border p-2 w-full"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <button
            onClick={addProduct}
            className="bg-green-500 text-white px-4 py-2 mt-2"
          >
            Add Product
          </button>
        </div>

        {/* Product List */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Product List</h2>
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 mt-4 flex justify-between"
            >
              <div>
                <h3 className="font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>Stock: {product.stock}</p>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover mt-2"
                />
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => updateProduct(product._id, { ...newProduct })}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
