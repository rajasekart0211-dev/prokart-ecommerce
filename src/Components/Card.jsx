import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartData } from '../Context/CartContext'

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { AddProductToCart, setCartOpen } = useContext(CartData);

  return (
    <div 
      className='group w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-md hover:shadow-xl
      hover:scale-[1.02] hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between'
      onClick={() => { navigate(`/product/${product.id}`) }}
    >
      <div>
        <div className="overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className='h-48 w-full object-cover group-hover:scale-[1.05] transition-transform duration-300'
          />
        </div>

        <div className='mt-4'>
          <h2 className='text-lg font-bold text-gray-800 truncate'>
            {product.title}
          </h2>

          <p className='mt-2 text-sm text-gray-500 line-clamp-2 h-10'>
            {product.description}
          </p>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <span className='text-xl font-extrabold text-blue-600'>
          ${product.price}
        </span>

        <button 
          className='rounded-lg bg-black px-3.5 py-1.5 text-sm text-white hover:bg-gray-800 active:bg-gray-900 transition font-semibold cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            AddProductToCart(product);
            setCartOpen(true);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;