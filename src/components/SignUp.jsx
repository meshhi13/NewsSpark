import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Fake delay to simulate account creation
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (name && email && password) {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, password: password })
      };
      const response = await fetch("http://127.0.0.1:3100/account/signup", requestOptions);
      const data = await response.json();
      if (data.STATE == 0){
        await login({ email });
      }
      else if (data.STATE == 3) {
        setError("Account already exists")
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
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Sign Up</h1>
        <p className="text-center text-gray-500 mb-6">
          Create your NewsSpark account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm rounded-md p-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

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
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-sky-600 hover:underline">
            Sign in
          </a>
        </div>
      </motion.div>
    </div>
  );
}
