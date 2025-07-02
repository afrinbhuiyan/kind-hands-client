import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaImage,
  FaMapMarkerAlt,
  FaUsers,
  FaUser,
  FaEnvelope,
  FaChevronDown,
  FaCalendarAlt,
  FaTag,
  FaInfoCircle,
  FaMagic,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { addVolunteerPost } from "../../services/api/addVolunteerApi";

const AddVolunteer = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    volunteersNeeded: 1,
    startDate: new Date(),
    endDate: new Date(),
    deadline: new Date(),
    skillsRequired: [],
    isRecurring: false,
    currentSkill: "",
    organizerName: user?.displayName,
    organizerEmail: user?.email,
    organizerPhoto: user?.photoURL,
  });
  const [activeStep, setActiveStep] = useState(1);
  const [previewImage, setPreviewImage] = useState("");

  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Details" },
    { id: 3, name: "Logistics" },
    { id: 4, name: "Review" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleAddSkill = () => {
    if (
      formData.currentSkill &&
      !formData.skillsRequired.includes(formData.currentSkill)
    ) {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, prev.currentSkill],
        currentSkill: "",
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((s) => s !== skill),
    }));
  };

  const uploadToImgBB = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error("Image upload failed");
      }

      return data.data.url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.match("image.*")) {
      Swal.fire("Error", "Please select an image file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Error", "Image must be smaller than 5MB", "error");
      return;
    }

    try {
      // Show loading indicator
      Swal.fire({
        title: "Uploading Image",
        text: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Upload to imgBB
      const imageUrl = await uploadToImgBB(file);

      // Update state with the new image URL
      setPreviewImage(imageUrl);
      setFormData((prev) => ({ ...prev, thumbnail: imageUrl }));

      Swal.fire("Success", "Image uploaded successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to upload image", "error");
    }
  };

  const nextStep = (e) => {
    if (e) e.preventDefault();

    let isValid = true;

    if (activeStep === 1) {
      if (!formData.title || !formData.description || !formData.thumbnail) {
        isValid = false;
        Swal.fire("Error", "Please fill in all required fields", "error");
      }
    } else if (activeStep === 2) {
      if (!formData.category) {
        isValid = false;
        Swal.fire("Error", "Please select a category", "error");
      }
    } else if (activeStep === 3) {
      if (!formData.location || !formData.volunteersNeeded) {
        isValid = false;
        Swal.fire("Error", "Please fill in all required fields", "error");
      }
    }

    if (isValid) {
      setActiveStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (
      !formData.thumbnail ||
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location ||
      !formData.volunteersNeeded
    ) {
      Swal.fire("Error", "Please fill in all required fields", "error");
      return;
    }

    try {
      // Add organizer information to the form data
      const submissionData = {
        ...formData,
        organizer: {
          name: user?.displayName || "",
          email: user?.email || "",
          photoURL: user?.photoURL || "",
        },
        createdAt: new Date(),
      };

      const data = await addVolunteerPost(submissionData);
      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Volunteer opportunity created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Reset form after successful submission
        setFormData({
          thumbnail: "",
          title: "",
          description: "",
          category: "",
          location: "",
          volunteersNeeded: 1,
          startDate: new Date(),
          endDate: new Date(),
          deadline: new Date(),
          skillsRequired: [],
          isRecurring: false,
          currentSkill: "",
        });
        setPreviewImage("");
        setActiveStep(1);
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl"
      >
        {/* Floating Card Container */}
        <div className=" dark:bg-gray-800 rounded-3xl overflow-hidden border border-white/20 dark:border-gray-700/50">
          {/* Gradient Header */}
          <div className="relative text-[#024870]  p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6bd3f3] rounded-full filter blur-[80px] opacity-30"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold">
                Create Volunteer Opportunity
              </h1>
              <p className="text-[#6bd3f3] mt-2">
                Help connect volunteers with meaningful causes
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="px-6 pt-6">
            <div className="flex justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0">
                <motion.div
                  className="h-full bg-[#6bd3f3]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeStep / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative z-10 flex flex-col items-center"
                >
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      activeStep >= step.id
                        ? "bg-[#6bd3f3] text-white shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {step.id}
                  </button>
                  <span
                    className={`text-xs mt-2 ${
                      activeStep >= step.id
                        ? "text-[#6bd3f3] font-medium"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {activeStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Opportunity Image
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#6bd3f31e] dark:bg-gray-700 flex items-center justify-center">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaImage className="text-gray-400 text-2xl" />
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <div className="px-4 py-2 bg-[#6bd3f3]/10 hover:bg-[#6bd3f3]/20 text-[#6bd3f3] rounded-lg border border-[#6bd3f3]/30 flex items-center gap-2 transition-colors">
                              <FaMagic />
                              <span>
                                {previewImage ? "Change Image" : "Upload Image"}
                              </span>
                            </div>
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Max size: 5MB (JPG, PNG, GIF)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Opportunity Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Beach Cleanup Volunteers Needed"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-700 border focus:outline-none border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent hover:border-[#6bd3f3] transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Brief Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell volunteers about this opportunity..."
                        rows={3}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:outline-none focus:ring-[#6bd3f3] focus:border-transparent transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Details */}
                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent appearance-none pr-10"
                        >
                          <option value="">Select a category</option>
                          <option value="Environment">Environment</option>
                          <option value="Education">Education</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Animals">Animals</option>
                          <option value="Community">Community</option>
                          <option value="Disaster Relief">
                            Disaster Relief
                          </option>
                        </select>
                        <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                          <FaChevronDown className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Required Skills
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {formData.skillsRequired.map((skill) => (
                          <motion.span
                            key={skill}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#6bd3f3]/20 text-[#024870] dark:text-[#6bd3f3]"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </motion.span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="currentSkill"
                          value={formData.currentSkill}
                          onChange={handleChange}
                          placeholder="Add a required skill"
                          className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border focus:outline-none border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          className="px-4 py-2 bg-[#6bd3f3] text-white rounded-lg hover:bg-[#5bc2e3] transition-colors flex items-center gap-1"
                        >
                          <FaPlus className="w-3 h-3" /> Add
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="recurring"
                        checked={formData.isRecurring}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isRecurring: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 text-[#6bd3f3] focus:outline-none focus:ring-[#6bd3f3] border-[#6bd3f3]/30 rounded"
                      />
                      <label
                        htmlFor="recurring"
                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                      >
                        This is a recurring opportunity
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Logistics */}
                {activeStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Location
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City or exact address"
                            required
                            className="w-full px-4 py-3 bg-white focus:outline-none dark:bg-gray-700 border border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent transition-all pl-10"
                          />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <FaMapMarkerAlt className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Volunteers Needed
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="volunteersNeeded"
                            value={formData.volunteersNeeded}
                            onChange={handleChange}
                            placeholder="How many volunteers?"
                            min="1"
                            required
                            className="w-full px-4 py-3 bg-white focus:outline-none dark:bg-gray-700 border border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent transition-all pl-10"
                          />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <FaUsers className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Start Date
                        </label>
                        <div className="relative">
                          <DatePicker
                            selected={formData.startDate}
                            onChange={(date) =>
                              handleDateChange(date, "startDate")
                            }
                            className="w-full px-4 py-3 bg-white focus:outline-none dark:bg-gray-700 border border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent pl-10"
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()}
                            required
                            placeholderText="Select start date"
                          />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <FaCalendarAlt className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          End Date
                        </label>
                        <div className="relative">
                          <DatePicker
                            selected={formData.endDate}
                            onChange={(date) =>
                              handleDateChange(date, "endDate")
                            }
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border focus:outline-none border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent pl-10"
                            dateFormat="MMMM d, yyyy"
                            minDate={formData.startDate}
                            required
                            placeholderText="Select end date"
                          />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <FaCalendarAlt className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Application Deadline
                        </label>
                        <div className="relative">
                          <DatePicker
                            selected={formData.deadline}
                            onChange={(date) =>
                              handleDateChange(date, "deadline")
                            }
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border focus:outline-none border-[#6bd3f3]/30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#6bd3f3] focus:border-transparent pl-10"
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()}
                            required
                            placeholderText="Select deadline date"
                          />
                          <div className="absolute left-3 top-3 text-gray-400">
                            <IoMdTime className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {activeStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-[#f8fafc] dark:bg-gray-700/50 rounded-xl p-6">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                        Opportunity Summary
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Title
                            </h4>
                            <p className="mt-1 text-gray-800 dark:text-gray-200">
                              {formData.title || "Not provided"}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Description
                            </h4>
                            <p className="mt-1 text-gray-800 dark:text-gray-200">
                              {formData.description || "Not provided"}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Category
                            </h4>
                            <p className="mt-1 text-gray-800 dark:text-gray-200">
                              {formData.category || "Not selected"}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Location
                            </h4>
                            <p className="mt-1 text-gray-800 dark:text-gray-200">
                              {formData.location || "Not provided"}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Dates
                            </h4>
                            <p className="mt-1 text-gray-800 dark:text-gray-200">
                              {formData.startDate?.toLocaleDateString()} -{" "}
                              {formData.endDate?.toLocaleDateString()}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Volunteers Needed
                            </h4>
                            <p className="mt-1 text-gray-800 dark:text-gray-200">
                              {formData.volunteersNeeded}
                            </p>
                          </div>
                        </div>
                      </div>

                      {previewImage && (
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Preview Image
                          </h4>
                          <div className="w-full h-48 rounded-lg overflow-hidden">
                            <img
                              src={previewImage}
                              alt="Opportunity preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#f8fafc] dark:bg-gray-700/50 rounded-xl p-6">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                        Organizer Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Organizer Name
                          </h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">
                            {user?.displayName || "Not available"}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Organizer Email
                          </h4>
                          <p className="mt-1 text-gray-800 dark:text-gray-200">
                            {user?.email || "Not available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {activeStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-[#6bd3f3] hover:bg-[#5bc2e3] text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    Continue
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#024870] to-[#6bd3f3] hover:from-[#01314d] hover:to-[#5bc2e3] text-white rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    Publish Opportunity
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddVolunteer;
