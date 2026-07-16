const Loading = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-white gap-6">
      {/* Animated logo */}
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center animate-pulse">
          <svg width="24" height="24" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2h10l-1.5 7H3.5L2 2Z" fill="white" />
            <circle cx="5" cy="12" r="1.1" fill="white" />
            <circle cx="9.5" cy="12" r="1.1" fill="white" />
          </svg>
        </div>
        {/* Spinning ring */}
        <div className="absolute -inset-1.5 rounded-2xl border-2 border-transparent border-t-indigo-500 border-r-indigo-300 animate-spin" />
      </div>

      {/* Skeleton cards preview */}
      <div className="flex gap-3 mt-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`w-32 rounded-xl overflow-hidden stagger-${i + 1}`}>
            <div className="skeleton h-20 rounded-t-xl" />
            <div className="p-2 space-y-1.5 bg-white border border-slate-100 border-t-0 rounded-b-xl">
              <div className="skeleton h-2.5 rounded w-4/5" />
              <div className="skeleton h-2 rounded w-3/5" />
              <div className="skeleton h-2.5 rounded w-2/5 mt-1" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm font-semibold text-slate-400 animate-pulse tracking-wide">
        Loading products…
      </p>
    </div>
  );
};

export default Loading;