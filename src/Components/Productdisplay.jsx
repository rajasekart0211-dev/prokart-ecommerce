import React,{ useContext } from 'react'
import { Products } from '../Context/Productsdata'
import Card from './Card';
import Newsletter from './NewsLetter'
import Header from './Header';

const Productdisplay = () => {

    const productsList = useContext(Products);

  return (
    <>
    <Header/>
    <div id="products" className='flex flex-wrap gap-10 justify-center py-15 mx-auto'>
        {productsList.map((product)=>{
            return <Card key={product.id} product = {product}/>
        })}
        
    </div>
    <Newsletter/>
    </>
    
  )
}

export default Productdisplay