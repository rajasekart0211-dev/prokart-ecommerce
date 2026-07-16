import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartData } from '../Context/CartContext';
import { RxCross1 } from 'react-icons/rx';

const CartCard = ({ product }) => {
  const { setCartOpen, RemoveProductFromCart, UpdateQuantity } = useContext(CartData);
  const navigate = useNavigate();

  const discountedPrice = (
    product.price - (product.price * (product.discountPercentage || 0)) / 100
  ).toFixed(2);

  const lineTotal = (parseFloat(discountedPrice) * (product.quantity || 1)).toFixed(2);

  return (
    <div className="flex gap-3 p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-all duration-200 group relative">
      {/* Remove Button */}
      <button
        className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-300 hover:text-slate-600 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
        onClick={(e) => { e.stopPropagation(); RemoveProductFromCart(product); }}
        aria-label="Remove from cart"
      >
        <RxCross1 className="w-3 h-3" />
      </button>

      {/* Product Image */}
      <button
        className="flex-shrink-0 w-[72px] h-[72px] rounded-xl bg-slate-50 border border-slate-100 overflow-hidden cursor-pointer"
        onClick={() => { navigate(`/product/${product.id}`); setCartOpen(false); }}
        aria-label={`View ${product.title}`}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </button>

      {/* Info */}
      <div className="flex-1 min-w-0 pr-5">
        <button
          className="text-left w-full"
          onClick={() => { navigate(`/product/${product.id}`); setCartOpen(false); }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-none mb-0.5">
            {product.brand}
          </p>
          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </button>

        {/* Price + Quantity Row */}
        <div className="flex items-center justify-between mt-2.5">
          {/* Quantity stepper */}
          <div
            className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden bg-slate-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => UpdateQuantity(product.id, -1)}
              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer font-bold text-sm"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="text-xs font-black text-slate-800 w-6 text-center tabular-nums">
              {product.quantity || 1}
            </span>
            <button
              onClick={() => UpdateQuantity(product.id, 1)}
              className="w-7 h-7 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer font-bold text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-black text-slate-900">${lineTotal}</p>
            {product.quantity > 1 && (
              <p className="text-[10px] text-slate-400 font-medium">${discountedPrice} each</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;