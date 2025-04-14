import Banner from "@/components/Banner"
import Featured from "@/components/featured"
import { Header } from "@/components/Header"
import Products from "@/components/Products"
import Services from "@/components/Services"


function LandingPage() {
  return (
    <>
     <Header />
     <Products />
     <Banner />
     <Featured />
     <Services />
    </>
  )
}

export default LandingPage