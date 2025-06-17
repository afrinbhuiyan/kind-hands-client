import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 rounded-full opacity-10"
        animate={{
          background: theme === 'light' 
            ? 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' 
            : 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.button
        onClick={toggleTheme}
        aria-label={`Toggle ${theme === "light" ? "dark" : "light"} mode`}
        className="relative w-16 h-8 rounded-full focus:outline-none overflow-hidden"
        whileTap={{ scale: 0.95 }}
        style={{
          background: theme === 'light' 
            ? 'linear-gradient(145deg, #f5f5f5, #e0e0e0)' 
            : 'linear-gradient(145deg, #1e293b, #0f172a)',
        }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-between px-2"
          initial={false}
          animate={{
            opacity: theme === 'light' ? 1 : 0.7
          }}
        >
          <FiSun className="text-[#fff491] text-sm" />
          <FiMoon className="text-[#32728f] text-sm" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 w-6 h-6 rounded-full -translate-y-1/2 flex items-center justify-center"
          animate={{
            x: theme === 'light' ? 4 : 36,
            background: theme === 'light' 
              ? 'radial-gradient(circle, #fef3c7, #f59e0b)' 
              : 'radial-gradient(circle, #e0e7ff, #3b82f6)',
            boxShadow: theme === 'light' 
              ? '0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.5)' 
              : '0 0 10px #3b82f6, 0 0 20px rgba(59, 130, 246, 0.5)'
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 20 
          }}
        >
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="sun-details"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute w-full h-full rounded-full"
              >
                {/* Sun rays */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`ray-${i}`}
                    className="absolute bg-yellow-400"
                    style={{
                      width: '2px',
                      height: '6px',
                      left: '50%',
                      top: '50%',
                      originX: '50%',
                      originY: '0%',
                      rotate: i * 45,
                      translateX: '-50%',
                      translateY: '-70%'
                    }}
                    animate={{
                      height: [6, 8, 6],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'reverse',
                      duration: 1.5,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="moon-details"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                className="absolute w-3 h-3 rounded-full bg-gray-100"
                style={{
                  right: '20%',
                  top: '20%'
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {theme === 'dark' && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute bg-blue-100 rounded-full"
                  style={{
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    left: `${Math.random() * 60 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0.5, 1],
                    scale: [0, 1.2, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: Math.random() * 3
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: theme === 'light' 
            ? 'inset 0 0 20px rgba(245, 158, 11, 0.1)' 
            : 'inset 0 0 20px rgba(59, 130, 246, 0.1)'
        }}
      />
    </div>
  );
};

export default ThemeToggle;