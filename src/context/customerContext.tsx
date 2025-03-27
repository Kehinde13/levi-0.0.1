import { useState, useEffect } from "react";
import axios from "axios";
import { CustomerContext } from "./customerContextDefinition";
import { Customer } from "@/lib/types";

const API_URL = import.meta.env.VITE_API_URL;


export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomer(response.data as Customer);
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
