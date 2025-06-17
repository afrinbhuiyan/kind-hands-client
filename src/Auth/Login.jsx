import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import loginAnimation from "../assets/login.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { IoCheckmark, IoKeyOutline } from "react-icons/io5";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useDynamicTitle from "../hooks/useDynamicTitle";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signInUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  useDynamicTitle("Login Page")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const { email, password } = Object.fromEntries(
      new FormData(form).entries()
    );
    try {
      await signInUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong",
      });
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back with Google!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: error.message || "Something went wrong",
      });
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center pb-12 sm:px-6 lg:px-8 items-start">
      <div className="text-start container mx-auto pl-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="mt-6 flex gap-8"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative py-1.5 px-1 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-cyan-500 dark:text-cyan-400 font-semibold"
                  : "text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Home
                {isActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 dark:bg-cyan-400 rounded-full"
                    layoutId="navUnderline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `relative py-1.5 px-1 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-cyan-500 dark:text-cyan-400 font-semibold"
                  : "text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                Login
                {isActive && (
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 dark:bg-cyan-400 rounded-full"
                    layoutId="navUnderline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </motion.div>
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-8 text-3xl font-bold dark:text-gray-100 lg:text-4xl uppercase text-cyan-950"
        >
          Welcome Back!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3, ease: "easeIn" }}
          className="mt-3 text-sm text-gray-600 dark:text-gray-400"
        >
          Sign in to access your account
        </motion.p>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row-reverse gap-12 px-4 lg:justify-center lg:items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden flex-1 lg:block"
        >
          <Lottie
            animationData={loginAnimation}
            className="w-full"
            loop={true}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 py-10 px-8 backdrop-blur-lg bg-opacity-90"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#0470a3] rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#02a3d4] rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>

          <motion.form
            variants={containerVariants}
            className="space-y-8 relative z-10"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <motion.div variants={itemVariants} className="group">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="peer block w-full py-3 bg-transparent border-b border-[#0b50a0] focus:border-blue-400 placeholder-[#032d5e] focus:outline-none"
                placeholder="Enter email"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="group">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="peer block w-full py-3 bg-transparent border-b border-[#0b50a0] focus:border-blue-400 placeholder-[#032d5e] focus:outline-none"
                placeholder="Enter password"
              />
            </motion.div>

            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

            {/* Remember + Forgot */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between pt-4 pb-3"
            >
              <label className="flex items-center group cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative flex items-center"
                >
                  <input
                    type="checkbox"
                    className="peer absolute opacity-0 h-0 w-0"
                  />
                  <div className="mr-3 h-6 w-6 rounded-lg border-2 border-cyan-400/80 bg-[#0b50a0] group-hover:border-cyan-300 transition-all duration-300 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 peer-focus:ring-2 peer-focus:ring-cyan-400/30 peer-focus:ring-offset-none flex items-center justify-center overflow-hidden">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                    >
                      <IoCheckmark size={16} />
                    </motion.div>
                  </div>
                </motion.div>
                <span className="text-[#0b50a0] text-sm font-medium transition-colors flex items-center">
                  Remember this device
                </span>
              </label>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <Link
                  to="/forgot-password"
                  className="group text-[#0b50a0] hover:text-[#0b50a0] text-sm font-medium transition-colors relative flex items-center"
                >
                  <motion.div whileHover={{ rotate: 15 }}>
                    <IoKeyOutline className="mr-2" size={16} />
                  </motion.div>
                  Forgot password?
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0b50a0] rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Submit button */}

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className={`relative px-10 py-3 font-medium text-white overflow-hidden group rounded-sm w-full ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {/* Base background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#024870] opacity-100 group-hover:opacity-0 transition-all duration-300" />

                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full transition-all duration-500" />

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin h-5 w-5 text-white" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <HiArrowNarrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                      Login
                    </>
                  )}
                </span>
              </button>
            </motion.div>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="mt-6 text-center text-sm text-[#024870]"
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#023655] hover:underline"
            >
              Sign up
            </Link>
          </motion.div>

          {/* Divider and social buttons */}
          <motion.div
            variants={containerVariants}
            className="mt-8 relative z-10"
          >
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-400 opacity-30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#e1ebf8] text-[#0b50a0] font-medium">
                  Continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex gap-6 justify-center"
            >
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center py-3 px-4 rounded-sm bg-[#ff0909] bg-opacity-10 text-white hover:bg-opacity-20 transition-all cursor-pointer"
              >
                <FaGoogle className="h-6 w-6" />
              </button>

              <button className="flex items-center justify-center py-3 px-4 rounded-sm bg-blue-950 bg-opacity-10 border border-blue-300 text-white hover:bg-opacity-20 transition-all cursor-pointer">
                <FaGithub className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
