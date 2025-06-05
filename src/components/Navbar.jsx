import { Link, NavLink } from "react-router-dom";
import {
  FaFacebook,
  FaHandsHelping,
  FaLeaf,
  FaUserCircle,
} from "react-icons/fa";
import { IoIosCall, IoMdLogOut } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { RiWhatsappFill } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import SearchBar from "./SearchBar";
import { MdShareLocation } from "react-icons/md";
import TopNav from "./TopNav";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("logOUT");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <header>
      <TopNav />
      <nav className="bg-white sticky top-0 z-50 border-b border-[#6bd3f33d]">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center group">
              <img
                className="w-12 mr-2 transition-transform group-hover:scale-105"
                src={logo}
                alt="Kind Hands Logo"
              />
              <p className="text-3xl font-bold text-[#024870] tracking-tight">
                KIND
                <span className="font-normal ml-1 text-[#6bd3f3]">HANDS</span>
              </p>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? "text-[#024870] font-semibold"
                      : "text-gray-600 hover:text-[#024870] hover:bg-[#6bd3f3]/10"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/all-posts"
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? "text-[#024870] font-semibold"
                      : "text-gray-600 hover:text-[#024870] hover:bg-[#6bd3f3]/10"
                  }`
                }
              >
                Opportunities
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/add-post"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        isActive
                          ? "text-[#024870] font-semibold"
                          : "text-gray-600 hover:text-[#024870] hover:bg-[#6bd3f3]/10"
                      }`
                    }
                  >
                    Create Post
                  </NavLink>
                  <NavLink
                    to="/manage-posts"
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-md transition-all ${
                        isActive
                          ? "text-[#024870] font-semibold"
                          : "text-gray-600 hover:text-[#024870] hover:bg-[#6bd3f3]/10"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </>
              )}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <SearchBar />

              {/* User Profile or Login */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center focus:outline-none"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full border-2 border-[#6bd3f3] object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-[#024870] text-2xl hover:text-[#6bd3f3] transition-colors" />
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 divide-y divide-gray-100">
                      <div className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#6bd3f3]/10 hover:text-[#024870] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FaUserCircle className="mr-2 text-[#024870]" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#6bd3f3]/10 hover:text-[#024870] transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiSettings className="mr-2 text-[#024870]" />
                          Settings
                        </Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#6bd3f3]/10 hover:text-[#024870] transition-colors"
                        >
                          <IoMdLogOut className="mr-2 text-[#024870]" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="relative px-10 py-3 font-medium text-white overflow-hidden group">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#024870] opacity-100 group-hover:opacity-0 transition-all duration-300"></div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                    {/* Border animation */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full transition-all duration-500"></div>

                    {/* Text with slight hover shift */}
                    <span className="relative flex items-center justify-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                      Login
                    </span>
                  </button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-[#024870] focus:outline-none transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] font-semibold"
                      : "text-gray-600 hover:bg-[#6bd3f3]/10 hover:text-[#024870]"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/all-posts"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-[#6bd3f3]/10 text-[#024870] font-semibold"
                      : "text-gray-600 hover:bg-[#6bd3f3]/10 hover:text-[#024870]"
                  }`
                }
              >
                Opportunities
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to="/add-post"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? "bg-[#6bd3f3]/10 text-[#024870] font-semibold"
                          : "text-gray-600 hover:bg-[#6bd3f3]/10 hover:text-[#024870]"
                      }`
                    }
                  >
                    Create Post
                  </NavLink>
                  <NavLink
                    to="/manage-posts"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? "bg-[#6bd3f3]/10 text-[#024870] font-semibold"
                          : "text-gray-600 hover:bg-[#6bd3f3]/10 hover:text-[#024870]"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </>
              )}
              <div className="pt-2 border-t border-gray-200 mt-2">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:bg-[#6bd3f3]/10 hover:text-[#024870] transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
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
