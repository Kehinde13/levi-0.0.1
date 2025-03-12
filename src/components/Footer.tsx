import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppStore from '../assets/AppStore.png'
import googlePlay from '../assets/GooglePlay.png'
import facebook from '../assets/Icon-Facebook.png'
import instagram from '../assets/icon-instagram.png'
import linkedIn from '../assets/Icon-Linkedin.png'
import twitter from '../assets/Icon-Twitter.png'
import QrCode from '../assets/Qr Code.png'

function Footer() {
  return (
    <div className="w-full p-5 bg-black">
      <div className="flex flex-col md:flex-row gap-10 text-gray-100 w-[90%] p-10 mx-auto justify-between text-center md:text-left">
        <div className="flex flex-col gap-5">
          <h1 className="font-semibold text-xl">Exclusive</h1>
          <p>Subscribe</p>
          <p className='text-xs'>Get 10% off your first order</p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Enter your Email" />
            <Button type="submit">
              <Send />
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-semibold ">Support</h1>
          <ul className='text-sm flex flex-col gap-5 mt-5'>
            <li>111 ozumba mbadiwe, VI Lagos</li>
            <li>exclusive111@gmail.com</li>
            <li>+234-81-2345-6789</li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold ">Account</h1>
          <ul className='text-sm flex flex-col gap-5 mt-5'>
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold ">Quick Link</h1>
          <ul className='text-sm flex flex-col gap-5 mt-5'>
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold ">Download App</h1>
          <p className='text-sm text-gray-500 my-5'>Save $3 with App New User Only</p>
          <div className='grid grid-cols-2 grid-rows-2'>
            <img src={QrCode} alt='QrCode' className='row-span-2' />
            <img src={googlePlay} alt='google play' className='row-span-1' />
            <img src={AppStore} alt='app store' className='row-span-1' />
          </div>
          <div className='flex justify-between gap-2 mt-5'>
            <img src={facebook} alt='facebook' />
            <img src={twitter} alt='twitter' />
            <img src={instagram} alt='instagram' />
            <img src={linkedIn} alt='linkedIn' />
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-center text-xs md:text-sm border-t-gray-600 pt-3 border-t">
        &copy; Copyright exclusive 2024 All rights reserved
      </p>
    </div>
  );
}

export default Footer;
