import React, { useState } from "react";
import { BiSolidBell, BiLogOut, BiCog, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import navLogo from "../../assets/navLogo.png";
import useAuth from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardNavbar = ({ onMenuClick, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "New volunteer opportunity posted", time: "2 mins ago", read: false },
    { id: 2, text: "Your post got 5 new applicants", time: "1 hour ago", read: false },
    { id: 3, text: "System maintenance scheduled", time: "3 hours ago", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const notificationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="sticky top-0 z-20">
      <div className="navbar bg-white dark:bg-gray-800 shadow-sm px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Mobile Menu Button */}
        <div className="flex-none md:hidden">
          <button 
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {sidebarOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Logo/Brand */}
        <div className="flex-1">
          <Link to="/" className="flex items-center group">
            <motion.img
              src={navLogo}
              alt="Kind Hands Logo"
              className="w-10 h-10 mr-3 transition-transform group-hover:scale-110"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block"
            >
              <p className="text-xl font-bold text-[#024870] dark:text-white tracking-tight">
                KIND<span className="text-[#6bd3f3]">HANDS</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Volunteer Dashboard</p>
            </motion.div>
          </Link>
        </div>

        {/* Navigation Icons */}
        <div className="flex-none flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            >
              <BiSolidBell className="text-xl text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={notificationVariants}
                  className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    <button className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 border-b border-gray-100 dark:border-gray-600 ${!notification.read ? 'bg-blue-50 dark:bg-gray-800' : ''}`}
                        >
                          <p className="text-sm text-gray-800 dark:text-gray-200">{notification.text}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                        No new notifications
                      </div>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600 text-center">
                    <Link 
                      to="/notifications" 
                      className="text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {user?.photoURL ? (
                <motion.img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full border-2 border-[#6bd3f3] object-cover"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#6bd3f3] flex items-center justify-center text-white">
                  {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <motion.div whileHover={{ x: 2 }}>
                <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.displayName || 'User'}
                </span>
              </motion.div>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={notificationVariants}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <BiUser className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                      Profile
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <BiCog className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                      Settings
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <BiLogOut className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;