import React, { useState, useEffect } from "react";
import {
  FaHandsHelping,
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaRegBell,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { FiPlusCircle, FiRefreshCw, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { format, parseISO } from "date-fns";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { allVolunteersPromise } from "../../services/api/volunteersApi";

const COLORS = ["#6bd3f3", "#02476e", "#3aa8e0", "#0171a4", "#8bddf7"];

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [totalPosts, setTotalPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [postsRes, requestsRes, activitiesRes] = await Promise.all([
        axios.get("/posts"),
        axios.get("/volunteer_requests"),
        axios.get("/recent_activities"),
      ]);

      const posts = Array.isArray(postsRes?.data) ? postsRes.data : [];
      const requests = Array.isArray(requestsRes?.data) ? requestsRes.data : [];
      const activities = Array.isArray(activitiesRes?.data)
        ? activitiesRes.data
        : [];

      const newStats = [
        {
          label: "Total Posts",
          value: totalPosts.length,
          icon: <FaHandsHelping className="text-xl" />,
          color: darkMode 
            ? "bg-gradient-to-br from-[#3aa8e0] to-[#02476e]"
            : "bg-gradient-to-br from-[#02476e] to-[#3aa8e0]",
          trend: "up",
        },
        {
          label: "Active Volunteers",
          value: requests.length > 0
            ? [...new Set(requests.map((r) => r?.volunteerEmail || "").filter(Boolean))].length
            : 0,
          icon: <FaUsers className="text-xl" />,
          color: darkMode
            ? "bg-gradient-to-br from-[#6bd3f3] to-[#0171a4]"
            : "bg-gradient-to-br from-[#0171a4] to-[#6bd3f3]",
          trend: "up",
        },
        {
          label: "Upcoming Events",
          value: posts.filter((p) => p?.deadline && new Date(p.deadline) > new Date()).length,
          icon: <FaCalendarAlt className="text-xl" />,
          color: darkMode
            ? "bg-gradient-to-br from-[#8bddf7] to-[#02476e]"
            : "bg-gradient-to-br from-[#02476e] to-[#8bddf7]",
          trend: "steady",
        },
        {
          label: "Completion Rate",
          value: requests.length > 0
            ? `${Math.round((requests.filter((r) => r?.status === "completed").length / requests.length) * 100)}%`
            : "0%",
          icon: <FaChartLine className="text-xl" />,
          color: darkMode
            ? "bg-gradient-to-br from-[#6bd3f3] to-[#3aa8e0]"
            : "bg-gradient-to-br from-[#3aa8e0] to-[#6bd3f3]",
          trend: "up",
        },
      ];

      const validPosts = posts.filter((post) => post?.deadline && post?.title && post?.category);
      const newUpcomingEvents = validPosts
        .filter((post) => new Date(post.deadline) > new Date())
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 3);

      setStats(newStats);
      setRecentActivities(activities);
      setUpcomingEvents(newUpcomingEvents);
    } catch (error) {
      console.error("Dashboard data error:", error);
      toast.error("Failed to load dashboard data");
      setStats([]);
      setRecentActivities([]);
      setUpcomingEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    allVolunteersPromise()
      .then((data) => {
        setTotalPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setIsLoading(false);
      });
    
    // Check for saved theme preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Update stats colors when dark mode changes
    fetchDashboardData();
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const filteredActivities = recentActivities.filter(activity =>
    activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activityData = [
    { name: "Jan", events: 12, volunteers: 8 },
    { name: "Feb", events: 19, volunteers: 12 },
    { name: "Mar", events: 15, volunteers: 10 },
    { name: "Apr", events: 22, volunteers: 18 },
    { name: "May", events: 18, volunteers: 14 },
    { name: "Jun", events: 25, volunteers: 20 },
  ];

  const categoryData = upcomingEvents.reduce((acc, event) => {
    const existing = acc.find((item) => item.name === event.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: event.category, value: 1 });
    }
    return acc;
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6bd3f3]"></div>
      </div>
    );
  }

  return (
    <div className={`p-6 space-y-8 min-h-screen transition-colors duration-300 `}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#02476e] dark:text-[#6bd3f3]">
            Volunteer Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Welcome back, {user?.email?.split("@")[0]}
          </p>
        </div>
        
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search activities..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
          </button>
          
          <button 
            className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={fetchDashboardData}
          >
            <FiRefreshCw className="text-lg" />
          </button>
          
          <div className="relative">
            <button className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <FaRegBell className="text-lg" />
            </button>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-[#02476e] dark:bg-[#6bd3f3] flex items-center justify-center text-white font-medium">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300 hidden md:inline">
              {user?.email}
            </span>
            <FiChevronDown className="text-gray-500 dark:text-gray-400 hidden md:block" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {["overview", "volunteers", "events", "analytics"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm capitalize transition-colors ${
              activeTab === tab
                ? "text-[#02476e] dark:text-[#6bd3f3] border-b-2 border-[#02476e] dark:border-[#6bd3f3]"
                : "text-gray-500 dark:text-gray-400 hover:text-[#3aa8e0] dark:hover:text-[#8bddf7]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#02476e] to-[#3aa8e0] dark:from-[#3aa8e0] dark:to-[#02476e] rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {user?.email?.split("@")[0]}!
            </h1>
            <p className="mt-2 opacity-90">
              Here's what's happening with your volunteer community
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
            <FiPlusCircle className="mr-2" />
            Create New Post
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${stat.color} rounded-xl p-6 text-white shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm font-medium opacity-90">{stat.label}</p>
              </div>
              <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {stat.trend === "up" ? "↑ Increased" : stat.trend === "down" ? "↓ Decreased" : "↔ Steady"}
              </span>
              <span className="text-xs ml-2 opacity-80">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#02476e] dark:text-[#6bd3f3]">
                Volunteer Activity Trends
              </h2>
              <div className="flex space-x-2">
                <button className="text-xs px-3 py-1 bg-[#6bd3f3] dark:bg-[#02476e] text-white rounded-full">
                  Monthly
                </button>
                <button className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  Weekly
                </button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6bd3f3" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6bd3f3" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#02476e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#02476e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke={darkMode ? "#374151" : "#f0f0f0"} 
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1F2937' : '#fff',
                      border: darkMode ? '1px solid #374151' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      color: darkMode ? '#F3F4F6' : '#111827'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="events" 
                    stroke="#6bd3f3" 
                    fillOpacity={1} 
                    fill="url(#colorEvents)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volunteers" 
                    stroke="#02476e" 
                    fillOpacity={1} 
                    fill="url(#colorVolunteers)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#02476e] dark:text-[#6bd3f3]">
                Recent Activities
              </h2>
              <button className="text-sm text-[#3aa8e0] dark:text-[#8bddf7] hover:text-[#02476e] dark:hover:text-[#6bd3f3] flex items-center">
                View All <FiChevronDown className="ml-1" />
              </button>
            </div>
            
            {filteredActivities.length > 0 ? (
              <div className="space-y-4">
                {filteredActivities.slice(0, 5).map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#e1f5fe] dark:bg-[#0a2a3e] flex items-center justify-center text-[#3aa8e0] dark:text-[#6bd3f3] mr-3">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {activity.user} •{" "}
                        {format(parseISO(activity.timestamp), "MMM d, h:mm a")}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-[#e1f5fe] dark:bg-[#0a2a3e] text-[#3aa8e0] dark:text-[#6bd3f3] rounded-full">
                      {activity.type}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No activities found matching your search
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Category Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-[#02476e] dark:text-[#6bd3f3] mb-6">
              Event Categories
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => (
                      <text 
                        x={0} 
                        y={0} 
                        fill={darkMode ? '#F3F4F6' : '#111827'} 
                        textAnchor="middle" 
                        dominantBaseline="central"
                      >
                        {`${name} ${(percent * 100).toFixed(0)}%`}
                      </text>
                    )}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? '#1F2937' : '#fff',
                      border: darkMode ? '1px solid #374151' : '1px solid #e2e8f0',
                      borderRadius: '8px',
                      color: darkMode ? '#F3F4F6' : '#111827'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#02476e] dark:text-[#6bd3f3]">
                Upcoming Events
              </h2>
              <button className="text-sm text-[#3aa8e0] dark:text-[#8bddf7] hover:text-[#02476e] dark:hover:text-[#6bd3f3] flex items-center">
                View All <FiChevronDown className="ml-1" />
              </button>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div
                    key={event._id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-xs dark:hover:shadow-gray-800/50 transition-all bg-gradient-to-r from-white to-[#f7fcff] dark:from-gray-800 dark:to-gray-900"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {format(parseISO(event.deadline), "MMM d, yyyy • h:mm a")}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-[#e1f5fe] dark:bg-[#0a2a3e] text-[#3aa8e0] dark:text-[#6bd3f3] rounded-full">
                        {event.category}
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, event.volunteersNeeded))].map(
                            (_, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-[#6bd3f3] border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium text-white"
                              >
                                {i + 1}
                              </div>
                            )
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          {event.volunteersNeeded} volunteers needed
                        </span>
                      </div>
                      
                      <button className="text-xs px-3 py-1 bg-[#02476e] dark:bg-[#6bd3f3] hover:bg-[#013353] dark:hover:bg-[#3aa8e0] text-white rounded-full transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No upcoming events scheduled
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;