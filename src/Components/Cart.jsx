import { useContext, useState } from 'react';
import { CartData } from '../Context/CartContext';
import CartCard from './CartCard';
import { RxCross1 } from "react-icons/rx";
import CheckoutModal from './CheckoutModal';

const Cart = () => {
  const { cartProducts, cartOpen, setCartOpen, ClearCart } = useContext(CartData);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Calculate billing
  const subtotal = cartProducts.reduce((sum, item) => {
    const discountedPrice = item.price - (item.price * (item.discountPercentage || 0)) / 100;
    return sum + discountedPrice * (item.quantity || 1);
  }, 0);

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Drawer Overlay backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 z-45 ${
          cartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartOpen(false)}
      />

      <div 
        className={`fixed top-0 right-0 h-screen w-full sm:max-w-md md:max-w-lg bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out flex flex-col justify-between border-l border-slate-100
        ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
          <h2 className="text-xl font-extrabold text-slate-800">Your Cart</h2>
          <button 
            onClick={() => setCartOpen(false)}
            className="p-1 hover:bg-slate-200 rounded-full transition cursor-pointer text-slate-500 hover:text-slate-700"
          >
            <RxCross1 className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
          {cartProducts.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-3 p-6">
              <span className="text-4xl text-slate-300">🛒</span>
              <h3 className="text-xl font-extrabold text-slate-500">Cart is Empty</h3>
              <p className="text-xs text-slate-400 max-w-[200px]">Add products to your cart to proceed with order checkout.</p>
            </div>
          ) : (
            cartProducts.map((product) => (
              <CartCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Footer Section */}
        {cartProducts.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-white space-y-4">
            <div className="space-y-2 text-xs text-slate-500 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-slate-805 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-slate-805 font-bold">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span className="text-slate-805 font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-800 pt-2 border-t border-slate-150">
                <span>Total</span>
                <span className="text-lg font-extrabold text-blue-650">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                className="flex-1 border border-slate-200 hover:bg-slate-50 bg-white text-slate-700 py-3 rounded-xl font-bold text-xs transition cursor-pointer hover:border-slate-300"
                onClick={ClearCart}
              >
                Clear Cart
              </button>
              <button
                className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => setCheckoutOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal component */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          setCartOpen(false); // Close cart drawer
        }}
      />
    </>
  );
};

export default Cart;