import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useDynamicTitle from "../../hooks/useDynamicTitle";
import {
  FaImage,
  FaMapMarkerAlt,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaCalendarAlt,
} from "react-icons/fa";
import { addVolunteerPost } from "../../services/api/addVolunteerApi";
import useAuth from "../../hooks/useAuth";

const AddVolunteer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState(new Date());
  useDynamicTitle("Add Volunteer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const post = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline: deadline,
      organizerName: user?.displayName,
      organizerEmail: user?.email,
    };

    try {
      const data = await addVolunteerPost(post);

      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Volunteer Post Added Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        form.reset();
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto my-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/50">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#18c9ff30] rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#074c6130] dark:bg-[#6bd3f330] rounded-full filter blur-3xl"></div>

        <div className="relative px-8 pt-10 pb-6 border-b border-white/30 dark:border-gray-700/50">
          <motion.h2
            className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#074c61] to-[#18c9ff] dark:from-[#6bd3f3] dark:to-[#0066ff]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Create Volunteer Opportunity
          </motion.h2>
          <motion.p
            className="text-center text-gray-500 dark:text-gray-400 max-w-lg mx-auto"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Help us connect with passionate volunteers by sharing your
            opportunity details
          </motion.p>
        </div>

        <div className="px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Thumbnail Image URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="thumbnail"
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#18c9ff] focus:border-transparent transition-all"
                  />
                  <div className="absolute right-3 top-3 text-gray-400">
                    <FaImage className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Opportunity Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Beach Cleanup Volunteers Needed"
                  required
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#18c9ff] focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Detailed Description
              </label>
              <textarea
                name="description"
                placeholder="Tell volunteers about the opportunity, responsibilities, impact, etc..."
                rows={6}
                required
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#18c9ff] focus:border-transparent transition-all"
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </label>
                <div className="relative">
                  <select
                    name="category"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#18c9ff] focus:border-transparent appearance-none pr-10"
                  >
                    <option value="">Select a category</option>
                    <option value="Environment"> Environment</option>
                    <option value="Education"> Education</option>
                    <option value="Healthcare"> Healthcare</option>
                    <option value="Animals">Animals</option>
                    <option value="Community">Community</option>
                    <option value="Disaster Relief"> Disaster Relief</option>
                  </select>
                  <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                    <FaChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="City or exact address"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#18c9ff] focus:border-transparent transition-all pl-10"
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Volunteers Needed
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="volunteersNeeded"
                    placeholder="How many volunteers?"
                    min="1"
                    required
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#18c9ff] focus:border-transparent transition-all pl-10"
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FaUsers className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Application Deadline
              </label>
              <div className="relative">
                <DatePicker
                  selected={deadline}
                  onChange={(date) => setDeadline(date)}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#18c9ff] focus:border-transparent"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  required
                  placeholderText="Select deadline date"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <FaCalendarAlt className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Organizer Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="organizerName"
                    value={user?.displayName || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg cursor-not-allowed pl-10"
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FaUser className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Organizer Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="organizerEmail"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg cursor-not-allowed pl-10"
                  />
                  <div className="absolute left-3 top-3 text-gray-400">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-[#074c61] to-[#18c9ff] hover:from-[#063847] hover:to-[#129cc9] dark:from-[#6bd3f3] dark:to-[#0066ff] dark:hover:from-[#4fc1e9] dark:hover:to-[#0055dd] text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
              >
                Publish Volunteer Opportunity
              </button>
            </motion.div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddVolunteer;
