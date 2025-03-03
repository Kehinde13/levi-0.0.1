import { Customer } from "@/lib/types";
import { createContext } from "react";

  
  interface CustomerContextType {
    customer: Customer | null;
    setCustomer: (customer: Customer | null) => void;
  }
  
  export const CustomerContext = createContext<CustomerContextType | null>(null);