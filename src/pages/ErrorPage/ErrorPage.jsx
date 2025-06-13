import React from "react";
import { motion } from "framer-motion";
console.log(motion)
import { Link } from "react-router-dom";
import { FiHome, FiRefreshCw } from "react-icons/fi";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/error.json";
import cloudAnimation from "../../assets/cloudAnimation.json";

const ErrorPage = () => {
  // Cloud component with realistic parameters
  const Cloud = ({ size, opacity, speed, initialX, initialY, delay }) => {
    const width = size;
    const height = size * 0.5;

    return (
      <motion.div
        className="absolute bg-white rounded-full"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          opacity,
          filter: "blur(12px)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
        }}
        initial={{ x: initialX, y: initialY }}
        animate={{
          x: [initialX, initialX + 50, initialX],
          y: [initialY, initialY + 10, initialY],
        }}
        transition={{
          duration: 20 + speed,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
    );
  };

  // Cloud configuration array
  const clouds = [
    {
      size: 200,
      opacity: 0.9,
      speed: 5,
      initialX: 100,
      initialY: 100,
      delay: 0,
    },
    {
      size: 300,
      opacity: 0.7,
      speed: 3,
      initialX: 600,
      initialY: 180,
      delay: 2,
    },
    {
      size: 180,
      opacity: 0.8,
      speed: 4,
      initialX: 300,
      initialY: 240,
      delay: 1,
    },
    {
      size: 250,
      opacity: 0.6,
      speed: 6,
      initialX: 700,
      initialY: 80,
      delay: 3,
    },
    {
      size: 220,
      opacity: 0.5,
      speed: 7,
      initialX: 200,
      initialY: 200,
      delay: 4,
    },
    {
      size: 400,
      opacity: 0.4,
      speed: 10,
      initialX: 400,
      initialY: 50,
      delay: 5,
    },
    {
      size: 350,
      opacity: 0.3,
      speed: 12,
      initialX: 800,
      initialY: 120,
      delay: 6,
    },
  ];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500 via-sky-300 to-blue-100 z-0" />

      <motion.div
        className="absolute top-1/4 right-1/4 w-40 h-40 bg-yellow-100 rounded-full opacity-20 z-0"
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      <div className="absolute inset-0 z-0">
        {clouds.map((cloud, idx) => (
          <Cloud key={idx} {...cloud} />
        ))}

        <div className="absolute inset-0 pointer-events-none z-0">
          <Lottie animationData={cloudAnimation} loop={true} />
        </div>
      </div>
      <motion.div
        className="max-w-md w-full relative z-20 bg-[#ffffffbb] backdrop-blur-md rounded-2xl shadow-xl border border-white/20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div
          className="w-full max-w-sm mx-auto pt-8 px-4"
          aria-label="Error animation"
        >
          <Lottie animationData={errorAnimation} loop={true} />
        </div>

        <div className="px-8 pb-8 text-center">
          <motion.h1
            className="text-2xl font-semibold text-gray-800 mb-3 uppercase"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Oops! Page Lost in the Clouds
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Looks like the page you're looking for took off into the sky. Let's
            guide you back to solid ground.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link to="/" className="flex-1">
              <motion.button
                className="relative w-full px-6 py-3 font-medium text-white rounded-lg overflow-hidden group focus:outline-none"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#024870] transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full transition-all duration-500" />
                <span className="relative flex items-center justify-center gap-2 transition-transform duration-200 group-hover:translate-x-1">
                  <FiHome />
                  Navigate Home
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        animate={{
          background: [
            "radial-gradient(circle at 75% 30%, transparent 95%, rgba(255,255,255,0.05) 100%)",
            "radial-gradient(circle at 25% 70%, transparent 95%, rgba(255,255,255,0.05) 100%)",
            "radial-gradient(circle at 75% 30%, transparent 95%, rgba(255,255,255,0.05) 100%)",
          ],
        }}
        transition={{ duration: 60, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ErrorPage;
