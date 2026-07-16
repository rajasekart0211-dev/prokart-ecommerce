import { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white mx-4 sm:mx-6 lg:mx-8 my-12 rounded-3xl">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-violet-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-14 text-center">
        {/* Top label */}
        <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Newsletter
        </span>

        <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
          Stay in the{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            loop
          </span>
        </h2>

        <p className="text-slate-400 mb-8 text-sm leading-relaxed max-w-md mx-auto">
          Get exclusive deals, new arrivals, and insider updates delivered straight to your inbox.
          No spam — ever.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 animate-fade-in">
            <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-bold text-lg">You're subscribed!</p>
            <p className="text-slate-400 text-sm">Watch your inbox for exclusive deals 📬</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address…"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm font-medium outline-none focus:border-indigo-400 focus:bg-white/15 transition-all duration-200 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-white text-slate-900 font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-indigo-100 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-8">
          {['No spam, ever', '50,000+ subscribers', 'Unsubscribe anytime'].map((text) => (
            <span key={text} className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;