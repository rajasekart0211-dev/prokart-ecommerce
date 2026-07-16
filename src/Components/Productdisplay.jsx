import { useContext, useState } from 'react';
import { Products } from '../Context/Productsdata';
import Card from './Card';
import Newsletter from './NewsLetter';
import Header from './Header';
import Loading from '../Pages/LoadingPage';

const CATEGORIES = ['All'];

const Productdisplay = () => {
  const { data: productsList, loading } = useContext(Products);
  const [activeCategory, setActiveCategory] = useState('All');

  if (loading) return <Loading />;

  // Build unique category list
  const categories = ['All', ...new Set(productsList.map((p) => p.category))];

  const filtered =
    activeCategory === 'All'
      ? productsList
      : productsList.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2">
              Our Collection
            </p>
            <h2
              id="products"
              className="text-3xl sm:text-4xl font-black text-slate-900 scroll-mt-28 leading-tight"
            >
              Explore Products
            </h2>
          </div>
          <p className="text-sm text-slate-400 font-medium">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 flex-wrap mb-8 pb-4 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 capitalize cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center space-y-3">
            <p className="text-4xl">🧐</p>
            <p className="text-slate-600 font-semibold">No products in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 0.04, 0.4)}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <Card product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Newsletter />
    </>
  );
};

export default Productdisplay;