import React, { useContext, useState } from 'react'
import { CartData } from '../Context/CartContext'
import CartCard from './CartCard';
import { RxCross1 } from "react-icons/rx";

const Cart = () => {

    const { cartProducts,cartOpen,setCartOpen } = useContext(CartData);

  return (
    <div 
      className={`fixed w-full h-screen top-0 pt-25 space-y-5 right-0 
      bg-gray-400/50 backdrop-blur-md p-4 z-10
      transform transition-transform duration-300 ease-in-out overflow-y-auto
      lg:w-2xl
      ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
        {
         cartProducts.length === 0 ? (
             <div className="h-full flex justify-center items-center relative">
                
                <h1 className="text-3xl font-bold text-black/40">
                    Cart is Empty
                </h1>
            </div>
          ):(  
        cartProducts.map((product)=>{
            return <CartCard key={product.id} product={product}/>
        }))}
    </div>
  )
}

export default Cart