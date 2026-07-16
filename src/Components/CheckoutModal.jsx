import { useState, useContext } from 'react';
import { CartData } from '../Context/CartContext';
import { IoMdCloseCircle } from 'react-icons/io';
import { AiFillCheckCircle } from 'react-icons/ai';

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartProducts, ClearCart } = useContext(CartData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: ''
  });

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cartProducts.reduce((sum, item) => {
    const discountedPrice = item.price - (item.price * (item.discountPercentage || 0)) / 100;
    return sum + discountedPrice * (item.quantity || 1);
  }, 0);

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order placement API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setOrderId('ORD-' + Math.floor(100000 + Math.random() * 900000));
      ClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-60 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative border border-slate-100">
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition cursor-pointer z-10"
        >
          <IoMdCloseCircle className="w-8 h-8" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-6 my-auto">
            <AiFillCheckCircle className="w-20 h-20 text-emerald-500 animate-bounce" />
            <h2 className="text-3xl font-extrabold text-slate-800">Order Placed Successfully!</h2>
            <p className="text-slate-500 max-w-md">
              Thank you for shopping with Prokart. Your payment was processed and your package is being prepared.
            </p>
            <div className="bg-slate-50 border border-slate-150 px-6 py-3 rounded-2xl font-mono text-slate-700 text-sm font-semibold">
              Order ID: {orderId}
            </div>
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition shadow-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="flex flex-col md:flex-row h-full">
            
            {/* Left: Input Details Form */}
            <div className="flex-1 p-6 md:p-8 space-y-4 border-b md:border-b-0 md:border-r border-slate-100">
              <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Shipping details</h2>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                  required
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={form.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    value={form.zip}
                    onChange={(e) => handleInputChange('zip', e.target.value)}
                    className="w-28 px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <h2 className="text-xl font-extrabold text-slate-800 mt-6 mb-2">Payment information</h2>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number (16 digits)"
                  value={form.card}
                  maxLength="16"
                  onChange={(e) => handleInputChange('card', e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                  required
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={form.expiry}
                    onChange={(e) => handleInputChange('expiry', e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                    required
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    value={form.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className="w-24 px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right: Order Summary Breakdown */}
            <div className="w-full md:w-72 bg-slate-50 p-6 md:p-8 flex flex-col justify-between rounded-r-3xl">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 mb-4">Summary</h2>
                <div className="max-h-48 overflow-y-auto mb-4 space-y-2 pr-1">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="truncate flex-1 pr-2">
                        <span className="font-semibold text-slate-700">{item.title}</span>
                        <span className="text-slate-400 text-[10px] ml-1">x{item.quantity || 1}</span>
                      </div>
                      <span className="font-bold text-slate-700">
                        {"$" + ((item.price - (item.price * (item.discountPercentage || 0)) / 100) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="border-t border-slate-200 pt-4 flex justify-between items-end mb-6">
                  <span className="font-bold text-slate-850">Total</span>
                  <span className="text-2xl font-extrabold text-blue-600">${total.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition duration-150 shadow-md cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
