import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import Spinner from "../../components/Spinner";
import {
  deleteVolunteerRequestById,
  getMyVolunteerRequests,
} from "../../services/api/VolunteerRequestApi";
import useAuth from "../../hooks/useAuth";
import { FaChartLine, FaHandsHelping } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const MyVolunteerRequestPost = () => {
  const { user } = useAuth();
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useDynamicTitle("Manage My Post");

  useEffect(() => {
    if (user?.email) {
      getMyVolunteerRequests(user.email, user.accessToken)
        .then((data) => {
          setMyRequests(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email, user.accessToken]);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Volunteer Request?",
      text: "This action cannot be undone",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#024870",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteVolunteerRequestById(id, user.accessToken);
        Swal.fire({
          title: "Cancel!",
          text: "Request cancelled successfully.",
          icon: "success",
          background: "#F5F4F1",
          timer: 2000,
          showConfirmButton: false,
        });
        setMyRequests((prev) => prev.filter((req) => req._id !== id));
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-3 sm:px-4 md:px-6 py-4"
    >
      <motion.div
        className="mb-8 sm:mb-10 relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IoDocumentText className="w-6 h-6 text-[#024870] dark:text-[#3b82f6]" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#024870] dark:text-white tracking-tight">
            My Volunteer Requests
          </h1>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-[#024870] dark:text-[#3b82f6]"
            >
              <FaChartLine className="w-5 h-5" />
            </motion.div>
            <div className="relative flex-1">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#024870] to-[#3b82f6] rounded-full"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(myRequests.length * 10, 100)}%`,
                    transition: {
                      duration: 0.8,
                      type: "spring",
                      damping: 10,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <motion.p
            className="flex items-center gap-1 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              className="text-[#024870] dark:text-[#3b82f6] font-semibold flex items-center gap-1"
              animate={{
                scale: [1, 1.05, 1],
                transition: { repeat: Infinity, duration: 2 },
              }}
            >
              <FaHandsHelping className="w-4 h-4" />
              {myRequests.length}
            </motion.span>
            {myRequests.length === 1 ? "active request" : "active requests"}
          </motion.p>
        </motion.div>
      </motion.div>

      {myRequests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8 text-center border border-gray-200 dark:border-gray-700"
        >
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No Volunteer Requests Found
          </h3>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            You haven't made any volunteer requests yet.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-[#024870]/5 dark:bg-[#1e3a8a]/10">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    Opportunity
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider hidden md:table-cell">
                    Deadline
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-right text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {myRequests.map((req, idx) => (
                  <motion.tr
                    key={req._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {idx + 1}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {req.title}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap hidden sm:table-cell">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#024870]/10 dark:bg-[#1e3a8a]/20 text-[#024870] dark:text-[#3b82f6]">
                        {req.category}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                      {new Date(req.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          req.status === "requested"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                            : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                        }`}
                      >
                        {req.status.charAt(0).toUpperCase() +
                          req.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 px-2 sm:px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-xs sm:text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyVolunteerRequestPost;
