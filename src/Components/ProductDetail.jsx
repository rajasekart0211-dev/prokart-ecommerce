import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Review from './review';
import { CartData } from '../Context/CartContext';
import Loading from '../Pages/LoadingPage';

const ProductDetail = () => {

    const { AddProductToCart } = useContext(CartData)

    const { id } = useParams();
    const [product,setProduct] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{

        window.scrollTo(0,0);

        fetch(`https://dummyjson.com/products/${id}`)
        .then(res=> res.json())
        .then(res=>{

            if(res.message){
                setProduct(null);
                setLoading(false);
                return;
            }

            setLoading(false)
            setProduct(res)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    },[id])

    if(loading) return <Loading/>

    if (!product) return <h1>Product not found</h1>;

    

  return (
    <div>
        <div className='h-auto w-full max-w-4xl mx-auto gap-8 mt-12 grid grid-cols-1 
        md:grid-cols-2 p-4'>
            <div className='flex items-center justify-center shadow-2xl border border-black/10
            rounded-2xl p-3 hover:scale-[1.01] transition duration-75
            '>
                <img src={product.thumbnail} 
                alt={product.title} className='w-3xl '/>
            </div>
            <div className='space-y-4 p-8 flex flex-col justify-center w-auto'>
                <h1 className='text-3xl font-bold'>
                    {product.title}
                </h1>
                <h3 className='font-bold text-gray-500'>
                        {product.brand}
                </h3>
                <p className='text-gray-500'>
                    {product.description}
                </p>
                <div className='flex gap-3 items-end'>
                    <h1 className="text-4xl font-bold">
                        {(
                            product.price -
                            (product.price * product.discountPercentage) / 100
                            ).toFixed(2)}
                    </h1>
                    <h1 className='text-xl text-gray-400 font-bold line-through'>
                        {"$"+ product.price}
                    </h1>
                
                </div>
                <p className='font-bold text-gray-500'>
                    {product.category}
                </p>
                <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 
                active:bg-blue-950 transition
                " onClick={() => AddProductToCart(product)}>
                    Add to Cart
                </button>
                <div>

                </div>
                <h4 className='text-gray-500 font-bold'>
                    {product.returnPolicy}
                </h4>
            </div>
        </div>


        <div className='w-[80%] mx-auto gap-8 mt-12 bg-gray-800 rounded-xl text-white p-6 
        font-semibold space-y-2 hover:scale-[1.01] transition duration-75'>
            <p>Stock Status: {product.availabilityStatus}</p>
            <p>Warranty: {product.warrantyInformation}</p>
            <p>Shipping: {product.shippingInformation}</p>
        </div>

        <div className='w-[80%] mx-auto mt-12 space-y-3 p-5'>
            <h1 className='text-3xl font-semibold'>Customer Feedbacks:</h1>
            <div className='space-y-3'>
                {product.reviews.map((review,index)=>{
                    return <Review key={index} review={review}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default ProductDetail