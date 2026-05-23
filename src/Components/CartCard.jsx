import React,{ useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartData } from '../Context/CartContext';
import { RxCross1 } from "react-icons/rx";

const CartCard = ({product}) => {
    const { setCartOpen,cartOpen,RemoveProductFromCart } = useContext(CartData);
    const navigate = useNavigate();
  return (
    <div 
    className='group p-3 flex flex-col shadow-xl w-full rounded-2xl gap-10 items-center border
     border-white/30 bg-gray-300 hover:scale-[1.01] hover:-translate-y-1.5 transition duration-100 active:bg-gray-600
     md:flex-row
    ' onClick={()=>{
        navigate(`/product/${product.id}`)
        setCartOpen(false)
        }}>
        <img src={product.thumbnail} alt={product.title} 
        className='w-37.5 shadow-lg bg-white rounded-2xl'/>

        <div className='flex flex-col text-2xl font-bold ites-center'>
            <h2 className='text-center lg:text-start'>{product.title}</h2>
            <h3 className='sm:font-bold text-gray-500 text-sm text-center
            md:text-start'>
                        {product.brand}
            </h3> 
            <div className='sm:flex flex-col gap-3 justify-center
            md:flex-row items-end justify-start'>
                    <h1 className="sm:text-4xl font-bold text-center">
                        {"$"+(
                            product.price -
                            (product.price * product.discountPercentage) / 100
                            ).toFixed(2)}
                    </h1>
                    <h1 className='sm:text-xl text-center text-gray-400 font-bold line-through
                    '>
                        {"$"+ product.price}
                    </h1>
                
            </div>
            <div>

            </div>
        </div>
        <RxCross1
        className='h-5 w-5 invisible lg:group-hover:visible ml-auto mr-4'
        onClick={(e)=>{
            e.stopPropagation();
            setCartOpen(true);
            RemoveProductFromCart(product)
        }}
        />
    </div>
  )
}

export default CartCard