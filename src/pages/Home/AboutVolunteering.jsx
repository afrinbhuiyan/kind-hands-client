import React from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import BenefitCard from "./BenefitCard";
import TestimonialsSection from "./TestimonialsSection";
import { Link } from "react-router-dom";

const AboutVolunteering = () => {
  return (
    <section className=" bg-white dark:bg-gray-900">
      <div className="relative overflow-hidden pt-24  dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#074c61] dark:bg-[#6bd3f3]"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-5xl font-light text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="">Volunteer </span>
            <span className="roboto text-transparent bg-clip-text bg-gradient-to-r from-[#074c61] to-[#18c9ff] dark:from-[#6bd3f3] dark:to-[#0066ff]">
              With Purpose
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Your time creates
            <span className="text-[#074c61] dark:text-[#6bd3f3]">
              ripples of change
            </span>
            that last generations.
          </motion.p>

          <motion.div
            className="relative w-48 h-1 mx-auto mb-12 overflow-hidden"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "12rem" }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#074c61] via-[#18c9ff] to-[#074c61] dark:from-[#6bd3f3] dark:via-white dark:to-[#6bd3f3]"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <StatCard />

      {/* Benefits Section */}
      <BenefitCard />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <motion.div
        className="relative overflow-hidden py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#074c61] dark:bg-[#6bd3f3]"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                opacity: 0.3,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 50],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl roboto  text-gray-900 dark:text-white mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Make a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#074c61] to-[#18c9ff] dark:from-[#6bd3f3] dark:to-[#0066ff]">
              Difference
            </span>
            ?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join our community of volunteers and start your journey today.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-[#074c61] to-[#18c9ff] dark:from-[#6bd3f3] dark:to-[#0066ff] text-white font-bold rounded-full overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                <Link to={"/volunteers"}>Become a Volunteer </Link>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#18c9ff] to-[#074c61] dark:from-[#0066ff] dark:to-[#6bd3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              className="relative px-8 py-4 bg-white dark:bg-gray-800 text-[#074c61] dark:text-[#6bd3f3] font-bold rounded-full border border-[#074c61] dark:border-[#6bd3f3] overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">
                <Link to={"/about"}>Learn More</Link>
              </span>
              <div className="absolute inset-0 bg-[#074c6110] dark:bg-[#6bd3f310] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-12 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Over 10,000 volunteers trust us worldwide
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutVolunteering;
