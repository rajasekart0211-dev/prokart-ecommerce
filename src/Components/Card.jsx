import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartData } from '../Context/CartContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { AddProductToCart, setCartOpen } = useContext(CartData);

  const discountedPrice = (product.price - (product.price * (product.discountPercentage || 0)) / 100).toFixed(2);
  const hasDiscount = (product.discountPercentage || 0) > 0.5;

  return (
    <div
      className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden w-full"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          -{Math.round(product.discountPercentage)}%
        </div>
      )}

      {/* Stock badge */}
      {product.stock < 10 && (
        <div className="absolute top-3 right-3 z-10 bg-amber-50 border border-amber-200 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
          Low stock
        </div>
      )}

      {/* Product Image */}
      <div className="relative overflow-hidden bg-slate-50 h-52">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="w-full bg-slate-900/90 backdrop-blur-sm text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              AddProductToCart(product);
              setCartOpen(true);
            }}
          >
            <AiOutlineShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand */}
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          {product.brand || product.category}
        </p>

        {/* Title */}
        <h2 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-2">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating || 0} />
          <span className="text-xs text-slate-400 font-medium">({(product.rating || 0).toFixed(1)})</span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-slate-900">${discountedPrice}</span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through font-medium">${product.price}</span>
            )}
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-600 transition-all duration-200 cursor-pointer flex-shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              AddProductToCart(product);
              setCartOpen(true);
            }}
            aria-label={`Add ${product.title} to cart`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;