import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaSpinner, FaGoogle, FaGithub } from "react-icons/fa";
import registerAnimation from "../assets/register.json";
import { updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useDynamicTitle from "../hooks/useDynamicTitle";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { createUser } = useAuth();

  useDynamicTitle("Register page")

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push("at least 6 characters");
    if (!/[A-Z]/.test(password)) errors.push("an uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("a lowercase letter");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const form = e.target;
    const { name, email, photoURL, password } = Object.fromEntries(
      new FormData(form).entries()
    );

    if (name.trim() === "") {
      toast.error("Please enter your name!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (email.trim() === "") {
      toast.error("Please enter a valid email!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (photoURL.trim() === "") {
      toast.error("Please provide a Photo URL!", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      const errorMessage = `Password must contain ${passwordErrors.join(", ")}`;
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
      setErrors({ password: errorMessage });
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUser(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });

      Swal.fire({
        title: "Welcome!",
        text: "Your account has been created.",
        icon: "success",
        confirmButtonText: "Continue",
        background: "#FFF9E6",
        confirmButtonColor: "#F59E0B",
      });

      navigate("/");
    } catch (error) {
      setErrors({ general: error.message });
      Swal.fire({
        title: "Registration Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
        background: "#FFF9E6",
        confirmButtonColor: "#F59E0B",
      });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col justify-center pb-12 sm:px-6 lg:px-8 items-start">
      <ToastContainer />
      <div className="text-start container mx-auto lg:pl-10">
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
            to="/register"
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
                Register
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
          Create Account
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3, ease: "easeIn" }}
          className="mt-3 text-sm text-gray-600 dark:text-gray-400"
        >
          Sign up to get started
        </motion.p>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row-reverse gap-12 px-4 justify-center items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden flex-1 lg:block"
        >
          <Lottie
            animationData={registerAnimation}
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
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <motion.div variants={itemVariants}>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="peer block w-full py-3 bg-transparent border-b border-[#0b50a0] focus:border-blue-400 placeholder-[#032d5e] focus:outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="peer block w-full py-3 bg-transparent border-b border-[#0b50a0] focus:border-blue-400 placeholder-[#032d5e] focus:outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                name="photoURL"
                type="text"
                placeholder="Photo URL"
                className="peer block w-full py-3 bg-transparent border-b border-[#0b50a0] focus:border-blue-400 placeholder-[#032d5e] focus:outline-none"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="peer block w-full py-3 bg-transparent border-b border-[#0b50a0] focus:border-blue-400 placeholder-[#032d5e] focus:outline-none"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className={`relative px-10 py-3 font-medium text-white overflow-hidden group rounded-sm w-full ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#024870] opacity-100 group-hover:opacity-0 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full transition-all duration-500" />
                <span className="relative flex items-center justify-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin h-5 w-5 text-white" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <HiArrowNarrowRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                      Register
                    </>
                  )}
                </span>
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center text-sm text-[#024870]"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#023655] hover:underline"
              >
                Login
              </Link>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-8 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-400 opacity-30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-[#e1ebf8] text-[#0b50a0] font-medium">
                  Continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-6 justify-center">
              <button className="flex items-center justify-center py-3 px-4 rounded-sm bg-[#ff0909] bg-opacity-10 text-white hover:bg-opacity-20 transition-all">
                <FaGoogle className="h-6 w-6" />
              </button>
              <button className="flex items-center justify-center py-3 px-4 rounded-sm bg-blue-950 bg-opacity-10 border border-blue-300 text-white hover:bg-opacity-20 transition-all">
                <FaGithub className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
