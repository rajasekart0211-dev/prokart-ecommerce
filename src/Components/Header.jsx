const Header = () => {

    const scrollToProducts = () => {
    const section = document.getElementById("products");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-6">

      <div className="max-w-5xl mx-auto text-center space-y-6">

        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Prokart
        </h1>

        <p className="text-lg text-blue-100">
          Discover amazing products at unbeatable prices. Shop smart, shop fast.
        </p>

        <button className="bg-black hover:bg-gray-900 transition px-6 py-3 rounded-lg font-semibold"
        onClick={scrollToProducts}
>
          Shop Now
        </button>

      </div>

    </section>
  );
};

export default Header;