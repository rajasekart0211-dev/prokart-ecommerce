import React, { useState,createContext } from 'react'


export const CartData = createContext();

const CartContext = ({children}) => {

    const[cartOpen,setCartOpen] = useState(false);

    const[cartProducts,setCartProducts] = useState([]);

    const isExists = (product)=>{
        return cartProducts.some(
            (cartProduct)=>cartProduct.id === product.id
        )
    }

    const AddProductToCart = (product)=>{
        if(isExists(product)) return;

        setCartProducts((prev)=> [...prev, product]);
    }

    const RemoveProductFromCart = (product)=>{
        const filteredProducts = cartProducts.filter((cartProduct)=>{
            return product.id !== cartProduct.id;
        })

        setCartProducts(filteredProducts)
    }

    return (
        <CartData.Provider value={{cartProducts , AddProductToCart , RemoveProductFromCart,
            cartOpen, setCartOpen
        }}>
            {children}
        </CartData.Provider>
    )
}

export default CartContext