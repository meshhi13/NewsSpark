import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Fake delay to simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email && password) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password })
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/account/signin`,
        requestOptions
      );
      const data = await response.json();
      if (data.state == 0){
        await login({ email });
      }
      else if (data.state == 1) {
        setError("Wrong password")
      }
      else if (data.state == 2) {
        setError("Account does not exist, please create one")
      }
    } else {
      setError("Please fill in all fields.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Sign In</h1>
        <p className="text-center text-gray-500 mb-6">
          Access your NewsSpark account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm rounded-md p-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="true"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-sky-600 hover:underline">
            Sign up
          </a>
        </div>
      </motion.div>
    </div>
  );
}
