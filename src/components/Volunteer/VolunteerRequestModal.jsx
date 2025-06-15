import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHandsHelping,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaTimes,
  FaImage,
} from "react-icons/fa";
import { createVolunteerRequest } from "../../services/api/VolunteerRequestApi";

const VolunteerRequestModal = ({ post, isOpen, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post?._id) {
      toast.error("Invalid post information");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        postId: post._id,
        title: post.title,
        description: post.description,
        thumbnail: post.thumbnail,
        category: post.category,
        location: post.location,
        volunteersNeeded: post.volunteersNeeded,
        deadline: post.deadline,
        organizerName: post.organizerName,
        organizerEmail: post.organizerEmail,
        volunteerName: user?.displayName,
        volunteerEmail: user?.email,
        suggestion,
        status: "requested",
        createdAt: new Date(),
      };

      await createVolunteerRequest(requestData);

      await onSuccess();

      Swal.fire({
        title: "Request Sent!",
        text: "Your volunteer request has been submitted successfully.",
        icon: "success",
        confirmButtonColor: "#024870",
      });
      onClose();
      setSuggestion("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#11111148] bg-opacity-50 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <FaHandsHelping className="text-[#024870] dark:text-[#6bd3f3] mr-2" />
                Volunteer Application
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                    Opportunity Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Thumbnail Preview
                    </label>
                    <div className="relative">
                      {post.thumbnail ? (
                        <div className="group relative">
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex-shrink-0 h-10 w-10 rounded overflow-hidden">
                              <img
                                src={post.thumbnail}
                                alt="Thumbnail preview"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://via.placeholder.com/100?text=No+Image";
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <input
                                type="text"
                                value={post.thumbnail}
                                readOnly
                                className="block w-full truncate bg-transparent text-sm text-gray-900 dark:text-white border-none focus:ring-0 p-0"
                              />
                            </div>
                          </div>
                          <a
                            href={post.thumbnail}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-black/50 transition-opacity"
                          >
                            <span className="text-white text-sm font-medium">
                              View Full Image
                            </span>
                          </a>
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-400 dark:text-gray-500 flex items-center">
                          <FaImage className="mr-2" />
                          No thumbnail available
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Post Title
                      </label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {post.title}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Description
                      </label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {post.description}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Category
                        </label>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                          {post.category}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Location
                        </label>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-sm" />{" "}
                          {post.location}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Volunteers Needed
                        </label>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white flex items-center">
                          <FaUsers className="mr-2 text-sm" />{" "}
                          {post.volunteersNeeded}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Deadline
                        </label>
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white flex items-center">
                          <FaCalendarAlt className="mr-2 text-sm" />
                          {new Date(post.deadline).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                      Organizer Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Organizer Name
                      </label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {post.organizerName}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Organizer Email
                      </label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {post.organizerEmail}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                      Your Information
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Your Name
                      </label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {user?.displayName}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Your Email
                      </label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="suggestion"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Why are you interested in this opportunity? (Optional)
                </label>
                <textarea
                  id="suggestion"
                  placeholder="Tell us about your skills, experience, or why you'd like to volunteer..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                  rows={4}
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                />
              </div>

              <input type="hidden" name="status" value="requested" />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#024870] to-[#6bd3f3] text-white rounded-lg hover:from-[#01314d] hover:to-[#4ac1e8] transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaHandsHelping className="mr-2" />
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VolunteerRequestModal;
