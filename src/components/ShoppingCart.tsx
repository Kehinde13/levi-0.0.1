import { Heart, ShoppingCart } from 'lucide-react'

export default function Cart() {
    
  return (
    <div className='flex gap-4'>
          <div className='relative'>
          <span className='absolute rounded-full bg-red-600 text-xs px-1 left-4 bottom-4 text-white'>3</span>
             <Heart />
          </div>
          <div className='relative'>
          <span className='absolute rounded-full bg-red-600 text-xs px-1 left-4 bottom-4 text-white'>1</span>
            <ShoppingCart />
          </div>
    </div>
  )
}

