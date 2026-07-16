import { useContext, useState } from 'react';
import { CartData } from '../Context/CartContext';
import CartCard from './CartCard';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CheckoutModal from './CheckoutModal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartProducts, cartOpen, setCartOpen, ClearCart } = useContext(CartData);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const subtotal = cartProducts.reduce((sum, item) => {
    const discountedPrice = item.price - (item.price * (item.discountPercentage || 0)) / 100;
    return sum + discountedPrice * (item.quantity || 1);
  }, 0);

  const FREE_SHIPPING_THRESHOLD = 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);

  const totalItems = cartProducts.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 z-45 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:max-w-[420px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-out border-l border-slate-100 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <AiOutlineShoppingCart className="w-5 h-5 text-slate-700" />
            <h2 className="text-base font-black text-slate-900">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <RxCross1 className="w-4 h-4" />
          </button>
        </div>

        {/* ── Free Shipping Bar ──────────────────────────── */}
        {cartProducts.length > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100">
            <div className="flex justify-between items-center mb-1.5">
              <p className="text-xs font-semibold text-indigo-700">
                Add <span className="font-black">${amountToFreeShipping}</span> more for free shipping!
              </p>
              <p className="text-[10px] font-bold text-indigo-400">{Math.round(shippingProgress)}%</p>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-1.5">
              <div
                className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}
        {cartProducts.length > 0 && subtotal >= FREE_SHIPPING_THRESHOLD && (
          <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-xs font-bold text-emerald-700">You qualify for free shipping! 🎉</p>
          </div>
        )}

        {/* ── Cart Items ─────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartProducts.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4 px-8">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                <AiOutlineShoppingCart className="w-9 h-9 text-slate-300" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-700 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Looks like you haven't added anything yet. Start shopping!
                </p>
              </div>
              <Link
                to="/"
                onClick={() => setCartOpen(false)}
                className="bg-slate-900 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-indigo-600 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            cartProducts.map((product) => (
              <CartCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* ── Footer / Checkout ──────────────────────────── */}
        {cartProducts.length > 0 && (
          <div className="border-t border-slate-100 bg-white p-5 space-y-4">
            {/* Bill breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Subtotal ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                <span className="text-slate-800 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Shipping</span>
                <span className={`font-bold ${shipping === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Tax (8%)</span>
                <span className="text-slate-800 font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2.5 border-t border-slate-100">
                <span className="text-sm font-black text-slate-900">Total</span>
                <span className="text-xl font-black text-slate-900">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5">
              <button
                className="flex-none px-4 py-3 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
                onClick={ClearCart}
              >
                Clear
              </button>
              <button
                className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors shadow-sm cursor-pointer hover:shadow-indigo-200 hover:shadow-lg"
                onClick={() => setCheckoutOpen(true)}
              >
                Checkout · ${total.toFixed(2)}
              </button>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => { setCheckoutOpen(false); setCartOpen(false); }}
      />
    </>
  );
};

export default Cart;