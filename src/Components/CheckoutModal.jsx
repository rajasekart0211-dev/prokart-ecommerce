import { useState, useContext } from 'react';
import { CartData } from '../Context/CartContext';
import { RxCross1 } from 'react-icons/rx';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BsCreditCard2Front, BsTruck } from 'react-icons/bs';

const InputField = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs font-semibold text-slate-500 block">{label}</label>}
    <input
      {...props}
      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-white"
    />
  </div>
);

const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartProducts, ClearCart } = useContext(CartData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [activeStep, setActiveStep] = useState('shipping'); // 'shipping' | 'payment'

  const [form, setForm] = useState({
    name: '', address: '', city: '', zip: '',
    card: '', expiry: '', cvv: '',
  });

  if (!isOpen) return null;

  const subtotal = cartProducts.reduce((sum, item) => {
    const dp = item.price - (item.price * (item.discountPercentage || 0)) / 100;
    return sum + dp * (item.quantity || 1);
  }, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field, val) => setForm((prev) => ({ ...prev, [field]: val }));

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setOrderId('PRK-' + Math.floor(100000 + Math.random() * 900000));
      ClearCart();
    }, 2000);
  };

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };
  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative border border-slate-100 animate-scale-in">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer z-10"
        >
          <RxCross1 className="w-4 h-4" />
        </button>

        {/* ── Success State ───────────────────────────── */}
        {isSuccess ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-5">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center animate-bounce-in">
              <AiFillCheckCircle className="w-12 h-12 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Order Confirmed! 🎉</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                Thank you for shopping with Prokart. Your order is being prepared and will be with you soon.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl text-sm">
              <span className="text-slate-400 font-medium">Order ID: </span>
              <span className="font-black text-slate-800 font-mono">{orderId}</span>
            </div>
            <button
              onClick={onClose}
              className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-indigo-600 transition-colors shadow-sm cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="flex flex-col md:flex-row min-h-[500px]">

            {/* ── Left: Form ───────────────────────────── */}
            <div className="flex-1 p-6 md:p-8 space-y-6 border-b md:border-b-0 md:border-r border-slate-100">

              {/* Step tabs */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setActiveStep('shipping')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    activeStep === 'shipping' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BsTruck className="w-3.5 h-3.5" />
                  Shipping
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep('payment')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    activeStep === 'payment' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <BsCreditCard2Front className="w-3.5 h-3.5" />
                  Payment
                </button>
              </div>

              {/* Shipping Fields */}
              {activeStep === 'shipping' && (
                <div className="space-y-3 animate-fade-in">
                  <h2 className="text-lg font-black text-slate-900">Shipping Details</h2>
                  <InputField label="Full Name" type="text" placeholder="John Doe" value={form.name} onChange={(e) => handleInputChange('name', e.target.value)} required />
                  <InputField label="Street Address" type="text" placeholder="123 Main Street" value={form.address} onChange={(e) => handleInputChange('address', e.target.value)} required />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="City" type="text" placeholder="New York" value={form.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
                    <InputField label="ZIP Code" type="text" placeholder="10001" value={form.zip} onChange={(e) => handleInputChange('zip', e.target.value)} required />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveStep('payment')}
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-colors mt-2 text-sm cursor-pointer"
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* Payment Fields */}
              {activeStep === 'payment' && (
                <div className="space-y-3 animate-fade-in">
                  <h2 className="text-lg font-black text-slate-900">Payment Information</h2>

                  {/* Card icons */}
                  <div className="flex items-center gap-2 pb-1">
                    {['VISA', 'MC', 'AMEX', 'PAYP'].map((brand) => (
                      <span key={brand} className="text-[9px] font-black text-slate-400 border border-slate-200 px-2 py-0.5 rounded tracking-widest">
                        {brand}
                      </span>
                    ))}
                  </div>

                  <InputField
                    label="Card Number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={form.card}
                    onChange={(e) => handleInputChange('card', formatCard(e.target.value))}
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      label="Expiry Date"
                      type="text"
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => handleInputChange('expiry', formatExpiry(e.target.value))}
                      required
                    />
                    <InputField
                      label="CVV"
                      type="password"
                      placeholder="•••"
                      maxLength="3"
                      value={form.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your payment info is encrypted and secure.
                  </p>
                </div>
              )}
            </div>

            {/* ── Right: Order Summary ──────────────────── */}
            <div className="w-full md:w-64 lg:w-72 bg-slate-50 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none p-6 md:p-7 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-4">Order Summary</h3>

                {/* Item List */}
                <div className="max-h-44 overflow-y-auto space-y-2.5 mb-4 pr-1">
                  {cartProducts.map((item) => {
                    const dp = (item.price - (item.price * (item.discountPercentage || 0)) / 100);
                    return (
                      <div key={item.id} className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 overflow-hidden flex-shrink-0">
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-700 line-clamp-1">{item.title}</p>
                          <p className="text-[10px] text-slate-400">× {item.quantity || 1}</p>
                        </div>
                        <p className="text-xs font-bold text-slate-800 flex-shrink-0">
                          ${(dp * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Breakdown */}
                <div className="border-t border-slate-200 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? 'text-emerald-600' : ''}`}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (8%)</span><span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Total + Submit */}
              <div className="mt-4">
                <div className="flex justify-between items-center py-3 border-t border-slate-200 mb-4">
                  <span className="text-sm font-black text-slate-900">Total</span>
                  <span className="text-xl font-black text-slate-900">${total.toFixed(2)}</span>
                </div>

                {activeStep === 'payment' && (
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing…
                      </>
                    ) : (
                      `Place Order · $${total.toFixed(2)}`
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
