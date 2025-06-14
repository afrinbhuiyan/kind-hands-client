import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
console.log(motion)
import { AuthContext } from "../../context/AuthContext";
import useDynamicTitle from "../../hooks/useDynamicTitle";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState(new Date());
  useDynamicTitle("Add Volunteer")

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
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const data = await res.json();
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
  {/* Form Container with Glass Morphism Effect */}
  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/50">
    {/* Decorative Elements */}
    <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#18c9ff30] rounded-full filter blur-3xl"></div>
    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#074c6130] dark:bg-[#6bd3f330] rounded-full filter blur-3xl"></div>
    
    {/* Form Header */}
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
        Help us connect with passionate volunteers by sharing your opportunity details
      </motion.p>
    </div>

    {/* Form Content */}
    <div className="px-8 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Thumbnail URL */}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
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

        {/* Description */}
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

        {/* Section 2: Logistics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          {/* Category */}
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
                <option value="Environment">🌱 Environment</option>
                <option value="Education">📚 Education</option>
                <option value="Healthcare">🏥 Healthcare</option>
                <option value="Animals">🐾 Animals</option>
                <option value="Community">🏘️ Community</option>
                <option value="Disaster Relief">🚨 Disaster Relief</option>
              </select>
              <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Location */}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
          </div>

          {/* Volunteers Needed */}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Deadline */}
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Organizer Info */}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
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
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
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
