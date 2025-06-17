import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaImage,
  FaHeading,
  FaAlignLeft,
  FaTag,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import { updatePostById } from "../../../services/api/postApi";
import useAuth from "../../../hooks/useAuth";

const UpdatePostModal = ({ isOpen, onClose, postData, refetch }) => {
  const { user } = useAuth();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [categories] = useState([
    "Healthcare",
    "Education",
    "Social Service",
    "Animal Welfare",
    "Environment",
    "Disaster Relief",
  ]);

  useEffect(() => {
    if (postData?.deadline) {
      setDeadline(new Date(postData.deadline));
    }
  }, [postData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const updatedPost = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline: deadline.toISOString(),
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    try {
      await updatePostById(postData._id, updatedPost, user.accessToken);

      Swal.fire({
        title: "Success!",
        text: "Post updated successfully",
        icon: "success",
        confirmButtonColor: "#024870",
      });
      refetch();
      onClose();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !postData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-[#1111114f] bg-opacity-30 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 w-full max-w-2xl rounded-xl shadow-xl overflow-hidden"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Update Volunteer Post
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaImage className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  defaultValue={postData.thumbnail}
                  placeholder="https://example.com/image.jpg"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaHeading className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                  Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={postData.title}
                  placeholder="Volunteer Opportunity Title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                  <FaAlignLeft className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={postData.description}
                  placeholder="Describe the volunteer opportunity..."
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                    <FaTag className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={postData.category}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={postData.location}
                    placeholder="City, Country"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Volunteers Needed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                    <FaUsers className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                    Volunteers Needed
                  </label>
                  <input
                    type="number"
                    name="volunteersNeeded"
                    defaultValue={postData.volunteersNeeded}
                    placeholder="Number of volunteers"
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                    <FaCalendarAlt className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                    Deadline
                  </label>
                  <DatePicker
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Organizer Info (read-only) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                    <FaUser className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={user?.displayName}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                    <FaEnvelope className="mr-2 text-[#024870] dark:text-[#6bd3f3]" />
                    Organizer Email
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={user?.email}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center ${
                    loading
                      ? "bg-[#024870]/70 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#024870] to-[#6bd3f3] hover:from-[#01314d] hover:to-[#4ac1e8]"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
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
                      Updating...
                    </>
                  ) : (
                    "Update Post"
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

export default UpdatePostModal;
