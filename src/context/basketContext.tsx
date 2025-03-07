import { useState, ReactNode, useEffect, useContext } from "react";
import { BasketContext } from "./BasketContextDefinition";
import { IProduct } from "./BasketContextDefinition";
import { CustomerContext } from "../context/customerContextDefinition";

export const BasketProvider = ({ children }: { children: ReactNode }) => {
  const customerContext = useContext(CustomerContext);
  const customer = customerContext?.customer;

  // ✅ Load basket based on user ID
  const getBasketForUser = (userId: string | null) => {
    if (!userId) return [];
    const savedBasket = localStorage.getItem(`basket_${userId}`);
    return savedBasket ? JSON.parse(savedBasket) : [];
  };

  const [basket, setBasket] = useState<IProduct[]>(() => getBasketForUser(localStorage.getItem("id")));

  useEffect(() => {
    if (customer?.id) {
      localStorage.setItem(`basket_${customer.id}`, JSON.stringify(basket));
    }
  }, [basket, customer?.id]);

  useEffect(() => {
    setBasket(getBasketForUser(customer?.id || null));
  }, [customer?.id]);

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

  return (
    <BasketContext.Provider value={{ basket, addProductToBasket, removeProductFromBasket, updateProductQuantity }}>
      {children}
    </BasketContext.Provider>
  );
};
