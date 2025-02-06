import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Basket from "./components/ShoppingCart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/basket" element={<Basket />} /> 
      </Routes>
    </Router>
  );
}

export default App;
