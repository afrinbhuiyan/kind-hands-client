import React, { useState } from "react";
import { 
  FaHome, 
  FaHandsHelping, 
  FaClipboardList,
  FaUserCircle,
  FaCog,
  FaRocket
} from "react-icons/fa";
import { FiPlusCircle, FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const DashboardSidebar = () => {
  const [activeHover, setActiveHover] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const accentColor = "#6bd3f3";
  const darkColor = "#024870";

  const navItems = [
    { 
      path: "/dashboard", 
      name: "Mission Control", 
      icon: <FaRocket />,
      id: 1
    },
    { 
      path: "/dashboard/add-volunteer", 
      name: "Recruit Crew", 
      icon: <FiPlusCircle />,
      id: 2
    },
    { 
      path: "/dashboard/my-posts", 
      name: "Space Logs", 
      icon: <FaClipboardList />,
      id: 3
    },
    { 
      path: "/dashboard/my-requests", 
      name: "Transmissions", 
      icon: <FaHandsHelping />,
      id: 4
    },
    { 
      path: "/dashboard/profile", 
      name: "Crew Profile", 
      icon: <FaUserCircle />,
      id: 5
    },
    { 
      path: "/dashboard/settings", 
      name: "Ship Systems", 
      icon: <FaCog />,
      id: 6
    }
  ];

  return (
    <motion.div
      className={`h-screen bg-gradient-to-b from-[${darkColor}] to-[#012a43] flex flex-col 
      ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 ease-in-out
      border-r border-[${accentColor}]/30`}
      style={{ boxShadow: `0 0 15px ${accentColor}20` }}
    >
      {/* Header with Collapse Button */}
      <div className="p-4 flex justify-between items-center border-b border-[${accentColor}]/30 text-[#6bd3f3]">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-[${accentColor}] blur opacity-40 rounded-full"></div>
                <div className="relative bg-[${darkColor}] rounded-full p-2">
                  <FaRocket className="text-xl text-[${accentColor}]" />
                </div>
              </div>
              <motion.span 
                className="ml-3 text-xl font-bold text-[${accentColor}]"
              >
                KindHands
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-[${accentColor}]/20 text-[${accentColor}] transition-all"
        >
          {isCollapsed ? <FiMenu /> : <FiX />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto text-white">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end
            className={({ isActive }) => 
              `block relative overflow-hidden rounded-lg mx-2 ${
                isActive ? `bg-[${accentColor}]/30` : `hover:bg-[${accentColor}]/15`
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                className={`flex items-center p-3 ${
                  isCollapsed ? "justify-center" : ""
                }`}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setActiveHover(item.id)}
                onHoverEnd={() => setActiveHover(null)}
              >
                <div className={`p-2 rounded-lg ${
                  isActive 
                    ? `bg-[${accentColor}] text-white` 
                    : `text-[${accentColor}]`
                }`}>
                  {React.cloneElement(item.icon, { className: "text-lg" })}
                </div>
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="ml-3 text-[${accentColor}] font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-[${accentColor}] rounded-r-full"
                    layoutId="activeIndicator"
                  />
                )}

                {isCollapsed && activeHover === item.id && (
                  <motion.div
                    className="absolute left-full ml-2 px-3 py-2 bg-[${darkColor}] text-[${accentColor}] 
                    shadow-lg rounded-md whitespace-nowrap z-50 border border-[${accentColor}]/30"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {item.name}
                  </motion.div>
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[${accentColor}]/30 text-white">
        <div className="relative overflow-hidden rounded-lg p-3 text-center 
        bg-gradient-to-r from-[${darkColor}]/70 to-[${accentColor}]/20">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(${accentColor} 1px, transparent 1px)`,
            backgroundSize: '10px 10px'
          }}></div>
          <motion.div 
            className="relative z-10 text-[${accentColor}] text-sm text-white"
            whileHover={{ scale: 1.02 }}
          >
            {!isCollapsed ? (
              <>
                <div className="font-bold mb-1">Mission Status</div>
                <div className="h-1 w-full bg-[${accentColor}]/20 rounded-full overflow-hidden my-2">
                  <motion.div 
                    className="h-full bg-[${accentColor}] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
                <div>68% of goals achieved</div>
              </>
            ) : (
              <FaRocket className="mx-auto text-xl text-[${accentColor}]" />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardSidebar;