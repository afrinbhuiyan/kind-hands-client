import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaArrowRight,
  FaHandsHelping,
  FaSearch,
  FaCheck,
  FaTh,
  FaList,
  FaFrown,
  FaRedo,
  FaChevronRight,
  FaRegClock,
  FaRegUser,
  FaRegCalendarAlt,
  FaRegMap,
  FaRegSmile,
  FaRegSadTear,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import Spinner from "../../components/Spinner";
import { allVolunteersPromise } from "../../services/api/volunteersApi";
import { searchPostsByTitle } from "../../services/api/searchPostsByTitle";

const AllVolunteers = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableLayout, setIsTableLayout] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  useDynamicTitle("Opportunities");

  useEffect(() => {
    // Check for saved theme preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }

    allVolunteersPromise()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (term) => {
    setLoading(true);
    try {
      const data = await searchPostsByTitle(term);
      setPosts(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(posts.map((post) => post.category))];
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const featuredPosts = posts
    .filter((post) => new Date(post.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 2);

  if (loading) return <Spinner />;

  return (
    <div className="dark:bg-[#011927]">
      <motion.div
      className="container mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      {/* Featured Posts Section */}
      <AnimatePresence>
        {featuredPosts.length > 0 && (
          <motion.div
            className="mb-16 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-30"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 dark:bg-blue-800/20 rounded-full opacity-20"></div>

            <div className="relative overflow-hidden">
              <div className="flex items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-[#02476e] dark:text-cyan-400 uppercase">
                    Featured Volunteer Opportunities
                  </h2>
                  <p className="text-[#02476e] dark:text-cyan-400/80">
                    Make an impact where it's needed most
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={`featured-${post._id}`}
                    className="bg-white dark:bg-gray-800 overflow-hidden border border-blue-50 dark:border-gray-700 hover:border-blue-100 dark:hover:border-cyan-400/30 transition-all duration-300 flex h-full"
                    whileHover={{ y: -5, scale: 1.01 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative w-1/3 min-w-[200px] group overflow-hidden">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-700/90 text-sm font-medium rounded-full text-[#024870] dark:text-cyan-400 backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="w-2/3 p-6 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white transition-colors">
                          {post.title}
                        </h3>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <FaMapMarkerAlt className="w-4 h-4 mr-2 text-blue-400 dark:text-cyan-400" />
                        {post.location}
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 relative">
                        {post.description}
                        <span className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></span>
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm font-medium text-red-500 dark:text-red-400">
                            <FaRegClock className="w-4 h-4 mr-2" />
                            <span className="font-semibold">Deadline:</span>{" "}
                            {new Date(post.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <motion.div 
            className="inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-1 bg-gray-300 dark:bg-gray-600 mb-2 mx-auto"></div>
            <h2 className="text-4xl font-light tracking-tight text-gray-800 dark:text-white">
              Volunteer Opportunities
            </h2>
          </motion.div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Find meaningful ways to contribute to your community
          </p>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          className="bg-[#a4d5fd2f] dark:bg-gray-800/50 rounded-xl p-6 mb-12 border border-[#07437411] dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="flex w-full max-w-2xl overflow-hidden rounded-full shadow-md dark:shadow-gray-900/50">
              <div className="flex items-center pl-4 bg-white dark:bg-gray-700">
                <FaSearch className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search volunteer posts..."
                className="flex-grow px-4 py-3 bg-white dark:bg-gray-700 focus:outline-none text-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
              <button
                className="px-6 py-3 text-white bg-[#094883] hover:bg-[#064772] dark:bg-cyan-600 dark:hover:bg-cyan-700 transition-all duration-200"
                onClick={() => handleSearch(searchTerm)}
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 relative overflow-hidden group ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#094883] to-[#4da7d1] dark:from-cyan-600 dark:to-cyan-400 text-white shadow-lg"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-[#094883]/30 dark:hover:border-cyan-400/50 hover:text-[#094883] dark:hover:text-cyan-400"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCategory === category && (
                  <motion.span
                    className="absolute inset-0 bg-white/10 dark:bg-black/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  {category}
                  {selectedCategory === category && (
                    <motion.span
                      className="ml-1.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <FaCheck className="h-4 w-4" />
                    </motion.span>
                  )}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Layout Toggle */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex bg-white dark:bg-gray-700 rounded-full p-1 border border-gray-200 dark:border-gray-600 shadow-sm">
              <button
                onClick={() => setIsTableLayout(false)}
                className={`px-4 py-2 text-sm flex items-center gap-2 rounded-full transition-all duration-300 relative ${
                  !isTableLayout
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {!isTableLayout && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#094883] to-[#4da7d1] dark:from-cyan-600 dark:to-cyan-400 rounded-full z-0"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <FaTh
                  className={`w-4 h-4 relative z-10 ${
                    !isTableLayout ? "text-white" : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span className="relative z-10">Cards</span>
              </button>

              <button
                onClick={() => setIsTableLayout(true)}
                className={`px-4 py-2 text-sm flex items-center gap-2 rounded-full transition-all duration-300 relative ${
                  isTableLayout
                    ? "text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {isTableLayout && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#094883] to-[#4da7d1] dark:from-cyan-600 dark:to-cyan-400 rounded-full z-0"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <FaList
                  className={`w-4 h-4 relative z-10 ${
                    isTableLayout ? "text-white" : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <span className="relative z-10">Table</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 mb-6">
              <FaFrown className="w-12 h-12 text-red-400 dark:text-red-500" />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No opportunities found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              {searchTerm
                ? `No results found for "${searchTerm}" in ${
                    selectedCategory === "All" ? "any category" : selectedCategory
                  }`
                : `No posts available in ${
                    selectedCategory === "All" ? "any category" : selectedCategory
                  }`}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Reset filters
              <FaRedo className="ml-2 -mr-1 h-4 w-4" />
            </motion.button>
          </motion.div>
        ) : isTableLayout ? (
          /* Table Layout */
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-[#024870] dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
                    >
                      Opportunity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right text-xs font-medium text-white dark:text-gray-300 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredPosts.map((post) => (
                    <tr
                      key={post._id}
                      className="hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-all duration-150"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                            <img
                              src={post.thumbnail || "/default-volunteer.jpg"}
                              alt={post.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/default-volunteer.jpg";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {post.category}
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#024870] dark:text-blue-300">
                                {post.skillsNeeded?.[0] || "General"}
                              </span>
                              {post.skillsNeeded?.length > 1 && (
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                                  +{post.skillsNeeded.length - 1} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <FaMapMarkerAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870] dark:text-cyan-400" />
                            {post.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <FaUsers className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870] dark:text-cyan-400" />
                            {post.volunteersNeeded} volunteers needed
                          </div>
                          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                            <FaCalendarAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870] dark:text-cyan-400" />
                            Apply by{" "}
                            {new Date(post.deadline).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            new Date(post.deadline) > new Date()
                              ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
                          }`}
                        >
                          {new Date(post.deadline) > new Date()
                            ? "Active"
                            : "Expired"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <Link to={`/volunteer/${post._id}`}>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#024870] hover:bg-[#01314d] dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#024870] transition-all">
                            View Details
                            <FaChevronRight className="ml-2 -mr-1 h-4 w-4" />
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Table View */}
            <div className="md:hidden space-y-4 p-4">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring" }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <img
                        src={post.thumbnail || "/default-volunteer.jpg"}
                        alt={post.title}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.src = "/default-volunteer.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{post.category}</p>
                        </div>
                        <span
                          className={`ml-2 px-2 py-1 text-xs font-medium rounded-full 
                          ${
                            new Date(post.deadline) > new Date()
                              ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300"
                          }`}
                        >
                          {new Date(post.deadline) > new Date()
                            ? "Active"
                            : "Expired"}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#024870] dark:text-blue-300">
                          {post.skillsNeeded?.[0] || "General"}
                        </span>
                        {post.skillsNeeded?.length > 1 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300">
                            +{post.skillsNeeded.length - 1} more
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870] dark:text-cyan-400" />
                          {post.location}
                        </div>
                        <div className="flex items-center">
                          <FaUsers className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870] dark:text-cyan-400" />
                          {post.volunteersNeeded} volunteers needed
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870] dark:text-cyan-400" />
                          Apply by {new Date(post.deadline).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Link to={`/volunteer/${post._id}`} className="w-full">
                          <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#024870] hover:bg-[#01314d] dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#024870] transition-all">
                            View Details
                            <FaChevronRight className="ml-2 -mr-1 h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Card Layout */
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-cyan-400/30 transition-all duration-200 flex flex-col h-full shadow-sm hover:shadow-md"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: "spring", 
                  stiffness: 300 
                }}
              >
                <div className="relative pt-[60%] w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#024870]/80 dark:from-gray-900/80 to-transparent"></div>
                  <span className="absolute top-3 right-3 bg-[#024870] dark:bg-cyan-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1 mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt
                        className="mr-1.5 text-[#024870] dark:text-cyan-400"
                        size={14}
                      />
                      <span className="line-clamp-1">{post.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 flex-grow">
                    {post.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaUsers className="mr-1.5 text-[#024870] dark:text-cyan-400" size={14} />
                      {post.volunteersNeeded} needed
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 justify-end">
                      <FaCalendarAlt
                        className="mr-1.5 text-[#024870] dark:text-cyan-400"
                        size={14}
                      />
                      {new Date(post.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <Link to={`/volunteer/${post._id}`}>
                    <button className="w-full py-2 bg-[#024870] hover:bg-[#013553] dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white font-medium rounded transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
                      View Details
                      <FaArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
    </div>
  );
};

export default AllVolunteers;