import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown, IoMdLogOut } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import navLogo from "../assets/navLogo.png";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { MdClose, MdMenu } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useIsActivePath from "../hooks/useIsActivePath";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: { opacity: 0, y: -10 },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout()
      .then(() => toast.success("You've been logged out successfully"))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-dropdown")) {
        setIsProfileOpen(false);
      }
      if (isMenuOpen && !event.target.closest(".mobile-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen, isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const isIPad =
    /iPad|Macintosh/i.test(navigator.userAgent) && "ontouchend" in document;
  const shouldShowMobileMenu = windowSize.width < 1024 || isIPad;

  const isProfileActive = useIsActivePath(["/add-volunteer", "/my-posts"]);

  return (
    <header className="sticky top-0 z-50">
      <ToastContainer/>
      <nav
        className={`bg-white dark:bg-gray-900 transition-all duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link
              to="/"
              className="flex items-center group flex-shrink-0"
              onClick={closeMenu}
            >
              <img
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-2 transition-transform group-hover:scale-105"
                src={navLogo}
                alt="Kind Hands Logo"
              />
              <p className="text-xl sm:text-2xl font-bold text-[#024870] dark:text-white tracking-tight">
                KIND
                <span className="font-normal ml-1 text-[#6bd3f3]">HANDS</span>
              </p>
            </Link>

            {!shouldShowMobileMenu && (
              <div className="hidden lg:flex items-center space-x-1 ml-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 flex items-center text-sm font-medium rounded-md transition-all ${
                      isActive
                        ? "text-[#024870] dark:text-white font-semibold bg-[#6bd3f3]/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-white hover:bg-[#6bd3f3]/10"
                    }`
                  }
                  onClick={closeMenu}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/volunteers"
                  className={({ isActive }) =>
                    `px-3 py-2 flex items-center text-sm font-medium rounded-md transition-all ${
                      isActive
                        ? "text-[#024870] dark:text-white font-semibold bg-[#6bd3f3]/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-white hover:bg-[#6bd3f3]/10"
                    }`
                  }
                  onClick={closeMenu}
                >
                  Opportunities
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `px-3 py-2 flex items-center text-sm font-medium rounded-md transition-all ${
                      isActive
                        ? "text-[#024870] dark:text-white font-semibold bg-[#6bd3f3]/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-white hover:bg-[#6bd3f3]/10"
                    }`
                  }
                  onClick={closeMenu}
                >
                  About
                </NavLink>

                <NavLink
                  to="/resources"
                  className={({ isActive }) =>
                    `px-3 py-2 flex items-center text-sm font-medium rounded-md transition-all ${
                      isActive
                        ? "text-[#024870] dark:text-white font-semibold bg-[#6bd3f3]/10"
                        : "text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-white hover:bg-[#6bd3f3]/10"
                    }`
                  }
                  onClick={closeMenu}
                >
                  Resources
                </NavLink>

                {user && (
                  <>
                    <div className="dropdown dropdown-hover dropdown-end">
                      <div tabIndex={0} role="button" className="m-1">
                        <div
                          className={`px-3 py-2 flex items-center text-sm font-medium rounded-md transition-all gap-2 ${
                            isProfileActive
                              ? "text-[#024870] dark:text-white font-semibold bg-[#6bd3f3]/10"
                              : "text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-white hover:bg-[#6bd3f3]/10"
                          }`}
                        >
                          My Profile
                          <IoIosArrowDown className="text-xs transition-transform duration-200" />
                        </div>
                      </div>

                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52 border border-gray-200 dark:border-gray-700"
                      >
                        <li>
                          <NavLink
                            to="/add-volunteer"
                            className={({ isActive }) =>
                              `px-3 py-2 text-sm rounded-md transition-all ${
                                isActive
                                  ? "text-[#024870] dark:text-white font-semibold bg-[#6bd3f3]/10"
                                  : "text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-white hover:bg-[#6bd3f3]/10"
                              }`
                            }
                            onClick={closeMenu}
                          >
                            Add Volunteer
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/my-posts"
                            className={({ isActive }) =>
                              `px-3 py-2 text-sm rounded-md transition-all ${
                                isActive
                                  ? "text-[#024870] dark:text-white font-semibold bg-[#6bd3f3]/10"
                                  : "text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-white hover:bg-[#6bd3f3]/10"
                              }`
                            }
                            onClick={closeMenu}
                          >
                            Manage My Posts
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <ThemeToggle className="hidden xs:block" />

              <div className="hidden sm:block">
                <SearchBar />
              </div>

              {user ? (
                <div
                  className="relative profile-dropdown"
                  onMouseEnter={() => {
                    setIsProfileOpen(true);
                  }}
                  onMouseLeave={() => {
                    setIsProfileOpen(false);
                  }}
                >
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center focus:outline-none"
                    aria-label="User profile"
                  >
                    {user.photoURL ? (
                      <motion.img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#6bd3f3] object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FaUserCircle className="text-[#024870] dark:text-white text-xl sm:text-2xl hover:text-[#6bd3f3] transition-colors" />
                      </motion.div>
                    )}
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={dropdownVariants}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700"
                      >
                        <div className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user.displayName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaUserCircle className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                            Profile
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FiSettings className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                            Settings
                          </Link>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsProfileOpen(false);
                            }}
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white transition-colors"
                          >
                            <IoMdLogOut className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link to="/login" className="hidden lg:block">
                  <button className="relative px-10 py-2 font-medium text-white overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#024870] opacity-100 group-hover:opacity-0 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full transition-all duration-500"></div>
                    <span className="relative flex items-center justify-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      Login
                    </span>
                  </button>
                </Link>
              )}

              {shouldShowMobileMenu && (
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-[#024870] dark:hover:text-[#6bd3f3] focus:outline-none transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <MdClose className="h-6 w-6" />
                  ) : (
                    <MdMenu className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {shouldShowMobileMenu && isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg mobile-menu">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {windowSize.width < 640 && (
                <div className="px-2 pb-2">
                  <SearchBar />
                </div>
              )}

              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/volunteers"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                  }`
                }
              >
                Opportunities
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                  }`
                }
              >
                About
              </NavLink>

              <NavLink
                to="/resources"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                  }`
                }
              >
                Resources
              </NavLink>

              <NavLink
                to="/faq"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                  }`
                }
              >
                FAQ
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                  }`
                }
              >
                Contact
              </NavLink>

              {user && (
                <>
                  <NavLink
                    to="/add-volunteer"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                        isActive
                          ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                          : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                      }`
                    }
                  >
                    Add Volunteer
                  </NavLink>
                  <NavLink
                    to="/add-volunteer-need-post"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                        isActive
                          ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                          : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                      }`
                    }
                  >
                    Add Volunteer need Post
                  </NavLink>
                  <NavLink
                    to="/manage-my-posts"
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium transition-colors flex items-center ${
                        isActive
                          ? "bg-[#6bd3f3]/10 text-[#024870] dark:text-white font-semibold"
                          : "text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white"
                      }`
                    }
                  >
                    Manage My Posts
                  </NavLink>
                </>
              )}

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white transition-colors flex items-center"
                    >
                      <FaUserCircle className="mr-3" /> Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={closeMenu}
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white transition-colors flex items-center"
                    >
                      <FiSettings className="mr-3" /> Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-[#6bd3f3]/10 hover:text-[#024870] dark:hover:text-white transition-colors flex items-center"
                    >
                      <IoMdLogOut className="mr-3" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block px-3 py-3 rounded-md text-base font-medium text-center text-white bg-gradient-to-r from-[#024870] to-[#6bd3f3] hover:from-[#01314d] hover:to-[#4ac1e8] transition-colors"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
