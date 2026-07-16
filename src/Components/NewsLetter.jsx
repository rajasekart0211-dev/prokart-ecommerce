const Newsletter = () => {
  return (
    <section className="bg-blue-700 text-white py-16 px-6 rounded-3xl mx-4 sm:mx-8 my-12 shadow-lg">
      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Subscribe to our Newsletter
        </h2>

        <p className="text-blue-100 mb-8 max-w-lg mx-auto">
          Get the latest product updates and exclusive offers directly in your inbox.
        </p>

        <form className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
          
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3.5 rounded-xl w-full sm:w-80 text-black bg-white outline-none focus:ring-2 focus:ring-blue-400 text-sm font-medium"
            required
          />

          <button
            type="submit"
            className="bg-black hover:bg-gray-900 active:bg-gray-800 transition px-6 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase cursor-pointer"
            onClick={(e) => { e.preventDefault(); }}
          >
            Subscribe
          </button>

        </form>

      </div>
    </section>
  );
};

export default Newsletter;