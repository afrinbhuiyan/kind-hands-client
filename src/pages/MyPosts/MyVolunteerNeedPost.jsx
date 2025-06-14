import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import UpdatePostModal from "../../components/Volunteer/MyPost/UpdatePostModal";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FiActivity, FiDatabase, FiMail, FiTarget } from "react-icons/fi";
console.log(motion);

const MyVolunteerNeedPost = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/my-posts?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyPosts(data);
        setIsLoading(false);
      });
  }, [user?.email]);

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      html: `
        <div class="text-left">
          <p class="mb-2 text-gray-700">This will permanently delete your volunteer post.</p>
          <p class="text-sm text-gray-500">This action cannot be undone.</p>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Delete Post",
      cancelButtonText: "Cancel",
      background: "#FFFFFF",
      customClass: {
        popup: "rounded-xl border border-gray-200 shadow-2xl",
        title: "text-xl font-semibold text-gray-800",
        htmlContainer: "text-gray-600",
        confirmButton: "px-4 py-2 rounded-lg font-medium shadow-sm",
        cancelButton: "px-4 py-2 rounded-lg font-medium border border-gray-300",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5000/my-posts/${taskId}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "The post has been removed.",
              icon: "success",
              background: "#F5F4F1",
              timer: 2000,
              showConfirmButton: false,
            });
            setMyPosts((prev) => prev.filter((post) => post._id !== taskId));
          } else {
            throw new Error(data.message || "Failed to delete post");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#f59e0b",
          });
        }
      }
    });
  };

  const openUpdateModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <UpdatePostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        postData={selectedPost}
        refetch={() => {
          fetch(`http://localhost:5000/my-posts?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setMyPosts(data));
        }}
      />

      <motion.div
        className="relative mb-12 p-8 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* User Profile */}
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 rounded-full bg-[#024870]/10 dark:bg-[#024870]/20" />
            <FaCircleUser className="relative text-4xl text-[#024870] dark:text-[#3b82f6]" />
          </motion.div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {user.displayName}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center gap-1.5">
              <FiMail className="text-[#024870] dark:text-[#3b82f6]" />{" "}
              {user.email}
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#024870] dark:text-[#3b82f6]">
            Volunteer Dashboard
            <motion.div
              className="h-0.5 bg-[#024870]/30 dark:bg-[#3b82f6]/30 mt-1"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </h2>
        </div>

        {/* Stats Card */}
        <motion.div
          className="bg-[#024870]/5 dark:bg-[#1e3a8a]/10 p-5 rounded-lg border border-[#024870]/10 dark:border-[#1e3a8a]/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#024870] dark:text-[#93c5fd]">
                Active Opportunities
              </p>
              <p className="text-3xl font-bold text-[#024870] dark:text-white mt-1">
                {myPosts.length}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <FiActivity className="text-[#024870] dark:text-[#3b82f6] text-xl" />
            </div>
          </div>

          <div className="mt-4 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#024870] dark:bg-[#3b82f6]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(myPosts.length * 10, 100)}%` }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : myPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No volunteer posts yet
          </h3>
          <p className="mt-1 text-gray-500">
            Get started by creating your first volunteer need post.
          </p>
          <div className="mt-6">
            <Link
              to="/create-post"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Post
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-[#024870]/5 dark:bg-[#1e3a8a]/10">
                <tr>
                  {[
                    "Title",
                    "Category",
                    "Deadline",
                    "Volunteers",
                    "Actions",
                  ].map((header, i) => (
                    <th
                      key={header}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider ${
                        i === 4 ? "text-right" : ""
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {myPosts.map((post, index) => (
                  <motion.tr
                    key={post._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.4 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#024870]/10 dark:bg-[#1e3a8a]/20 text-[#024870] dark:text-[#3b82f6]">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(post.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className="bg-[#024870] dark:bg-[#3b82f6] h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                (post.volunteersNeeded /
                                  post.volunteersRequired) *
                                  100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.volunteersNeeded}/{post.volunteersRequired}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openUpdateModal(post)}
                          className="text-[#024870] dark:text-[#3b82f6] hover:text-[#023047] dark:hover:text-[#1d4ed8] px-3 py-1 rounded-md hover:bg-[#024870]/10 dark:hover:bg-[#1e3a8a]/20 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyVolunteerNeedPost;
