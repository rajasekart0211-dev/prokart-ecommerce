import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartData } from '../Context/CartContext';
import { Products } from '../Context/Productsdata';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();

  const productsList = useContext(Products);
  const { cartOpen, setCartOpen } = useContext(CartData);

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchChange = (value) => {
    setSearch(value);
    setSearchOpen(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchOpen(false);
  };

  return (
    <>

      <nav className='flex justify-end items-center [&>h1:first-child]:mr-auto px-6 py-4 shadow-xl border 
      border-white/5 bg-slate-300/10 backdrop-blur-md sticky top-0 z-50 gap-7'>

        <h1
          className='font-bold tracking-widest text-gray-700 text-2xl cursor-pointer'
          onClick={() => navigate('/')}
        >
          Prokart
        </h1>

        <div className={`relative mx-auto ${searchOpen ? 'block' : 'hidden'}`}>
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className='border-2 border-gray-300 py-1 pr-10 pl-4 rounded-3xl w-xl text-center outline-black/40'
          />

          <IoMdCloseCircle
            className='absolute right-2 top-2 h-5 w-5 text-gray-400 cursor-pointer'
            onClick={clearSearch}
          />
        </div>

        <IoIosSearch
          className='w-8 h-8 hover:scale-110 hover:text-blue-600 transition duration-75 cursor-pointer'
          onClick={() => setSearchOpen(!searchOpen)}
        />

        <AiOutlineShoppingCart
          className='w-7 h-7 hover:scale-110 text-black transition duration-75 hover:text-blue-600 cursor-pointer'
          onClick={() => setCartOpen(!cartOpen)}
        />

        <Link
          to="/login"
          className='hover:scale-105 text-white transition duration-75 bg-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-800'
          onClick={() => {
            setCartOpen(false);
            window.scrollTo(0, 0);
          }}
        >
          Login
        </Link>

      </nav>

      <div
        className={`w-3/4 h-8/10 bg-black/20 fixed left-1/2 -translate-x-1/2
        ${searchOpen ? 'block' : 'hidden'}
        backdrop-blur-md shadow-md overflow-y-scroll p-6 flex flex-col gap-4`}
      >
        {productsList
          .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div
              key={product.id}
              className='flex items-center gap-4 bg-gray-200 p-3 rounded-md cursor-pointer h-30 
              shadow-md'
              onClick={() =>{
                navigate(`/product/${product.id}`);
                setSearchOpen(false);
                setSearch("");
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className='w-20 h-20 object-cover rounded'
              />

              <div>
                <h1 className='font-semibold'>{product.title}</h1>
                <p>{product.brand}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Navbar;