import { useState, ReactNode, useEffect, useContext } from "react";
import { BasketContext } from "./BasketContextDefinition";
import { IProduct } from "./BasketContextDefinition";
import { CustomerContext } from "../context/customerContextDefinition";

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const customerContext = useContext(CustomerContext);
  const customer = customerContext?.customer;

  const userKey = customer?._id ? `basket_${customer._id}` : "guest_basket";

  // ✅ Load basket from localStorage using userKey
  const getBasketForUser = (key: string) => {
    const savedBasket = localStorage.getItem(key);
    return savedBasket ? JSON.parse(savedBasket) : [];
  };

  const [basket, setBasket] = useState<IProduct[]>(() =>
    getBasketForUser(userKey)
  );

  // ✅ Sync basket to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(basket));
  }, [basket, userKey]);

  // ✅ Load correct basket when user logs in/out
  useEffect(() => {
    const key = customer?._id ? `basket_${customer._id}` : "guest_basket";
    const storedBasket = getBasketForUser(key);
    setBasket(storedBasket);
  }, [customer?._id]);

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

  const updateProductQuantity = (id: string, quantity: number) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  const removeProductFromBasket = (id: string) => {
    setBasket((prevBasket) => prevBasket.filter((item) => item.id !== id));
  };

  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem(userKey);
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addProductToBasket,
        removeProductFromBasket,
        updateProductQuantity,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
