import { useBasket } from "@/hooks/useBasket";
import { InputWithButton } from "./InputWithButton";
import LandingPageDrawer from "./landingPageDrawer";
import { ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CustomerContext } from "@/context/customerContextDefinition";

function Navbar() {
  const { basket } = useBasket();
  const customerContext = useContext(CustomerContext);
  const customer = customerContext?.customer;
  const navigate = useNavigate();
  
  
  return (
    <nav className="flex justify-between p-5 shadow-xl">
      <h1 className="text-3xl font-bold">Levi</h1>

      <ul className="md:flex space-x-5 hidden mt-2">
        <Link to={'/'}>
          <li className="hover:border-b border-slate-500 cursor-pointer">
            Home
          </li>
        </Link>
        <Link to={'contact'}>
          <li className="hover:border-b border-slate-500 cursor-pointer">
            Contact
          </li>
        </Link>
        <Link to={'about'}>
          <li className="hover:border-b border-slate-500 cursor-pointer">
            About
          </li>
        </Link>
         { customer?.role !== "vendor" && <Link to={ !customer ? "/auth" : "/profile"}>
          <li className="hover:border-b border-slate-500 cursor-pointer">
            { !customer ? "Account" : "Profile"}
          </li>
        </Link>}
      </ul>

      <div className="md:flex items-center space-x-4 hidden">
        <InputWithButton />
       {customer && <div className="flex items-center space-x-4">
          <span className="w-max">{customer?.name}</span>
          <button onClick={() => navigate("/logout")} className="bg-[#DB4444] text-white p-2 rounded-md">
            Logout
          </button>
        </div>}
        <Link to={'basket'} className="relative">
          {basket.length > 0 && <span className="absolute rounded-full bg-red-600 text-xs px-1 left-4 bottom-4 text-white">
            {basket.length}
          </span>}
          <ShoppingCart />
        </Link>
      </div>

      <div className="md:hidden flex gap-3 relative">
        <Link to={'basket'} className="mt-1">
          {basket.length > 0 && <span className="absolute rounded-full bg-red-600 text-xs px-1 left-4 bottom-4 text-white">
            {basket.length}
          </span>}
          <ShoppingCart />
        </Link>
        <LandingPageDrawer />
      </div>
    </nav>
  );
}

export default Navbar;
