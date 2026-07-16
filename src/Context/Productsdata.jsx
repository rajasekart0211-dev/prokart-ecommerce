/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext } from 'react'

export const Products = createContext();

const Productsdata = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then(res => res.json())
            .then(res => {
                setData(res.products);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    return (
        <Products.Provider value={{ data, loading }}>
            {children}
        </Products.Provider>
    );
};

export default Productsdata;