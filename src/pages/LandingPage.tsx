import Featured from "@/components/featured"
import { Header } from "@/components/Header"
import Products from "@/components/Products"
import Services from "@/components/Services"


function LandingPage() {
  return (
    <>
     <Header />
     <Products />
     <Featured />
     <Services />
    </>
  )
}

export default LandingPage