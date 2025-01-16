import { InputWithButton } from "./InputWithButton";
import LandingPageDrawer from "./landingPageDrawer";
import Cart from "./ShoppingCart";

function Navbar() {
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
        <Cart />
      </div>

      <LandingPageDrawer />
    </nav>
  );
}

export default Navbar;
