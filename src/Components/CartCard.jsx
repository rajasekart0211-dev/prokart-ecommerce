import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartData } from '../Context/CartContext';
import { RxCross1 } from "react-icons/rx";

const CartCard = ({ product }) => {
  const { setCartOpen, RemoveProductFromCart, UpdateQuantity } = useContext(CartData);
  const navigate = useNavigate();

  const discountedPrice = (product.price - (product.price * (product.discountPercentage || 0)) / 100).toFixed(2);

  return (
    <div 
      className='group p-4 flex flex-col sm:flex-row shadow-sm rounded-2xl gap-4 items-center border
      border-slate-200 bg-white hover:border-slate-300 transition duration-150 cursor-pointer relative'
      onClick={() => {
        navigate(`/product/${product.id}`);
        setCartOpen(false);
      }}
    >
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        className='w-24 h-24 object-cover shadow-sm bg-slate-50 rounded-xl border border-slate-100'
      />

      <div className='flex-1 flex flex-col text-slate-800 w-full sm:w-auto'>
        <div className="flex justify-between items-start">
          <h2 className='font-bold text-base text-center sm:text-left line-clamp-1 flex-1 pr-4'>{product.title}</h2>
          
          <button
            className='p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer sm:absolute sm:top-4 sm:right-4'
            onClick={(e) => {
              e.stopPropagation();
              RemoveProductFromCart(product);
            }}
            aria-label="Remove item from cart"
          >
            <RxCross1 className='h-4 w-4' />
          </button>
        </div>

        <h3 className='font-bold text-slate-400 text-xs text-center sm:text-left mt-0.5'>
          {product.brand}
        </h3> 

        <div className='flex items-center gap-3 justify-between sm:justify-start mt-3'>
          <div className='flex items-center gap-2'>
            <span className="text-lg font-extrabold text-blue-650">
              {"$" + discountedPrice}
            </span>
            <span className='text-xs text-slate-400 font-bold line-through'>
              {"$"+ product.price}
            </span>
          </div>

          {/* Quantity Controls */}
          <div 
            className="flex items-center gap-2 border border-slate-200 rounded-lg p-0.5 bg-slate-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => UpdateQuantity(product.id, -1)}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white active:bg-slate-150 transition cursor-pointer font-bold text-xs text-slate-600"
            >
              -
            </button>
            <span className="text-xs font-bold text-slate-800 w-5 text-center">{product.quantity || 1}</span>
            <button 
              onClick={() => UpdateQuantity(product.id, 1)}
              className="w-6 h-6 rounded flex items-center justify-center hover:bg-white active:bg-slate-150 transition cursor-pointer font-bold text-xs text-slate-600"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;