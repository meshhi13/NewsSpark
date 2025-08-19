import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/public/newsSparkIcon-modified.png"; // adjust path as needed
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
      {/* Hero Section */}
      <section className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-700 z-0"></div>

        {/* Text Content */}
        <div className="flex-1 relative z-10">
          <motion.img
            src={logo}
            alt="NewsSpark Logo"
            className="h-16 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            NewsSpark
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gray-300 mb-8 text-lg md:text-xl"
          >
            Truth in every headline. Explore unbiased news from multiple sources, all in one place.  Stay ahead of misinformation and see the full picture behind every story.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/signup"
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold text-white text-center transition-colors duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="px-6 py-3 border border-sky-600 hover:bg-sky-700 hover:text-white rounded-lg font-semibold text-sky-600 text-center transition-colors duration-300"
            >
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative z-10"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1664297878197-0f50d094db72?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Reading a newspaper"
            className="rounded-xl shadow-xl max-w-full h-auto"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why NewsSpark?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl hover:translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3">Unbiased Reporting</h3>
              <p className="text-gray-300">
                Aggregates news from multiple sources and highlights multiple perspectives, cutting through the bias.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl hover:translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
              <p className="text-gray-300">
                Stay informed with the latest headlines and breaking news delivered instantly.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl hover:translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-3">Custom Topics</h3>
              <p className="text-gray-300">
                Follow your interests—technology, politics, science, finance—and get news that matters to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-6 text-center text-gray-400 flex flex-col sm:flex-row justify-center items-center gap-4">
        <span>&copy; {new Date().getFullYear()} NewsSpark. All rights reserved.</span>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/himesh-ahuja" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
          <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/meshhi13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
          <FaGithub size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
