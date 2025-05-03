import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { InputWithButton } from "./InputWithButton";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextDefinition";


function LandingPageDrawer() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userRole = authContext?.userRole
  const isLoggedIn = !!userRole;

  return (
    <Drawer>
      <DrawerTrigger className="md:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex items-center space-x-2 px-2 my-5">
          <InputWithButton />
        </div>

        <ul className="flex flex-col gap-8 py-8 text-center">
        <Link to={'/'}>
          <li className="cursor-pointer">
            Home
          </li>
        </Link>
        <Link to={'contact'}>
          <li className="cursor-pointer">
            Contact
          </li>
        </Link>
        <Link to={'about'}>
          <li className="cursor-pointer">
            About
          </li>
        </Link>
        <Link to={isLoggedIn ? "/profile" : "/auth"}>
          <li className=" border-slate-500 cursor-pointer">
            {isLoggedIn ? "Profile" : "Account"}
          </li>
        </Link>
        </ul>
        {
          isLoggedIn &&
          <button onClick={() => navigate("/logout")} className="my-2 bg-[#DB4444] text-white py-2 px-4 rounded-md">
          Logout
         </button>
        }
      </DrawerContent>
    </Drawer>
  );
}

export default LandingPageDrawer;
