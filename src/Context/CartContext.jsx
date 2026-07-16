/* eslint-disable react-refresh/only-export-components */
import { useState, createContext } from 'react'

export const CartData = createContext();

const CartContext = ({ children }) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);

    const AddProductToCart = (product) => {
        setCartProducts((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const RemoveProductFromCart = (product) => {
        const filteredProducts = cartProducts.filter((cartProduct) => {
            return product.id !== cartProduct.id;
        });
        setCartProducts(filteredProducts);
    };

    const UpdateQuantity = (productId, amount) => {
        setCartProducts((prev) =>
            prev.map((item) => {
                if (item.id === productId) {
                    const newQty = (item.quantity || 1) + amount;
                    return { ...item, quantity: newQty < 1 ? 1 : newQty };
                }
                return item;
            })
        );
    };

    const ClearCart = () => {
        setCartProducts([]);
    };

    return (
        <CartData.Provider value={{
            cartProducts,
            AddProductToCart,
            RemoveProductFromCart,
            UpdateQuantity,
            ClearCart,
            cartOpen,
            setCartOpen
        }}>
            {children}
        </CartData.Provider>
    );
};

export default CartContext;