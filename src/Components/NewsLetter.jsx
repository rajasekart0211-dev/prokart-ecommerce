import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-blue-700 text-white py-12 px-6 rounded-2xl mx-6 my-10">
      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-3xl font-bold mb-4">
          Subscribe to our Newsletter
        </h2>

        <p className="text-blue-100 mb-6">
          Get the latest product updates and exclusive offers directly in your inbox.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg w-full sm:w-80 text-black bg-white outline-none"
          />

          <button
            type="submit"
            className="bg-black hover:bg-gray-900 transition px-6 py-3 rounded-lg font-semibold"
            onClick={(e)=>{event.preventDefault()}}
          >
            Subscribe
          </button>

        </form>

      </div>
    </section>
  );
};

export default Newsletter;