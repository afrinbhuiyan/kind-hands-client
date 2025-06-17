import React from "react";
import { motion } from "framer-motion";
import { FaHandsHelping, FaHeart, FaSeedling } from "react-icons/fa";
import { FaLink, FaRocket, FaBullhorn } from "react-icons/fa";
import StatCard from "./Home/StatCard";
import useDynamicTitle from "../hooks/useDynamicTitle";

const About = () => {
    useDynamicTitle("About")
  const values = [
    {
      icon: <FaHeart />,
      title: "Empathy First",
      description:
        "We listen deeply and act with compassion in all our relationships",
    },
    {
      icon: <FaSeedling />,
      title: "Sustainable Impact",
      description: "We design solutions that create lasting, meaningful change",
    },
    {
      icon: <FaHandsHelping />,
      title: "Community Power",
      description:
        "We believe real transformation happens through collective action",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 bg-gradient-to-r from-[#024870] to-[#6bd3f3] text-white text-center"
      >
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Empowering communities through collective action and shared purpose
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900"></div>
      </motion.section>

      <section className="py-20 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Why We Exist
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              In a world facing complex challenges, we saw the need for a
              platform that connects people who want to help with organizations
              that need support. What began as a simple idea has grown into a
              movement.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We believe everyone has something valuable to contribute, and by
              working together, we can create meaningful change in our
              communities.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="w-full h-64 flex items-center justify-center text-gray-400">
                <span className="text-lg">Our mission in action</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <StatCard />

      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 relative inline-block">
            <span className="relative z-10">
              Our Core Values
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-0 left-0 w-full h-2 bg-[#6bd3f3] dark:bg-[#024870] z-0 opacity-30"
                style={{ originX: 0 }}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The foundation of everything we stand for
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="relative group"
            >
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#6bd3f3]/10 dark:bg-[#024870]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Value card */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 relative z-10 h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#024870] to-[#6bd3f3] flex items-center justify-center mx-auto mb-6 shadow-md"
                >
                  <div className="text-white text-2xl">{value.icon}</div>
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                  {value.title}
                </h3>

                <div className="relative">
                  <p className="text-gray-600 dark:text-gray-300 text-center relative z-10">
                    {value.description}
                  </p>
                  <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-[#6bd3f3]/20 dark:bg-[#024870]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-[#6bd3f3]/20 dark:bg-[#024870]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {index < values.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-12 w-12 h-1 bg-gradient-to-r from-[#6bd3f3] to-transparent" />
                )}
              </div>

              <div className="absolute -bottom-4 -left-4 w-3 h-3 rounded-full bg-[#6bd3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:hidden mt-12 h-1 bg-gradient-to-r from-transparent via-[#6bd3f3] to-transparent"
        />
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#6bd3f3] blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#024870] blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Our{" "}
              <span className="text-[#024870] dark:text-[#6bd3f3]">Impact</span>{" "}
              Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The ripple effect of our collective actions creates waves of
              change
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6bd3f3] to-transparent"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: 1,
                  title: "Connect",
                  icon: <FaLink className="text-2xl" />,
                  description:
                    "We bridge the gap between passionate volunteers and meaningful causes through intelligent matching",
                  color: "from-[#6bd3f3] to-[#024870]",
                },
                {
                  number: 2,
                  title: "Empower",
                  icon: <FaRocket className="text-2xl" />,
                  description:
                    "We equip our community with training, resources, and support to maximize their impact",
                  color: "from-[#024870] to-[#3b82f6]",
                },
                {
                  number: 3,
                  title: "Amplify",
                  icon: <FaBullhorn className="text-2xl" />,
                  description:
                    "We measure, celebrate and multiply the collective impact of every contribution",
                  color: "from-[#3b82f6] to-[#6bd3f3]",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 80,
                    damping: 10,
                  }}
                  className="relative group"
                >
                  <div
                    className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg z-10`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="flex items-center justify-center"
                    >
                      {step.icon}
                    </motion.div>
                  </div>

                  <div className="bg-white dark:bg-gray-700 p-8 pt-16 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#024870] to-[#6bd3f3] mb-4 opacity-20">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#6bd3f3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="absolute -bottom-3 -right-3 w-3 h-3 rounded-full bg-[#6bd3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:hidden h-1 w-full my-12 bg-gradient-to-b from-transparent via-[#6bd3f3] to-transparent"
          />
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-white blur-3xl"
          />
        </div>

        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#6bd3f3]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Ready to{" "}
              <span className="text-white underline decoration-[#6bd3f3] decoration-wavy">
                Make Your Mark
              </span>
              ?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90"
            >
              Join <span className="font-semibold">4,782</span> volunteers
              already creating change in their communities
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-[#024870] rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Start Volunteering Today
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.button>

              <motion.button
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(5px)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-white/50 text-white rounded-xl font-bold text-lg hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Explore Opportunities
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/150?img=${i}`}
                      alt="Volunteer"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span>Trusted by volunteers</span>
              </div>

              <div className="h-4 w-px bg-white/30"></div>

              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Verified organizations</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/4 left-10 w-8 h-8 rounded-full bg-white"
        />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.2 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-1/3 right-16 w-12 h-12 rounded-full bg-white"
        />
      </section>
    </div>
  );
};

export default About;
