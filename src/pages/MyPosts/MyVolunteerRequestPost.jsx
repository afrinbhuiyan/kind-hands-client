import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { motion } from "framer-motion";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import Spinner from "../../components/Spinner";
import {
  deleteVolunteerRequestById,
  getMyVolunteerRequests,
} from "../../services/api/VolunteerRequestApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
console.log(motion);

const MyVolunteerRequestPost = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  useDynamicTitle("Manage My Post");

  useEffect(() => {
    if (user?.email) {
      getMyVolunteerRequests(user.email)
        .then((data) => {
          setMyRequests(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

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
        await deleteVolunteerRequestById(id);
        toast.success("Request cancelled successfully.");
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
      className="max-w-7xl mx-auto p-4 md:p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#024870] dark:text-white mb-2">
          My Volunteer Requests
        </h1>
        <div className="h-1 w-20 bg-[#024870] rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {myRequests.length} {myRequests.length === 1 ? "request" : "requests"}{" "}
          total
        </p>
      </div>
      <ToastContainer />
      <button
        onClick={() => toast.success("Test toast works!")}
        className="p-2 bg-blue-500 text-white"
      >
        Show Toast
      </button>

      {myRequests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center border border-gray-200 dark:border-gray-700"
        >
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
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
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No Volunteer Requests Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    Opportunity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#024870] dark:text-[#93c5fd] uppercase tracking-wider">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {req.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#024870]/10 dark:bg-[#1e3a8a]/20 text-[#024870] dark:text-[#3b82f6]">
                        {req.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(req.deadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleCancel(req._id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 px-3 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
