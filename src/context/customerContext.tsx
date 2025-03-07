import { useState, useEffect } from "react";
import axios from "axios";
import { CustomerContext } from "./customerContextDefinition";
import { Customer } from "@/lib/types";



export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:3005/api/customer/me", {
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
