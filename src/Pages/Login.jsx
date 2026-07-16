import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { BsGoogle } from 'react-icons/bs';

const InputWithIcon = ({ icon: Icon, type: initialType, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = initialType === 'password';
  const type = isPassword ? (showPassword ? 'text' : 'password') : initialType;

  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type={type}
        {...props}
        className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 bg-white"
      />
      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <AiOutlineEyeInvisible className="w-4 h-4" /> : <AiOutlineEye className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (isLogin) {
      setSuccess("Welcome back! You're now logged in.");
    } else {
      setSuccess('Account created successfully! Welcome to Prokart.');
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setName(''); setEmail(''); setPassword(''); setConfirmPassword('');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">

      {/* ── Left Decorative Panel ──────────────────────── */}
      <div className="hidden lg:flex flex-1 bg-slate-900 flex-col justify-between p-10 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h10l-1.5 7H3.5L2 2Z" fill="white" />
              <circle cx="5" cy="12" r="1.1" fill="white" />
              <circle cx="9.5" cy="12" r="1.1" fill="white" />
            </svg>
          </span>
          <span className="font-black text-xl text-white">Prokart</span>
        </div>

        {/* Center content */}
        <div className="relative space-y-6">
          <h2 className="text-4xl font-black text-white leading-tight">
            The best{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              products
            </span>
            ,<br />all in one place.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Join millions of shoppers discovering amazing deals every day. Sign in to save your favorites and track your orders.
          </p>

          {/* Feature List */}
          <div className="space-y-3">
            {[
              'Free shipping on orders over $100',
              '30-day hassle-free returns',
              'Exclusive member-only deals',
              'Real-time order tracking',
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-indigo-600/30 border border-indigo-500/40 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-300 text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom text */}
        <div className="relative">
          <p className="text-slate-600 text-xs">© 2026 Prokart, Inc.</p>
        </div>
      </div>

      {/* ── Right Form Panel ────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-slate-50">
        <div className="w-full max-w-sm space-y-6 animate-fade-in">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <span className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h10l-1.5 7H3.5L2 2Z" fill="white" />
                <circle cx="5" cy="12" r="1.1" fill="white" />
                <circle cx="9.5" cy="12" r="1.1" fill="white" />
              </svg>
            </span>
            <span className="font-black text-lg text-slate-900">Prokart</span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-black text-slate-900">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {isLogin
                ? 'Sign in to access your account.'
                : 'Join Prokart and start shopping today.'}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3 rounded-xl animate-fade-in">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold p-3 rounded-xl animate-fade-in">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <InputWithIcon
                icon={FiUser}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <InputWithIcon
              icon={FiMail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputWithIcon
              icon={FiLock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <InputWithIcon
                icon={FiLock}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-all duration-200 text-sm shadow-sm hover:shadow-indigo-200 hover:shadow-lg cursor-pointer mt-1"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 border border-slate-200 bg-white py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <BsGoogle className="w-4 h-4 text-[#4285F4]" />
            Continue with Google
          </button>

          {/* Toggle */}
          <p className="text-sm text-center text-slate-500">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={switchMode}
              className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline cursor-pointer"
            >
              {isLogin ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;