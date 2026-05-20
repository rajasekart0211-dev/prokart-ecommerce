import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartData } from '../Context/CartContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {

  const { setCartOpen,cartOpen } = useContext(CartData);
  return (
    <nav className='flex justify-end items-center [&>h1:first-child]:mr-auto px-6 py-4 shadow-xl border 
    border-white/5 bg-slate-300/10 backdrop-blur-md sticky top-0 z-50 gap-7
    '>
        <h1 className='font-bold tracking-widest text-gray-700 text-2xl'>
          Prokart
          </h1>
        <AiOutlineShoppingCart
          className='w-7 h-7 hover:scale-110 text-black transition duration-75
          hover:text-blue-600'
          onClick={()=>{cartOpen ? setCartOpen(false):setCartOpen(true)}}
        />

        <Link to={"/login"}  className='
        hover:scale-105 text-white transition duration-75 bg-blue-700 px-4 py-2 rounded-lg
        font-semibold hover:bg-blue-800'
    >
            Login
        </Link>
    </nav>
  )
}

export default Navbar