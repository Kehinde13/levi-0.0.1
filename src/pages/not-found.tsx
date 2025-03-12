import { Link } from 'react-router-dom';

const notFound = () => {
  return (
    <div className='w-full mx-auto my-32 text-center flex flex-col gap-10 items-center'>
      <h1 className='md:text-8xl text-4xl font-semibold'>
        404 Not Found
      </h1>
      <p>your visited page is not found</p>

      <Link to={'/'} className='bg-[#DB4444] px-4 py-2 rounded-md text-white'>
        Go back to HomePage
      </Link>
    </div>
  )
}

export default notFound