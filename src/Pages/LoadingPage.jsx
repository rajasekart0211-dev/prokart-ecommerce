import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-100">

      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <h1 className="mt-6 text-xl font-semibold text-gray-700">
        Loading...
      </h1>

    </div>
  );
};

export default Loading;