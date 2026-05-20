import React, { Children, useEffect, useState } from 'react'
import { createContext } from 'react'


export const Products = createContext();

const Productsdata = ({children}) => {
  
    const[data,setData] = useState([]);

    useEffect(()=>{
        fetch("https://dummyjson.com/products")
        .then(res=>res.json())
        .then(res=>setData(res.products))
        .catch(err=>console.log(err))
    },[])

    return (
        <Products.Provider value={data}>
            {children}
        </Products.Provider>        
  )
}

export default Productsdata