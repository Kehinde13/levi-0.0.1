import  { useState } from "react";
import sideImg from "../assets/SideImage.png";
import Login from "./Login";
import Signup from "./Signup";


function Auth() {
    const [login, setLogin] = useState(true)
    const toggleLogin = () => {
        setLogin(!login)
    }

  return (
    <div className="flex h-screen">
      <img src={sideImg} alt="side image" className="hidden md:block" />
      <div className="md:ml-20 md:mt-20 mt-10 md:w-[40%] w-[80%] mx-auto">
        <h1 className="text-2xl font-semibold mb-3">{login ? "Log in to Exclusive" : "Create an account"}</h1>
        <p>Enter your details below</p>
        {
            login ? <Login toggleLogin={toggleLogin} /> : <Signup toggleLogin={toggleLogin} />
        }
      </div>
    </div>
  );
}

export default Auth;
