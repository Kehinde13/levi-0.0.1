import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define Product type
interface IProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

// Define BasketContext type
interface IBasketContext {
  basket: IProduct[];
  addProductToBasket: (id: string, product: IProduct) => void;
  removeProductFromBasket: (id: string) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
}

// ✅ Create Context (No namespace)
export const BasketContext = createContext<IBasketContext | undefined>(undefined);

// ✅ Provider Component
export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState<IProduct[]>(() => {
    // Load basket from local storage on init
    const savedBasket = localStorage.getItem("basket");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  // Save basket to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // Function to add a product
  const addProductToBasket = (id: string, product: IProduct) => {
    setBasket((prevBasket) => {
      const existingProduct = prevBasket.find((item) => item.id === id);
      if (existingProduct) {
        return prevBasket.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevBasket, { ...product, quantity: 1 }];
    });
  };

  // ✅ Function to update quantity
   const updateProductQuantity = (id: string, quantity: number) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  // Function to remove a product
  const removeProductFromBasket = (id: string) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
  };

  return (
    <BasketContext.Provider value={{ basket, addProductToBasket, removeProductFromBasket, updateProductQuantity }}>
      {children}
    </BasketContext.Provider>
  );
};

// ✅ Custom Hook (Correct way to access context)
export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
};
