import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { InputWithButton } from "./InputWithButton";
import Cart from "./ShoppingCart";

function LandingPageDrawer() {
  return (
    <Drawer>
      <DrawerTrigger className="md:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex items-center space-x-2 px-2 my-5">
          <InputWithButton />
          <Cart />
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
