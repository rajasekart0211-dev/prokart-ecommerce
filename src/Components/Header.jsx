const Header = () => {
  const scrollToProducts = () => {
    const section = document.getElementById('products');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { value: '30K+', label: 'Products' },
    { value: '98%', label: 'Satisfaction' },
    { value: '2M+', label: 'Customers' },
    { value: 'Free', label: 'Returns' },
  ];

  const badges = ['⚡ Fast Delivery', '🔒 Secure Payments', '↩️ Easy Returns', '🎁 Gift Wrapping'];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        {/* Dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* Top badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            New arrivals added weekly
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
            Shop the{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Future
            </span>
            <br />
            <span className="text-white/90">of Commerce</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
            Discover thousands of premium products at unbeatable prices.
            Fast shipping, easy returns, no compromises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-100 active:scale-[0.98] transition-all duration-200 shadow-lg text-sm group"
            >
              Shop Now
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={scrollToProducts}
              className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 text-sm backdrop-blur-sm"
            >
              Browse All
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden animate-fade-in">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm px-6 py-5 text-center hover:bg-white/10 transition-colors"
            >
              <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
              <p className="text-slate-400 text-xs mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in">
          {badges.map((badge, i) => (
            <span
              key={i}
              className="bg-white/8 border border-white/12 text-white/70 text-xs font-medium px-4 py-2 rounded-full backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Header;