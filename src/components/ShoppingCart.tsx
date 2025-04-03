import { useBasket } from "@/hooks/useBasket";
import { useContext, useState } from "react";
import { CustomerContext } from "@/context/customerContextDefinition";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Basket = () => {
  const { basket, removeProductFromBasket, updateProductQuantity, clearBasket } = useBasket();
  const customerContext = useContext(CustomerContext);
  const customer = customerContext?.customer || null;

  const [loading, setLoading] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestAddress, setGuestAddress] = useState("");

  const token = localStorage.getItem("token");
  const totalPrice = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!customer && (!guestName || !guestEmail || !guestAddress)) {
      alert("Please enter your name, email, and address to continue as a guest.");
      return;
    }
  
    setLoading(true);
  
    try {
      const orderData = {
        user: customer?._id || null,  // ✅ This sends `user` if logged in
        products: basket.map(({ id, quantity }) => ({
          productId: id,
          quantity,
        })),
        totalAmount: totalPrice,
        guest: !customer ? {
          name: guestName,
          email: guestEmail,
          address: guestAddress,
        } : undefined,
      };
      
  
      await axios.post(`${API_URL}/orders/create`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Order placed successfully!");
      clearBasket();
  
      // ✅ Send WhatsApp message
      const vendorNumber = "+2348103823867";
      const orderSummary = basket
        .map((item) => `🛒 ${item.name} x ${item.quantity} - $${item.price * item.quantity}`)
        .join("\n");
  
      const customerInfo = customer
        ? `👤 *Customer:* ${customer.name} (${customer.email})`
        : `👤 *Guest:* ${guestName} (${guestEmail})\n🏠 *Address:* ${guestAddress}`;
  
      const message = encodeURIComponent(
        `📦 *New Order Request!*\n\n${orderSummary}\n\n💰 *Total: $${totalPrice.toFixed(2)}*\n\n${customerInfo}\n\nPlease confirm my order.`
      );
  
      window.open(`https://wa.me/${vendorNumber}?text=${message}`, "_blank");
    } catch {
      console.error("Checkout failed:");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Basket</h1>

      {basket.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {!customer && (
            <div className="mb-4 p-4 border rounded">
              <h2 className="text-lg font-semibold mb-2">Guest Checkout</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Delivery Address"
                value={guestAddress}
                onChange={(e) => setGuestAddress(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
          )}

          <div className="space-y-4">
            {basket.map((item) => (
              <div key={item.id} className="md:flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://levi-backend.vercel.app${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0 flex items-center gap-2">
                  <button
                    onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className={`px-2 py-1 border ${item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeProductFromBasket(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
