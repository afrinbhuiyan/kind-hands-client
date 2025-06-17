import {
  FiSettings,
  FiUser,
  FiLock,
  FiBell,
  FiCreditCard,
  FiChevronRight,
  FiEdit2,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import useDynamicTitle from "../hooks/useDynamicTitle";
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Settings = () => {
  useDynamicTitle("Settings");
  const [activeItem, setActiveItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const settingsSections = [
    {
      title: "Account",
      icon: <FiUser className="text-[#024870] dark:text-[#6bd3f3]" />,
      items: [
        {
          name: "Personal Information",
          content: <PersonalInfoForm close={() => setActiveItem(null)} />,
        },
        {
          name: "Login & Security",
          content: <SecuritySettings close={() => setActiveItem(null)} />,
        },
        {
          name: "Email Preferences",
          content: <EmailPreferences close={() => setActiveItem(null)} />,
        },
      ],
    },
    {
      title: "Notifications",
      icon: <FiBell className="text-[#024870] dark:text-[#6bd3f3]" />,
      items: [
        {
          name: "Push Notifications",
          content: <NotificationSettings type="push" close={() => setActiveItem(null)} />,
        },
        {
          name: "Email Notifications",
          content: <NotificationSettings type="email" close={() => setActiveItem(null)} />,
        },
        {
          name: "SMS Alerts",
          content: <NotificationSettings type="sms" close={() => setActiveItem(null)} />,
        },
      ],
    },
    {
      title: "Privacy",
      icon: <FiLock className="text-[#024870] dark:text-[#6bd3f3]" />,
      items: [
        {
          name: "Data Sharing",
          content: <PrivacySettings type="data" close={() => setActiveItem(null)} />,
        },
        {
          name: "Privacy Settings",
          content: <PrivacySettings type="privacy" close={() => setActiveItem(null)} />,
        },
        {
          name: "Account Visibility",
          content: <PrivacySettings type="visibility" close={() => setActiveItem(null)} />,
        },
      ],
    },
    {
      title: "Billing",
      icon: <FiCreditCard className="text-[#024870] dark:text-[#6bd3f3]" />,
      items: [
        {
          name: "Payment Methods",
          content: <BillingSettings type="payment" close={() => setActiveItem(null)} />,
        },
        {
          name: "Billing History",
          content: <BillingSettings type="history" close={() => setActiveItem(null)} />,
        },
        {
          name: "Subscription",
          content: <BillingSettings type="subscription" close={() => setActiveItem(null)} />,
        },
      ],
    },
  ];

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmAccountDeletion = () => {
    // console.log("Account deletion confirmed");
    setShowDeleteConfirm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <FiSettings className="w-6 h-6 text-[#024870] dark:text-[#6bd3f3] mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Account Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your preferences and privacy settings
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <div className="flex items-center mb-4">
                <div className="text-[#024870] dark:text-[#6bd3f3] mr-3">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-2 ml-9">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    whileHover={{ backgroundColor: "rgba(107, 211, 243, 0.1)" }}
                    className="flex justify-between items-center p-3 rounded-md cursor-pointer"
                    onClick={() => setActiveItem(item)}
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.name}
                    </span>
                    <div className="flex items-center">
                      <FiEdit2 className="text-gray-500 dark:text-gray-400 mr-2" />
                      <FiChevronRight className="text-gray-500 dark:text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 border-t border-red-200 dark:border-red-900 pt-6">
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-red-500 dark:text-red-400 mr-3" />
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
                Danger Zone
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDeleteAccount}
              className="px-4 py-2 border border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors flex items-center"
            >
              <FaExclamationTriangle className="mr-2" />
              Delete Account
            </motion.button>

            <AnimatePresence>
              {showDeleteConfirm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-md border border-red-200 dark:border-red-800">
                    <p className="text-red-600 dark:text-red-400 mb-3">
                      Are you sure you want to delete your account? This action
                      cannot be undone.
                    </p>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={confirmAccountDeletion}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Confirm Delete
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#11111180] bg-opacity-50 flex justify-end z-50"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white dark:bg-gray-800 w-full max-w-md h-full shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <motion.button
                  whileHover={{ x: -3 }}
                  onClick={() => setActiveItem(null)}
                  className="flex items-center text-[#024870] dark:text-[#6bd3f3] mb-6"
                >
                  <FiChevronRight className="rotate-180 mr-2" />
                  Back to Settings
                </motion.button>
                {activeItem.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PersonalInfoForm = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      Personal Information
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          placeholder="Your name"
        />
      </div>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      Security Settings
    </h2>
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 dark:text-gray-300 mb-1">Change Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          placeholder="New password"
        />
      </div>
    </div>
  </div>
);

const EmailPreferences = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      Email Preferences
    </h2>
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="newsletter"
          className="mr-2"
        />
        <label htmlFor="newsletter" className="text-gray-700 dark:text-gray-300">
          Receive newsletter
        </label>
      </div>
    </div>
  </div>
);

const NotificationSettings = ({ type }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      {type === 'push' && 'Push Notifications'}
      {type === 'email' && 'Email Notifications'}
      {type === 'sms' && 'SMS Alerts'}
    </h2>
  </div>
);

const PrivacySettings = ({ type }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      {type === 'data' && 'Data Sharing'}
      {type === 'privacy' && 'Privacy Settings'}
      {type === 'visibility' && 'Account Visibility'}
    </h2>
  </div>
);

const BillingSettings = ({ type }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
      {type === 'payment' && 'Payment Methods'}
      {type === 'history' && 'Billing History'}
      {type === 'subscription' && 'Subscription'}
    </h2>
  </div>
);

export default Settings;