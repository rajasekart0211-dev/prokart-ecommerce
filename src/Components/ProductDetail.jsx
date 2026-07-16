import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Review from './Review';
import { CartData } from '../Context/CartContext';
import Loading from '../Pages/LoadingPage';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { BsTruck, BsArrowCounterclockwise, BsShieldCheck } from 'react-icons/bs';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        fill="currentColor" viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ProductDetail = () => {
  const { AddProductToCart, setCartOpen } = useContext(CartData);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const discountedPrice = product
    ? (product.price - (product.price * (product.discountPercentage || 0)) / 100).toFixed(2)
    : '0.00';

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.message) { setProduct(null); setLoading(false); return; }
        setLoading(false);
        setProduct(res);
        setActiveImage(0);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return <Loading />;

  if (!product) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-6xl">😕</p>
      <h1 className="text-2xl font-black text-slate-800">Product Not Found</h1>
      <p className="text-slate-500 text-sm">The product you're looking for doesn't exist or was removed.</p>
      <Link to="/" className="mt-2 bg-slate-900 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-600 transition-colors text-sm">
        Back to Shop
      </Link>
    </div>
  );

  const images = product.images?.length ? product.images : [product.thumbnail];

  const handleAddToCart = () => {
    AddProductToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setCartOpen(true);
  };

  const specItems = [
    { icon: <BsTruck className="w-4.5 h-4.5" />, label: 'Shipping', value: product.shippingInformation },
    { icon: <BsArrowCounterclockwise className="w-4.5 h-4.5" />, label: 'Returns', value: product.returnPolicy },
    { icon: <BsShieldCheck className="w-4.5 h-4.5" />, label: 'Warranty', value: product.warrantyInformation },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-8">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="capitalize hover:text-indigo-600 transition-colors cursor-default">{product.category}</span>
        <span>/</span>
        <span className="text-slate-700 truncate max-w-[200px]">{product.title}</span>
      </nav>

      {/* ── Main Product Section ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Left: Image Gallery */}
        <div className="space-y-3">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 aspect-square flex items-center justify-center group">
            <img
              src={images[activeImage]}
              alt={product.title}
              className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Stock pill */}
            <div className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full border ${
              product.availabilityStatus === 'In Stock'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              {product.availabilityStatus}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i
                      ? 'border-indigo-500 shadow-md'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="space-y-6 lg:pt-2">
          {/* Category + Brand */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
              {product.category}
            </span>
            {product.brand && (
              <span className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                <MdVerified className="text-indigo-400 w-3.5 h-3.5" />
                {product.brand}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating Row */}
          <div className="flex items-center gap-3 flex-wrap">
            <StarRating rating={product.rating || 0} />
            <span className="text-sm font-bold text-slate-700">{(product.rating || 0).toFixed(1)}</span>
            <span className="text-xs text-slate-400">
              ({product.reviews?.length || 0} review{product.reviews?.length !== 1 ? 's' : ''})
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-500 leading-relaxed text-[15px]">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-4xl font-black text-slate-900">${discountedPrice}</span>
            {(product.discountPercentage || 0) > 0.5 && (
              <>
                <span className="text-lg text-slate-400 line-through font-medium">${product.price}</span>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  Save {Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 cursor-pointer shadow-md ${
              added
                ? 'bg-emerald-500 text-white scale-[0.98]'
                : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-200 hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {added ? (
              <>
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart!
              </>
            ) : (
              <>
                <AiOutlineShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>

          {/* Spec Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {specItems.map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1">
                <div className="text-slate-400">{item.icon}</div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className="text-xs font-semibold text-slate-700 leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Customer Reviews ──────────────────────────────────── */}
      {product.reviews?.length > 0 && (
        <div className="mt-16 pt-10 border-t border-slate-100">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">Verified Buyers</p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Customer Reviews</h2>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
              <span className="text-2xl font-black text-slate-900">{(product.rating || 0).toFixed(1)}</span>
              <div>
                <StarRating rating={product.rating || 0} />
                <p className="text-[10px] text-slate-400 mt-0.5">{product.reviews.length} reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
