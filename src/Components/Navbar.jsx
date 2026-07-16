import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartData } from '../Context/CartContext';
import { Products } from '../Context/Productsdata';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosSearch, IoMdCloseCircle } from 'react-icons/io';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { MdOutlineHome } from 'react-icons/md';
import { RiUserLine } from 'react-icons/ri';

const Navbar = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const productsContext = useContext(Products);
  const productsList = productsContext?.data || [];
  const { cartOpen, setCartOpen, cartProducts } = useContext(CartData);

  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const clearSearch = () => {
    setSearch('');
    setSearchOpen(false);
  };

  const totalCartItems = cartProducts.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const filteredProducts = search.trim()
    ? productsList.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <>
      {/* ── Main Navbar ───────────────────────────────────────── */}
      <nav
        className={`flex justify-between items-center px-5 sm:px-8 py-3.5 sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100'
            : 'bg-white/80 backdrop-blur-md border-b border-transparent'
        }`}
      >
        {/* Logo */}
        <button
          className="flex items-center gap-1.5 group select-none"
          onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
          aria-label="Go to homepage"
        >
          <span className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2h10l-1.5 7H3.5L2 2Z" fill="white" />
              <circle cx="5" cy="12" r="1.1" fill="white" />
              <circle cx="9.5" cy="12" r="1.1" fill="white" />
            </svg>
          </span>
          <span className="font-black text-lg text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
            Prokart
          </span>
        </button>

        {/* Center Search Bar (desktop) */}
        <div
          className={`relative flex-1 max-w-md mx-6 hidden md:flex items-center transition-all duration-300 ${
            searchOpen ? 'opacity-100' : 'opacity-100'
          }`}
        >
          <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5 pointer-events-none" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => { if (!search) setSearchOpen(false); }, 200)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all duration-200"
          />
          {search && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
              <IoMdCloseCircle className="w-4.5 h-4.5" />
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search icon */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <IoIosSearch className="w-5 h-5" />
          </button>

          {/* Cart Button */}
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            onClick={() => setCartOpen(!cartOpen)}
            aria-label="Open cart"
          >
            <AiOutlineShoppingCart className="w-5 h-5" />
            {totalCartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[9px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center min-w-[18px] animate-bounce-in">
                {totalCartItems > 99 ? '99+' : totalCartItems}
              </span>
            )}
          </button>

          {/* Login Button */}
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-1.5 bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-600 transition-all duration-200 ml-1 shadow-sm"
            onClick={() => { setCartOpen(false); window.scrollTo(0, 0); }}
          >
            <RiUserLine className="w-3.5 h-3.5" />
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt3 className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Search Bar ──────────────────────────────────── */}
      <div className={`md:hidden px-4 pb-2 pt-1 bg-white/95 backdrop-blur-xl border-b border-slate-100 transition-all duration-300 z-39 sticky top-[60px] ${
        searchOpen ? 'block' : 'hidden'
      }`}>
        <div className="relative">
          <IoIosSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all duration-200"
          />
          {search && (
            <button onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <IoMdCloseCircle className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
            <span className="font-black text-lg text-slate-900">Menu</span>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-semibold text-sm transition-colors"
              onClick={() => { setMobileMenuOpen(false); window.scrollTo(0, 0); }}
            >
              <MdOutlineHome className="w-5 h-5" />
              Home
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-semibold text-sm transition-colors"
              onClick={() => { setMobileMenuOpen(false); window.scrollTo(0, 0); }}
            >
              <RiUserLine className="w-5 h-5" />
              Login / Sign Up
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button
              className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-indigo-600 transition-colors text-sm"
              onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }}
            >
              View Cart {totalCartItems > 0 && `(${totalCartItems})`}
            </button>
          </div>
        </div>
      </div>

      {/* ── Search Results Popup ───────────────────────────────── */}
      {search.trim() && (
        <div className="fixed z-39 left-1/2 -translate-x-1/2 top-16 md:top-[68px] w-[calc(100%-2rem)] max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{search}"
            </p>
            <button onClick={clearSearch} className="text-slate-400 hover:text-slate-600 transition-colors">
              <IoMdCloseCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-[65vh] overflow-y-auto divide-y divide-slate-50">
            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-2xl">🔍</p>
                <p className="text-slate-600 font-semibold text-sm">No products found</p>
                <p className="text-slate-400 text-xs">Try searching with different keywords</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    clearSearch();
                  }}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{product.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{product.brand} · {product.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-slate-900 text-sm">${(product.price - (product.price * (product.discountPercentage || 0)) / 100).toFixed(2)}</p>
                    {product.discountPercentage > 0 && (
                      <p className="text-xs text-indigo-500 font-semibold">{product.discountPercentage?.toFixed(0)}% off</p>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;