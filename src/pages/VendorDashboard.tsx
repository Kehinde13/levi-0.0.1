import { useEffect, useState } from "react";
import axios from "axios";
import { ApiProductResponse, IOrder, IOrderProduct, IProduct, IUser } from "@/lib/types";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Partial<IProduct> | null>(
    null
  );
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [vendorOrders, setVendorOrders] = useState<IOrder[]>([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

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

        // Fetch vendor's orders
        const orderRes = await axios.get<IOrder[]>(`${API_URL}/orders/vendor-orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVendorOrders(orderRes.data);
      } catch (err) {
        const errorMessage =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to delete product";
        setError(errorMessage);
      }
      setLoading(false);
    };

    fetchVendorData();
  }, [token, products, id]);

  //add product
  const addProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.category ||
      !newProduct.stock ||
      !imageFile // ✅ Ensure an image is selected
    ) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name!);
      formData.append("description", newProduct.description!);
      formData.append("price", newProduct.price!.toString());
      formData.append("category", newProduct.category!);
      formData.append("stock", newProduct.stock!.toString());
      formData.append("image", imageFile); // ✅ Attach image file

      const res = await axios.post<IProduct>(
        `${API_URL}/products/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // ✅ Required for file uploads
          },
        }
      );

      // Optimistically update products
      setProducts((prev) => [...prev, res.data]);

      alert("Product added successfully!");

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to add product";
      alert(errorMessage);
    }
  };

  //update product
  const updateProduct = async (productId: string) => {
    if (
      !editProduct ||
      !editProduct.name ||
      !editProduct.description ||
      !editProduct.price ||
      !editProduct.category ||
      !editProduct.stock
    ) {
      alert("Please fill in all fields before updating the product.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price.toString());
      formData.append("category", editProduct.category);
      formData.append("stock", editProduct.stock.toString());

      if (editImageFile) {
        formData.append("image", editImageFile); // ✅ Attach new image if changed
      }

      const res = await axios.put<IProduct>(
        `${API_URL}/products/${productId}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ Update the product list optimistically
      setProducts((prev) =>
        prev.map((product) => (product._id === productId ? res.data : product))
      );

      alert("Product updated successfully!");
      setEditProduct(null);
      setEditImageFile(null);
      setEditImagePreview(null);
    } catch (err) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update product";
      alert(errorMessage);
    }
  };

  //delete  product
  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${API_URL}/products/${productId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted successfully!");
    } catch (err) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to delete product";
      alert(errorMessage);
    }
  };

  //confirm order
  const handleConfirmOrder = async (orderId: string) => {
    try {
      await axios.put<IOrder[]>(
        `${API_URL}/orders/confirm/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Order confirmed!");
      // Refresh orders
      setVendorOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Confirmed" } : order
        )
      );
    } catch (err) {
      console.error("Error confirming order", err);
      alert("Failed to confirm order.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Vendor Dashboard</h1>

      <div className="p-4">
        <p className="font-semibold">Welcome, {vendor?.name}!</p>
      </div>

      <div className="container mx-auto p-6">
        <h2 className="text-xl font-semibold mt-6">Add Product</h2>

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
          {/* ✅ Image Upload Input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file)); // ✅ Show preview
              }
            }}
            className="border p-2 w-full"
          />

          {/* ✅ Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="w-32 h-32 object-cover mt-2"
            />
          )}

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
            <div key={product._id} className="border p-4 mt-4">
              <h3 className="font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Stock: {product.stock}</p>

              {/* ✅ Display Existing Product Image */}
              {product.image && (
                <img
                  src={`http://localhost:3005${product.image}`}
                  alt={product.name}
                  className="w-20 h-20 object-cover mt-2"
                />
              )}

              {/* ✅ Edit & Delete Buttons */}
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setEditProduct(product)}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Edit
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

          {/* ✅ Show Edit Form if a Product is Selected */}
          {editProduct && (
            <div className="p-4 border mt-4">
              <h2 className="text-xl font-semibold">Edit Product</h2>

              <input
                type="text"
                placeholder="Product Name"
                className="border p-2 w-full"
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="border p-2 w-full"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="border p-2 w-full"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: Number(e.target.value),
                  })
                }
              />
              <input
                type="text"
                placeholder="Category"
                className="border p-2 w-full"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Stock"
                className="border p-2 w-full"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    stock: Number(e.target.value),
                  })
                }
              />

              {/* ✅ Allow Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditImageFile(file);
                    setEditImagePreview(URL.createObjectURL(file)); // ✅ Show preview
                  }
                }}
                className="border p-2 w-full"
              />

              {/* ✅ Show Image Preview if a New One is Selected */}
              {editImagePreview && (
                <img
                  src={editImagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2"
                />
              )}

              <button
                onClick={() =>
                  editProduct._id && updateProduct(editProduct._id)
                }
                className="bg-green-500 text-white px-4 py-2 mt-2"
              >
                Update Product
              </button>
              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Incoming Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : vendorOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            vendorOrders.map((order) => (
              <div key={order._id} className="border p-4 mb-4">
                <p className="font-semibold">Order #{order._id}</p>
                <p>Status: {order.status}</p>
                <p>Total: ${order.totalAmount}</p>
                <ul className="text-sm mt-2">
                  {order.products.map((prod: IOrderProduct, index: number) => (
                    <li key={index}>
                      • {prod.productId || "Product"} x {prod.quantity}
                    </li>
                  ))}
                </ul>
                {order.status !== "Confirmed" && (
                  <button
                    onClick={() => handleConfirmOrder(order._id)}
                    className="bg-blue-500 text-white px-4 py-2 mt-2"
                  >
                    Confirm Order
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
