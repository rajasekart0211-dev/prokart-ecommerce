import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({ product }) => {

    const navigate = useNavigate();

  return (
    <div key={product.id} className='group w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-xl
    hover:scale-[1.01] hover:-translate-y-1.5 transition duration-100 active:bg-black/40 '
     onClick={()=>{navigate(`/product/${product.id}`)}}>
      
      <img
        src={product.thumbnail}
        alt={product.title}
        className='h-48 w-full rounded-lg object-cover group-hover:scale-[1.1] transition-transform
        duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl'
      />

      <div className='mt-4  '>
        <h2 className='text-lg font-semibold'>
          {product.title}
        </h2>

        <p className='mt-2 text-sm text-gray-600 line-clamp-2'>
          {product.description}
        </p>

        <div className='mt-4 flex items-center justify-between'>
          <span className='text-xl font-bold text-blue-600'>
            ${product.price}
          </span>

          <button className='rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 active:bg-gray-500'>
            Buy
          </button>
        </div>
      </div>

    </div>
  )
}

export default Card