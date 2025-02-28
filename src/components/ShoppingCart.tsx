import { useBasket } from "@/hooks/useBasket";
import { useState } from "react";

const Basket = () => {
  const { basket, removeProductFromBasket, updateProductQuantity } = useBasket();
  const [loading, setLoading] = useState(false);
  
  const totalPrice = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const vendorNumber = "+1234567890"; // ✅ Replace with actual vendor number
      const orderSummary = basket
        .map((item) => `🛒 ${item.name} x ${item.quantity} - $${item.price * item.quantity}`)
        .join("\n");

      const message = encodeURIComponent(
        `📦 *New Order Request!*\n\n${orderSummary}\n\n💰 *Total: $${totalPrice.toFixed(2)}*\n\nPlease confirm my order.`
      );

      window.open(`https://wa.me/${vendorNumber}?text=${message}`, "_blank");
    } catch (error) {
      console.error("Checkout failed", error);
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
          <div className="space-y-4">
            {basket.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Decrease Button (Disabled when quantity = 1) */}
                  <button
                    onClick={() => updateProductQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className={`px-2 py-1 border ${item.quantity === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  {/* Increase Button */}
                  <button
                    onClick={() => updateProductQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border"
                  >
                    +
                  </button>

                  {/* Remove Product */}
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
              {loading ? "Processing..." : "Checkout via WhatsApp"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Basket;
