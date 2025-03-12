import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">
        <Outlet /> {/* ✅ This will render the current page inside the layout */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
