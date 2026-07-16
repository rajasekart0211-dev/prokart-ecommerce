import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartData } from '../Context/CartContext';
import { Products } from '../Context/Productsdata';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosSearch, IoMdCloseCircle } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  const navigate = useNavigate();

  const productsContext = useContext(Products);
  const productsList = productsContext?.data || [];
  const { cartOpen, setCartOpen, cartProducts } = useContext(CartData);

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchChange = (value) => {
    setSearch(value);
    setSearchOpen(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearch("");
    setSearchOpen(false);
  };

  const totalCartItems = cartProducts.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const filteredProducts = productsList.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <nav className='flex justify-between items-center px-6 py-4 shadow-md border-b
      border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 gap-4'>

        <h1
          className='font-bold tracking-widest text-blue-700 text-2xl cursor-pointer select-none hover:scale-102 transition'
          onClick={() => {
            navigate('/')
            window.scrollTo(0, 0);
          }}
        >
          Prokart
        </h1>

        <div className={`relative flex-1 max-w-xs md:max-w-md mx-auto ${searchOpen ? 'block' : 'hidden'}`}>
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className='border border-gray-300 py-1.5 pr-10 pl-4 rounded-3xl w-full text-center outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm'
          />

          <IoMdCloseCircle
            className='absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600'
            onClick={clearSearch}
          />
        </div>

        <div className="flex items-center gap-5">
          <IoIosSearch
            className='w-7 h-7 hover:scale-110 hover:text-blue-600 transition duration-75 cursor-pointer text-gray-700'
            onClick={() => setSearchOpen(!searchOpen)}
          />

          <div className="relative cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
            <AiOutlineShoppingCart
              className='w-7 h-7 hover:scale-110 text-gray-700 transition duration-75 hover:text-blue-600'
            />
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </div>

          <Link
            to="/login"
            className='hover:scale-105 text-white transition duration-75 bg-blue-700 px-5 py-2 rounded-lg font-semibold
             hover:bg-blue-800 hidden sm:block shadow-sm'
            onClick={() => {
              setCartOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Login
          </Link>

          <CiMenuBurger
            className='w-6 h-6 block sm:hidden cursor-pointer text-gray-700 hover:text-blue-600'
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-white shadow-2xl p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="font-bold text-xl text-gray-800">Menu</span>
            <IoMdCloseCircle
              className="h-7 w-7 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>

          <Link
            to="/"
            className="text-lg font-semibold text-gray-700 hover:text-blue-700 py-2 border-b border-gray-50"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-lg font-semibold text-gray-700 hover:text-blue-700 py-2 border-b border-gray-50"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo(0, 0);
            }}
          >
            Login
          </Link>
        </div>
      </div>

      {/* Search results popup */}
      <div
        className={`w-full max-w-3xl max-h-[60vh] bg-white/95 backdrop-blur-md fixed z-30 left-1/2 -translate-x-1/2 top-[72px]
        ${searchOpen && search.trim() ? 'block' : 'hidden'}
        shadow-2xl border border-gray-150 overflow-y-auto p-4 flex flex-col gap-3 rounded-b-2xl`}
      >
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-medium">
            No products found matching "{search}"
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className='flex items-center gap-4 bg-gray-50 p-2 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-[1.01] transition-all duration-150 border border-gray-100'
              onClick={() => {
                navigate(`/product/${product.id}`);
                setSearchOpen(false);
                setSearch("");
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className='w-16 h-16 object-cover rounded-lg bg-white border border-gray-200'
              />
              <div className="flex-1">
                <h1 className='font-semibold text-gray-800 text-sm md:text-base'>{product.title}</h1>
                <p className='text-xs md:text-sm text-gray-500'>{product.brand}</p>
              </div>
              <span className="font-bold text-blue-600 mr-2">${product.price}</span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Navbar;