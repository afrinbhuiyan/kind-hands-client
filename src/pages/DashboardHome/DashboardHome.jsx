import React from "react";
import { FaHandsHelping, FaUsers, FaChartLine, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";

const DashboardHome = () => {
  const stats = [
    { 
      value: "128", 
      label: "Active Volunteers", 
      icon: <FaUsers className="text-3xl" />,
      change: "+12%",
      color: "bg-[#6bd3f3]"
    },
    { 
      value: "24", 
      label: "New Requests", 
      icon: <FaHandsHelping className="text-3xl" />,
      change: "+5%",
      color: "bg-[#024870]"
    },
    { 
      value: "89%", 
      label: "Engagement Rate", 
      icon: <FaChartLine className="text-3xl" />,
      change: "+3%",
      color: "bg-[#6bd3f3]"
    },
    { 
      value: "15", 
      label: "Upcoming Events", 
      icon: <FaCalendarAlt className="text-3xl" />,
      change: "2 new",
      color: "bg-[#024870]"
    }
  ];

  const recentActivities = [
    { id: 1, action: "New volunteer registered", time: "2 mins ago", user: "Sarah Johnson" },
    { id: 2, action: "Community event created", time: "1 hour ago", user: "Michael Chen" },
    { id: 3, action: "Donation received", time: "3 hours ago", user: "Alexandra Park" },
    { id: 4, action: "Volunteer shift completed", time: "5 hours ago", user: "David Wilson" }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#024870] to-[#6bd3f3] rounded-2xl p-6 text-white shadow-lg"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Admin!</h1>
            <p className="mt-2 opacity-90">Here's what's happening with your community today</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              <FaHandsHelping className="text-4xl text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.color} rounded-xl p-6 text-white shadow-md`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1">{stat.label}</p>
                <p className="text-sm mt-2 opacity-80">{stat.change}</p>
              </div>
              <div className="bg-white/20 p-3 rounded-full">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-[#024870] dark:text-[#6bd3f3] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="bg-[#6bd3f3]/10 p-2 rounded-full mr-4">
                  <div className="w-8 h-8 rounded-full bg-[#6bd3f3] flex items-center justify-center text-white">
                    {activity.user.charAt(0)}
                  </div>
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-[#024870] dark:text-[#6bd3f3] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center p-3 rounded-lg bg-[#6bd3f3]/10 hover:bg-[#6bd3f3]/20 transition-colors">
              <div className="bg-[#6bd3f3] text-white p-2 rounded-lg mr-3">
                <FiPlusCircle />
              </div>
              <span>Add New Volunteer</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg bg-[#024870]/10 hover:bg-[#024870]/20 transition-colors">
              <div className="bg-[#024870] text-white p-2 rounded-lg mr-3">
                <FaCalendarAlt />
              </div>
              <span>Create Event</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg bg-[#6bd3f3]/10 hover:bg-[#6bd3f3]/20 transition-colors">
              <div className="bg-[#6bd3f3] text-white p-2 rounded-lg mr-3">
                <FaChartLine />
              </div>
              <span>Generate Report</span>
            </button>
            <button className="w-full flex items-center p-3 rounded-lg bg-[#024870]/10 hover:bg-[#024870]/20 transition-colors">
              <div className="bg-[#024870] text-white p-2 rounded-lg mr-3">
                <FaUsers />
              </div>
              <span>Manage Team</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-[#024870] dark:text-[#6bd3f3] mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">Community Cleanup Day</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sat, May {15+item}, 2023</p>
                </div>
                <span className="bg-[#6bd3f3]/10 text-[#6bd3f3] text-xs px-2 py-1 rounded-full">Volunteers Needed</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((avatar) => (
                    <div key={avatar} className="w-8 h-8 rounded-full bg-[#024870]/10 flex items-center justify-center text-[#024870] text-xs font-bold">
                      {avatar === 1 ? 'AJ' : avatar === 2 ? 'MP' : 'TW'}
                    </div>
                  ))}
                </div>
                <button className="text-sm bg-[#6bd3f3] hover:bg-[#5bc2e3] text-white px-3 py-1 rounded-full transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;