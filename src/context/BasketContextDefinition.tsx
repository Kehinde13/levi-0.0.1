import { createContext } from "react";

// Define Product type
export interface IProduct {
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