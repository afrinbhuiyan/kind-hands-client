import React, { useRef } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaHandsHelping,
  FaLeaf,
} from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { IoMdMail, IoMdCall, IoMdTime, IoMdPin } from "react-icons/io";
import { motion } from "framer-motion";
import SubscribeButton from "./SubscribeButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const socialIconVariants = {
  hover: {
    y: -5,
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};

const Footer = () => {
  const emailRef = useRef(); 

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[#024870] text-white pt-12 pb-6"
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* About Section */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
              >
                <img className="w-10 mr-2" src="public/logo.png" alt="" />
              </motion.div>
              <h3 className="text-2xl font-bold">
                KIND<span className="text-[#6bd3f3]">HANDS</span>
              </h3>
            </div>
            <p className="mb-4 text-gray-300">
              Connecting volunteers with meaningful opportunities to make a
              difference in our communities.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook className="w-5 h-5" />, key: "facebook" },
                {
                  icon: <RiWhatsappFill className="w-5 h-5" />,
                  key: "whatsapp",
                },
                { icon: <FaInstagram className="w-5 h-5" />, key: "instagram" },
                { icon: <FaLinkedin className="w-5 h-5" />, key: "linkedin" },
              ].map((social) => (
                <motion.a
                  key={social.key}
                  href="#"
                  className="text-gray-300 hover:text-[#6bd3f3] transition-colors"
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#6bd3f3] pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "Home",
                "About Us",
                "Opportunities",
                "Success Stories",
                "Contact Us",
              ].map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href="#"
                    className="relative text-gray-300 hover:text-[#6bd3f3] transition-colors inline-block pb-1"
                  >
                    {link}
                    <motion.span
                      className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#6bd3f3]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#6bd3f3] pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-start"
                whileHover={{ scale: 1.02 }}
              >
                <IoMdPin className="text-[#6bd3f3] mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Helping Street, Kindness City, 10001
                </span>
              </motion.li>
              <motion.li
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <IoMdCall className="text-[#6bd3f3] mr-2" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-[#6bd3f3] transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </motion.li>
              <motion.li
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <IoMdMail className="text-[#6bd3f3] mr-2" />
                <a
                  href="mailto:info@kindhands.org"
                  className="text-gray-300 hover:text-[#6bd3f3] transition-colors"
                >
                  info@kindhands.org
                </a>
              </motion.li>
              <motion.li
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
              >
                <IoMdTime className="text-[#6bd3f3] mr-2" />
                <span className="text-gray-300">Mon-Fri: 9AM - 6PM</span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-[#6bd3f3] pb-2">
              Newsletter
            </h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest volunteer opportunities
              and news.
            </p>

            <form className="flex flex-col space-y-3">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.input
                  ref={emailRef}
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6bd3f3] border border-gray-300 placeholder:text-gray-300"
                  required
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(107, 211, 243, 0.3)",
                    borderColor: "#6bd3f3",
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              </motion.div>

              <SubscribeButton emailRef={emailRef} />
            </form>

            {/* Success message (hidden by default) */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-3 bg-green-100 text-green-700 rounded-lg">
                Thanks for subscribing!
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="border-t border-[#6bd3f3]/20 pt-6 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-4 md:mb-0">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <FaLeaf className="text-[#6bd3f3] mr-2" />
            </motion.div>
            <span className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Kind Hands. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-4">
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-300 hover:text-[#6bd3f3] text-sm transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;