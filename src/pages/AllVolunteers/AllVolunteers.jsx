import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

  if (loading) return <Spinner/>

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {featuredPosts.length > 0 && (
        <div className="mb-16 relative">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full opacity-30"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>

          <div className="relative overflow-hidden">
            <div className="flex items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#02476e] uppercase">
                  Featured Volunteer Opportunities
                </h2>
                <p className="text-[#02476e]">
                  Make an impact where it's needed most
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={`featured-${post._id}`}
                  className="bg-white overflow-hidden border border-blue-50 hover:border-blue-100 transition-all duration-300 flex h-full"
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
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1111116e] to-[#0248705d] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <Link to={`/volunteer/${post._id}`} className="w-full">
                        <motion.button
                          className="w-full overflow-hidden"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="relative px-6 py-3 font-medium text-white group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#024870] to-[#016a96]"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6bd3f3] to-[#024870] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-[#6bd3f3] group-hover:w-full group-hover:left-0 transition-all duration-500"></div>
                            <span className="relative flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                              Learn more
                              <FaChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                            </span>
                          </div>
                        </motion.button>
                      </Link>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#094883] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {post.category}
                    </div>
                  </div>

                  <div className="w-2/3 p-6 flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 transition-colors">
                        {post.title}
                      </h3>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2 text-blue-400" />
                      {post.location}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 relative">
                      {post.description}
                      <span className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></span>
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm font-medium text-red-500">
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
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-1 bg-gray-300 mb-2 mx-auto"></div>
            <h2 className="text-4xl font-light tracking-tight text-gray-800">
              Volunteer Opportunities
            </h2>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find meaningful ways to contribute to your community
          </p>
        </div>

        <div className="bg-[#a4d5fd2f] rounded-xl p-6 mb-12 border border-[#07437411]">
          <div className="flex items-center justify-center mb-8">
            <div className="flex w-full max-w-2xl overflow-hidden rounded-full shadow-md">
              <div className="flex items-center pl-4 bg-white">
                <FaSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search volunteer posts..."
                className="flex-grow px-4 py-3 bg-white focus:outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
              <button
                className="px-6 py-3 text-white bg-[#094883] hover:bg-[#064772] transition-all duration-200"
                onClick={() => handleSearch(searchTerm)}
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 relative overflow-hidden group ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#094883] to-[#4da7d1] text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-[#094883]/30 hover:text-[#094883]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCategory === category && (
                  <motion.span
                    className="absolute inset-0 bg-white/10"
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
          </div>

          <div className="flex justify-center">
            <motion.div
              className="inline-flex bg-white rounded-full p-1 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsTableLayout(false)}
                className={`px-4 py-2 text-sm flex items-center gap-2 rounded-full transition-all duration-300 relative ${
                  !isTableLayout
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {!isTableLayout && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#094883] to-[#4da7d1] rounded-full z-0"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <FaTh
                  className={`w-4 h-4 relative z-10 ${
                    !isTableLayout ? "text-white" : "text-gray-400"
                  }`}
                />
                <span className="relative z-10">Cards</span>
              </button>

              <button
                onClick={() => setIsTableLayout(true)}
                className={`px-4 py-2 text-sm flex items-center gap-2 rounded-full transition-all duration-300 relative ${
                  isTableLayout
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {isTableLayout && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-[#094883] to-[#4da7d1] rounded-full z-0"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <FaList
                  className={`w-4 h-4 relative z-10 ${
                    isTableLayout ? "text-white" : "text-gray-400"
                  }`}
                />
                <span className="relative z-10">Table</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-50 mb-6">
            <FaFrown className="w-12 h-12 text-red-400" />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No opportunities found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
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
            className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#024870]">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Opportunity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-blue-50 transition-all duration-150"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-gray-200">
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
                          <div className="text-sm font-semibold text-gray-900">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {post.category}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-[#024870]">
                              {post.skillsNeeded?.[0] || "General"}
                            </span>
                            {post.skillsNeeded?.length > 1 && (
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                +{post.skillsNeeded.length - 1} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-700">
                          <FaMapMarkerAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870]" />
                          {post.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FaUsers className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870]" />
                          {post.volunteersNeeded} volunteers needed
                        </div>
                        <div className="flex items-center text-sm text-gray-700">
                          <FaCalendarAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870]" />
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
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {new Date(post.deadline) > new Date()
                          ? "Active"
                          : "Expired"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link to={`/volunteer/${post._id}`}>
                        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#024870] hover:bg-[#01314d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#024870] transition-all">
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

          <div className="md:hidden space-y-4 p-4">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow p-4 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border border-gray-200">
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
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500">{post.category}</p>
                      </div>
                      <span
                        className={`ml-2 px-2 py-1 text-xs font-medium rounded-full 
                        ${
                          new Date(post.deadline) > new Date()
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {new Date(post.deadline) > new Date()
                          ? "Active"
                          : "Expired"}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-[#024870]">
                        {post.skillsNeeded?.[0] || "General"}
                      </span>
                      {post.skillsNeeded?.length > 1 && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          +{post.skillsNeeded.length - 1} more
                        </span>
                      )}
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-gray-700">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870]" />
                        {post.location}
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870]" />
                        {post.volunteersNeeded} volunteers needed
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="flex-shrink-0 mr-2 h-4 w-4 text-[#024870]" />
                        Apply by {new Date(post.deadline).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Link to={`/volunteer/${post._id}`} className="w-full">
                        <button className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#024870] hover:bg-[#01314d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#024870] transition-all">
                          View Details
                          <FaChevronRight className="ml-2 -mr-1 h-4 w-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FaRegSadTear className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No opportunities found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200 flex flex-col h-full shadow-sm"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative pt-[60%] w-full overflow-hidden bg-gray-100">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#024870]/80 to-transparent"></div>
                <span className="absolute top-3 right-3 bg-[#024870] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {post.category}
                </span>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 mb-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt
                      className="mr-1.5 text-[#024870]"
                      size={14}
                    />
                    <span className="line-clamp-1">{post.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                  {post.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-1.5 text-[#024870]" size={14} />
                    {post.volunteersNeeded} needed
                  </div>
                  <div className="flex items-center text-gray-600 justify-end">
                    <FaCalendarAlt
                      className="mr-1.5 text-[#024870]"
                      size={14}
                    />
                    {new Date(post.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <Link to={`/volunteer/${post._id}`}>
                  <button className="w-full py-2 bg-[#024870] hover:bg-[#013553] text-white font-medium rounded transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
                    View Details
                    <FaArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AllVolunteers;
