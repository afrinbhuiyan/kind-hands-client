import React from "react";
import { motion } from "framer-motion";
console.log(motion);

const BenefitCard = () => {
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
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-[#18c9ff] to-transparent dark:via-[#6bd3f3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -m-0.5" />

            <div className="relative z-10 h-full p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 group-hover:shadow-lg transition-all duration-300 overflow-hidden">
              <motion.div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#23ccff1f] dark:bg-[#6bd3f310]"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              />

              <div className="relative z-20">
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
  );
};

export default BenefitCard;
