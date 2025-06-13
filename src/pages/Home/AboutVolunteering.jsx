import React from "react";
import { FaHandsHelping, FaHeart, FaUsers, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import CountUp from "react-countup";
console.log(motion);

const AboutVolunteering = () => {
  const stats = [
    {
      number: "10K+",
      label: "Volunteers",
      icon: <FaUsers className="text-3xl" />,
    },
    {
      number: "200+",
      label: "Projects",
      icon: <FaHandsHelping className="text-3xl" />,
    },
    {
      number: "50+",
      label: "Communities",
      icon: <FaHeart className="text-3xl" />,
    },
    {
      number: "95%",
      label: "Satisfaction",
      icon: <FaChartLine className="text-3xl" />,
    },
  ];

  const benefits = [
    {
      title: "Make a Difference",
      description:
        "Your time and skills can create meaningful change in people's lives and communities.",
      icon: "🌍",
    },
    {
      title: "Build Connections",
      description:
        "Meet like-minded individuals and expand your professional and personal network.",
      icon: "🤝",
    },
    {
      title: "Gain Experience",
      description:
        "Develop new skills and enhance your resume with valuable hands-on experience.",
      icon: "📚",
    },
    {
      title: "Personal Growth",
      description:
        "Challenge yourself, gain perspective, and discover hidden talents.",
      icon: "🧠",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32  dark:from-gray-900 dark:to-gray-800">
        {/* Floating particles background */}
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
            className="text-5xl md:text-5xl font-light mb-6 text-gray-900 dark:text-white"
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
      <motion.div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="perspective-1000 group"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full transition-all duration-500 transform-style-preserve-3d group-hover:rotate-y-180 py-24">
                {/* Front Face */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f0f9ff] dark:from-gray-800 dark:to-gray-900 p-8 flex flex-col items-center justify-center rounded-xl shadow-lg border border-[#02316620] dark:border-gray-700">
                  {/* Floating icon with glow effect */}
                  <div className="relative">
                    <div className="text-white bg-gradient-to-br from-[#023166] to-[#18c9ff] text-3xl p-5 rounded-full shadow-lg shadow-[#18c9ff40] absolute -top-16 left-1/2 transform -translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    {/* Subtle glow */}
                    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#18c9ff30] blur-md group-hover:opacity-80 opacity-0 transition-opacity duration-300"></div>
                  </div>

                  {/* Animated number */}
                  <motion.h3
                    className="text-4xl font-bold text-[#023166] dark:text-white mt-8 mb-2"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <CountUp
                      end={parseInt(stat.number)}
                      duration={3}
                      delay={0.5}
                      suffix={stat.number.includes("%") ? "" : "+"}
                    />
                  </motion.h3>

                  {/* Decorative elements */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#18c9ff] to-transparent opacity-70"></div>
                  <div className="absolute top-4 right-4 opacity-10 text-[#023166] dark:text-[#18c9ff] text-6xl font-bold">
                    +
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#023166] to-[#074c61] dark:from-[#18c9ff] dark:to-[#0066ff] p-8 rounded-xl shadow-xl flex items-center justify-center transform rotate-y-180">
                  <div className="text-center relative z-10">
                    <p className="text-white text-lg font-medium mb-2">
                      {stat.label}
                    </p>
                    <div className="w-12 h-1 bg-white/50 mx-auto my-3 rounded-full"></div>
                    <div className="text-white/80 text-sm">
                      Volunteer since {2020 + index}
                    </div>
                  </div>

                  {/* Watermark icon */}
                  <div className="absolute bottom-4 right-4 text-white/10 text-7xl">
                    {stat.icon}
                  </div>

                  {/* Animated circles decoration */}
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full border-2 border-white/10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits Section */}
      {/* Benefits Section */}
      <div className="container mx-auto px-6 pt-16">
        <motion.h2
          className="text-4xl font-serif font-medium text-center text-gray-900 dark:text-white mb-16 px-8 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="relative inline-block px-6 py-2">
            <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#074c61] dark:border-[#6bd3f3] transition-all duration-500 group-hover:w-10 group-hover:h-10"></span>
            <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#074c61] dark:border-[#6bd3f3] transition-all duration-500 group-hover:w-10 group-hover:h-10"></span>
            Why Volunteer With Us?
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={`benefit-${index}`}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            >
              {/* Gradient border animation */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-[#18c9ff] to-transparent dark:via-[#6bd3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-0.5" />

              {/* Main card */}
              <div className="relative z-10 h-full p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Animated background element */}
                <motion.div
                  className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#074c6110] dark:bg-[#6bd3f310]"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                />

                <div className="relative z-20">
                  {/* Icon with pulse animation */}
                  <motion.div
                    className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-[#074c6110] dark:bg-[#6bd3f320] text-[#074c61] dark:text-[#6bd3f3] text-2xl transition-colors group-hover:scale-110"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {benefit.icon}
                  </motion.div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Subtle "learn more" indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-px bg-[#074c61] dark:bg-[#6bd3f3] inline-block mr-2 transition-all group-hover:w-8" />
                    <span className="text-xs text-[#074c61] dark:text-[#6bd3f3] font-medium">
                      Learn more
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      {/* CTA Section */}
      <motion.div
        className="relative overflow-hidden py-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Animated background elements */}
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
              <span className="relative z-10">Become a Volunteer</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#18c9ff] to-[#074c61] dark:from-[#0066ff] dark:to-[#6bd3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              className="relative px-8 py-4 bg-white dark:bg-gray-800 text-[#074c61] dark:text-[#6bd3f3] font-bold rounded-full border border-[#074c61] dark:border-[#6bd3f3] overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Learn More</span>
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
