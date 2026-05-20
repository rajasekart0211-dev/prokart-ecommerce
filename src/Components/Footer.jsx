import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        <h1 className="text-xl font-bold tracking-widest">
          Prokart
        </h1>

        <p className="text-sm text-gray-400 mt-3 md:mt-0">
          © 2026 Prokart. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;