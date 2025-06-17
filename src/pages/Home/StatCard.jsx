import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { FaChartLine, FaHandsHelping, FaHeart, FaUsers } from "react-icons/fa";

const StatCard = () => {
  const stats = [
    {
      value: 10000,
      suffix: "+",
      label: "Volunteers",
      icon: <FaUsers className="text-3xl" />,
    },
    {
      value: 200,
      suffix: "+",
      label: "Projects",
      icon: <FaHandsHelping className="text-3xl" />,
    },
    {
      value: 50,
      suffix: "+",
      label: "Communities",
      icon: <FaHeart className="text-3xl" />,
    },
    {
      value: 95,
      suffix: "%",
      label: "Satisfaction",
      icon: <FaChartLine className="text-3xl" />,
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          return (
            <motion.div
              key={index}
              ref={ref}
              className="perspective-1000 group"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-full transition-all duration-500 transform-style-preserve-3d group-hover:rotate-y-180 py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-white to-[#f0f9ff] dark:from-gray-800 dark:to-gray-900 p-8 flex flex-col items-center justify-center rounded-xl shadow-lg border border-[#02316620] dark:border-gray-700">
                  <div className="relative">
                    <div className="text-white bg-gradient-to-br from-[#023166] to-[#18c9ff] text-3xl p-5 rounded-full shadow-lg shadow-[#18c9ff40] absolute -top-16 left-1/2 transform -translate-x-1/2 z-10 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#18c9ff30] blur-md group-hover:opacity-80 opacity-0 transition-opacity duration-300"></div>
                  </div>

                  <h3 className="text-4xl font-bold text-[#023166] dark:text-white mt-8 mb-2">
                    {isInView ? (
                      <CountUp
                        key={Date.now()}
                        end={stat.value}
                        duration={2}
                        suffix={stat.suffix}
                      />
                    ) : (
                      `${stat.value}${stat.suffix}`
                    )}
                  </h3>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#18c9ff] to-transparent opacity-70"></div>
                  <div className="absolute top-4 right-4 opacity-10 text-[#023166] dark:text-[#18c9ff] text-6xl font-bold">
                    +
                  </div>
                </div>

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

                  <div className="absolute bottom-4 right-4 text-white/10 text-7xl">
                    {stat.icon}
                  </div>

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
          );
        })}
      </div>
    </motion.div>
  );
};

export default StatCard;
