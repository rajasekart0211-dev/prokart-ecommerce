import { Link, useNavigate } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const navigate = useNavigate();

  const links = {
    Shop: [
      { label: 'All Products', to: '/' },
      { label: 'New Arrivals', to: '/' },
      { label: 'Best Sellers', to: '/' },
      { label: 'Sale', to: '/' },
    ],
    Help: [
      { label: 'FAQ', to: '/' },
      { label: 'Shipping Policy', to: '/' },
      { label: 'Returns & Refunds', to: '/' },
      { label: 'Track Order', to: '/' },
    ],
    Company: [
      { label: 'About Us', to: '/' },
      { label: 'Blog', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  };

  const socials = [
    { Icon: FiTwitter, href: '#', label: 'Twitter' },
    { Icon: FiInstagram, href: '#', label: 'Instagram' },
    { Icon: FiGithub, href: '#', label: 'GitHub' },
    { Icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  ];

  const paymentMethods = ['VISA', 'MC', 'AMEX', 'UPI', 'PAYP'];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 space-y-4">
            <button
              className="flex items-center gap-2 group"
              onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
            >
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2h10l-1.5 7H3.5L2 2Z" fill="white" />
                  <circle cx="5" cy="12" r="1.1" fill="white" />
                  <circle cx="9.5" cy="12" r="1.1" fill="white" />
                </svg>
              </span>
              <span className="font-black text-xl text-white tracking-tight">Prokart</span>
            </button>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Your one-stop destination for premium products at unbeatable prices. Shop smart, live better.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{heading}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-slate-400 hover:text-white transition-colors font-medium"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 font-medium">
            © 2026 Prokart, Inc. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-[9px] font-black text-slate-500 border border-slate-700 px-2 py-0.5 rounded tracking-widest"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;