import { useContext } from 'react'
import { Products } from '../Context/Productsdata'
import Card from './Card';
import Newsletter from './NewsLetter'
import Header from './Header';
import Loading from '../Pages/LoadingPage'

const Productdisplay = () => {
    const { data: productsList, loading } = useContext(Products);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 id="products" className="text-3xl font-extrabold text-gray-950 text-center mb-8 scroll-mt-24">
                    Explore Our Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
                    {productsList.map((product) => {
                        return <Card key={product.id} product={product} />
                    })}
                </div>
            </div>
            <Newsletter />
        </>
    );
};

export default Productdisplay;