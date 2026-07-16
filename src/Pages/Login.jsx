import { useState } from 'react';

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
      setError("Passwords do not match!");
      return;
    }

    if (isLogin) {
      console.log('Login:', { email, password });
      setSuccess("Logged in successfully!");
    } else {
      console.log('Signup:', { name, email, password });
      setSuccess("Account created successfully!");
    }
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-md space-y-5 border border-slate-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-slate-800">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-sm text-center text-slate-500">
          {isLogin ? 'Sign in to access your e-commerce profile' : 'Join Prokart today and start shopping'}
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-semibold p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 text-emerald-600 text-xs font-semibold p-3 rounded-lg border border-emerald-100">
            {success}
          </div>
        )}

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-medium"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-medium"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-medium"
          required
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-medium"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3.5 rounded-xl hover:bg-blue-800 active:bg-blue-900 transition font-bold text-sm tracking-wide shadow-md hover:shadow-lg cursor-pointer"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-sm text-center text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;