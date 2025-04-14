import sideimg from "../assets/Sideimage2.png";
import service3 from "../assets/Services3.png";
import service4 from "../assets/Services4.png";
import service5 from "../assets/Services5.png";
import photo4 from "../assets/Frame874.png";
import photo5 from "../assets/Frame875.png";
import photo6 from "../assets/Frame876.png";
import icon1 from "../assets/icon-instagram1.png";
import icon2 from "../assets/Icon-Twitter1.png";
import icon3 from "../assets/Icon-Linkedin1.png";
import Services from "../components/Services";

function page() {
  return (
    <div>
      <div className="flex h-screen">
        <div className="self-center flex flex-col gap-5 px-10 text-center md:text-left">
          <h1 className="text-5xl font-semibold">Our Story</h1>
          <p>
            Launced in 2015, Exclusive is West Africa’s premier online shopping
            makterplace with an active presense in Nigeria. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <img src={sideimg} alt="side img" className="hidden md:block" />
      </div>
      <div className="flex flex-col gap-16 md:flex-row justify-between md:mx-20 my-20 text-center items-center">
        <div className="border border-gray-300 rounded-md p-10">
          <img src={service3} alt="shop icon" className="mx-auto" />
          <h1 className="font-semibold text-3xl my-2">10.5k</h1>
          <p>Sellers active in our site</p>
        </div>
        <div className="border border-gray-300 rounded-md p-10">
          <img src={service4} alt="shop icon" className="mx-auto" />
          <h1 className="font-semibold text-3xl my-2">45.5k</h1>
          <p>Customers active in our site</p>
        </div>
        <div className="border border-gray-300 rounded-md p-10">
          <img src={service5} alt="shop icon" className="mx-auto" />
          <h1 className="font-semibold text-3xl my-2">25k</h1>
          <p>Annual gross sale in our site</p>
        </div>
      </div>
      <div className="flex flex-col gap-10 md:flex-row justify-between mx-10 my-32">
        <div>
          <img src={photo4} alt="founder photo" />
          <h1 className="text-2xl font-semibold my-1">Tom Cruise</h1>
          <p>founder and chairman</p>
          <div className="flex gap-2 mt-2">
            <img src={icon1} alt="instagram icon" />
            <img src={icon2} alt="twitter icon" />
            <img src={icon3} alt="linkedin icon" />
          </div>
        </div>
        <div>
          <img src={photo5} alt="managing director" />
          <h1 className="text-2xl font-semibold my-1">Emma Watson</h1>
          <p>Managing Director</p>
          <div className="flex gap-2 mt-2">
            <img src={icon1} alt="instagram icon" />
            <img src={icon2} alt="twitter icon" />
            <img src={icon3} alt="linkedin icon" />
          </div>
        </div>
        <div>
          <img src={photo6} alt="product designer" />
          <h1 className="text-2xl font-semibold my-1">Will Smith</h1>
          <p>Product Designer</p>
          <div className="flex gap-2 mt-2">
            <img src={icon1} alt="instagram icon" />
            <img src={icon2} alt="twitter icon" />
            <img src={icon3} alt="linkedin icon" />
          </div>
        </div>
      </div>
      <Services />
    </div>
  );
}

export default page;
