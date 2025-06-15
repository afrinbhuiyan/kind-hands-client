import { useEffect, useState } from "react";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getHomePosts } from "../../services/api/homePostsApi.js";
import Spinner from "../../components/Spinner";
console.log(motion);

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
        setFetchError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-[#024870] mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Volunteer Opportunities
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Make a difference in your community. Browse current volunteer needs
            and find the perfect opportunity to contribute.
          </motion.p>
        </div>

        {loading && <Spinner/>}

        {fetchError && (
          <div className="p-4 mb-4 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center justify-center gap-2 text-red-600">
              <RxCrossCircled />
              <span className="font-medium">{fetchError}</span>
            </div>
          </div>
        )}

        {!loading && !fetchError && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {volunteerPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-56 w-full overflow-hidden flex-shrink-0">
                    <img
                      src={post.thumbnail || "/fallback.jpg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#024870]/90 to-transparent p-4">
                      <span className="inline-block px-3 py-1 bg-white text-sm font-medium rounded-full text-[#024870]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaCalendarAlt className="mr-2 text-[#024870]" />
                        <span>
                          Deadline:{" "}
                          {new Date(post.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        to={`/volunteer/${post._id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#024870] hover:bg-[#01314d] transition-colors duration-200 w-full justify-center"
                      >
                        View Details
                        <FiArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/volunteers"
                className="inline-flex items-center px-6 py-3 border border-[#024870] text-base font-medium rounded-md text-[#024870] bg-white hover:bg-[#024870]/10 transition-all duration-200"
              >
                Browse All Opportunities
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default VolunteerNowSection;
