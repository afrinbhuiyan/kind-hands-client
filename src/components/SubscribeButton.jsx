import React from "react";
import { motion } from "framer-motion";
import { IoMdSend } from "react-icons/io";
import Swal from "sweetalert2";

const SubscribeButton = ({ emailRef }) => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && emailRegex.test(email)) {
      Swal.fire({
        title: "Subscribed!",
        text: `You've subscribed with: ${email}`,
        icon: "success",
        confirmButtonColor: "#6bd3f3",
        confirmButtonText: "Great!",
      }).then(() => {
        emailRef.current.value = "";
      });
    } else {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address",
        icon: "error",
        confirmButtonColor: "#ff6b6b",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <motion.button
      type="submit"
      className="relative overflow-hidden bg-[#6bd3f3] hover:bg-[#4ac1e8] text-[#024870] font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{
        scale: 0.98,
        backgroundColor: "#3ab6e0",
      }}
      onClick={handleSubscribe}
    >
      <motion.span 
        className="relative z-10 flex items-center"
        initial={{ x: 0 }}
        whileHover={{ x: -2 }}
      >
        Subscribe
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >
          <IoMdSend className="w-5 h-5 ml-2" />
        </motion.span>
      </motion.span>
      
      <motion.span
        className="absolute inset-0 bg-[#8adcf7] z-0"
        initial={{ y: "100%" }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default SubscribeButton;