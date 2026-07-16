import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review';
import { CartData } from '../Context/CartContext';
import Loading from '../Pages/LoadingPage';

const ProductDetail = () => {
    const { AddProductToCart, setCartOpen } = useContext(CartData);

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const discountedPrice = product
      ? (product.price - (product.price * (product.discountPercentage || 0)) / 100).toFixed(2)
      : '0.00';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
        
        {/* Left image wrapper */}
        <div className='flex items-center justify-center bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-inner hover:scale-[1.01] transition-transform duration-300'>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className='max-h-96 object-contain rounded-2xl'
          />
        </div>

        {/* Right content details */}
        <div className='space-y-5 flex flex-col justify-center'>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{product.category}</span>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-850 mt-2'>
              {product.title}
            </h1>
            <h3 className='font-bold text-slate-400 text-sm'>
              {product.brand}
            </h3>
          </div>

          <p className='text-slate-500 text-sm sm:text-base leading-relaxed'>
            {product.description}
          </p>

          <div className='flex gap-4 items-baseline'>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
              {"$" + discountedPrice}
            </h2>
            <h3 className='text-lg text-slate-400 font-bold line-through'>
              {"$"+ product.price}
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {product.discountPercentage}% OFF
            </span>
          </div>

          <button 
            className="w-full sm:w-auto bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-800 active:bg-blue-900 transition shadow-md hover:shadow-lg cursor-pointer text-center text-sm" 
            onClick={() => {
              AddProductToCart(product);
              setCartOpen(true);
            }}
          >
            Add to Cart
          </button>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 font-semibold space-y-1">
            <p>Return Policy: {product.returnPolicy}</p>
          </div>
        </div>
      </div>

      {/* Meta Specifications Box */}
      <div className='mt-8 bg-blue-50/40 border border-blue-100/50 rounded-3xl p-6 text-slate-600 shadow-xs flex flex-col sm:flex-row justify-between gap-6 text-sm font-semibold'>
        <div>
          <span className="text-slate-400 text-xs block mb-1">Stock Status</span>
          <span className="text-slate-700">{product.availabilityStatus}</span>
        </div>
        <div className="sm:border-l sm:border-blue-100 sm:pl-6">
          <span className="text-slate-400 text-xs block mb-1">Warranty</span>
          <span className="text-slate-700">{product.warrantyInformation}</span>
        </div>
        <div className="sm:border-l sm:border-blue-100 sm:pl-6">
          <span className="text-slate-400 text-xs block mb-1">Shipping Information</span>
          <span className="text-slate-700">{product.shippingInformation}</span>
        </div>
      </div>

      {/* Reviews Feedback Section */}
      <div className='mt-16 space-y-6'>
        <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-800'>Customer Reviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {product.reviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
