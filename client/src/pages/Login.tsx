import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-8 opacity-0 animate-fade-in">
            <img src="/logo.svg" alt="Flow Logo" className="h-8 mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold mb-2 opacity-0 animate-fade-in text-white" style={{ animationDelay: "0.1s" }}>
            Welcome Back
          </h1>
          <p className="text-gray-400 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Sign in to your Flow account
          </p>
        </div>

        <div className="glass-card p-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-black border border-dark-700 text-gray-200 rounded-full focus:ring-2 focus:ring-pulse-500 focus:border-pulse-500 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 bg-black border border-dark-700 text-gray-200 rounded-full focus:ring-2 focus:ring-pulse-500 focus:border-pulse-500 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded bg-black border-dark-700 text-pulse-500 focus:ring-pulse-500 mr-2" />
                <span className="text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-pulse-400 hover:text-pulse-300 transition-colors duration-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-pulse-500 text-white py-4 rounded-full font-medium transition-all duration-300 hover:bg-pulse-600 hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-pulse-400 hover:text-pulse-300 font-medium transition-colors duration-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


