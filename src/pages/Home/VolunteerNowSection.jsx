import { useEffect, useState } from "react";
import { FaCalendarAlt, FaArrowRight, FaHandsHelping } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getHomePosts } from "../../services/api/homePostsApi.js";
import Spinner from "../../components/Spinner";

const VolunteerNowSection = () => {
  const [volunteerPosts, setVolunteerPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    getHomePosts()
      .then((data) => {
        setVolunteerPosts(data);
        setFetchError(null);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setFetchError(
          "Failed to load volunteer opportunities. Please try again later."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className=""
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center justify-center mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl md:text-5xl font-light text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="">Volunteer </span>
                <span className="roboto text-transparent bg-clip-text bg-gradient-to-r from-[#074c61] to-[#18c9ff] dark:from-[#6bd3f3] dark:to-[#0066ff]">
                  Opportunities
                </span>
              </motion.h1>
            </motion.div>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Make a difference in your community. Browse current volunteer
              needs and find the perfect opportunity to contribute.
            </motion.p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          )}

          {/* Error State */}
          {fetchError && (
            <motion.div
              className="p-4 mb-8 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-3 text-red-600 dark:text-red-300">
                <RxCrossCircled className="text-xl" />
                <span className="font-medium">{fetchError}</span>
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {!loading && !fetchError && (
            <>
              {/* Volunteer Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {volunteerPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    className="flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 overflow-hidden hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full group"
                    whileHover={{ y: -8, scale: 1.02 }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                  >
                    {/* Post Image */}
                    <div className="relative h-60 w-full overflow-hidden flex-shrink-0">
                      <img
                        src={post.thumbnail || "/fallback.jpg"}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-block px-3 py-1 bg-white/90 dark:bg-gray-700/90 text-sm font-medium rounded-full text-[#024870] dark:text-cyan-400 backdrop-blur-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-3">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <FaCalendarAlt className="mr-2 text-[#024870] dark:text-cyan-400" />
                          <span>
                            Deadline:{" "}
                            {new Date(post.deadline).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {post.volunteersNeeded} volunteers needed
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-auto">
                        <Link
                          to={`/volunteer/${post._id}`}
                          className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#024870] hover:bg-[#01314d] dark:bg-cyan-600 dark:hover:bg-cyan-700 transition-all duration-200 w-full group/view-details"
                        >
                          View Details
                          <FiArrowRight className="ml-2 transition-transform group-hover/view-details:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Browse All Button */}
              <motion.div
                className="text-center mt-14"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/volunteers"
                  className="inline-flex items-center px-6 py-3.5 border-2 border-[#024870] dark:border-cyan-400 text-base font-medium rounded-md text-[#024870] dark:text-cyan-400 bg-white dark:bg-gray-800 hover:bg-[#024870]/10 dark:hover:bg-gray-700 transition-all duration-200 group/explore"
                >
                  Browse All Opportunities
                  <FaArrowRight className="ml-3 transition-transform group-hover/explore:translate-x-1.5" />
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VolunteerNowSection;
