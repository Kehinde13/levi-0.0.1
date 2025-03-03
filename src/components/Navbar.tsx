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

      <ul className="hidden md:flex gap-5 mt-2 font-semibold">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Account</li>
      </ul>

      <div className="md:flex items-center space-x-4 hidden">
        <InputWithButton />
        <div className="flex items-center space-x-4">
          <span>{customer?.name}</span>
          <button onClick={() => navigate("/logout")} >Logout</button>
        </div>
        <Link to={'basket'} className="relative">
          <span className="absolute rounded-full bg-red-600 text-xs px-1 left-4 bottom-4 text-white">
            {basket.length}
          </span>
          <ShoppingCart />
        </Link>
      </div>

      <LandingPageDrawer />
    </nav>
  );
}

export default Navbar;
