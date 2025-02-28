import { BasketContext } from "@/context/BasketContextDefinition";
import { useContext } from "react";

// ✅ Custom Hook (Correct way to access context)
export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
      throw new Error("useBasket must be used within a BasketProvider");
    }
    return context;
  };