import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, ShoppingCart } from "lucide-react";
import { InputWithButton } from "./InputWithButton";
import { useBasket } from "@/hooks/useBasket";
import { Link } from "react-router-dom";


function LandingPageDrawer() {
  const {basket} = useBasket()
  return (
    <Drawer>
      <DrawerTrigger className="md:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex items-center space-x-2 px-2 my-5">
          <InputWithButton />
          <Link to={"basket"} className="relative">
          <span className="absolute rounded-full bg-red-600 text-xs px-1 left-4 bottom-4 text-white">
            {basket.length}
          </span>
          <ShoppingCart />
        </Link>
        </div>

        <ul className="text-center space-y-10 my-10">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Account</li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

export default LandingPageDrawer;
