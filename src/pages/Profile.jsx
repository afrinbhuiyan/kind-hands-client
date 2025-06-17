import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaTwitter,
  FaBriefcase,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useDynamicTitle from "../hooks/useDynamicTitle";
import Spinner from "../components/Spinner";

const Profile = () => {
  const { user, updateUserProfile, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  useDynamicTitle("Profile");

  const [editData, setEditData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    photoURL: user?.photoURL || "",
    bio: user?.bio || "",
    skills: user?.skills || [],
    social: user?.social || {
      linkedin: "",
      github: "",
      twitter: "",
      website: "",
    },
    location: user?.location || "",
    experience: user?.experience || [],
    education: user?.education || [],
    currentPosition: user?.currentPosition || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      social: {
        ...prev.social,
        [name]: value,
      },
    }));
  };

  const handleSkillChange = (e) => {
    const value = e.target.value;
    setEditData((prev) => ({
      ...prev,
      skills: value.split(",").map((skill) => skill.trim()),
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...editData.experience];
    updatedExperience[index][field] = value;
    setEditData((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...editData.education];
    updatedEducation[index][field] = value;
    setEditData((prev) => ({ ...prev, education: updatedEducation }));
  };

  const addExperience = () => {
    setEditData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", period: "", description: "" },
      ],
    }));
  };

  const addEducation = () => {
    setEditData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { institution: "", degree: "", field: "", period: "" },
      ],
    }));
  };

  const removeExperience = (index) => {
    setEditData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const removeEducation = (index) => {
    setEditData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (updating) return;

    setUpdating(true);
    try {
      await updateUserProfile(editData);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error.message);
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || !user) {
    return <Spinner/>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-[#024870] to-[#6bd3f3] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          <div className="absolute -bottom-20 left-8">
            <div className="relative group">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-40 h-40 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-lg transition-transform group-hover:scale-105"
                />
              ) : (
                <FaUserCircle className="w-40 h-40 text-white bg-gray-300 dark:bg-gray-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute bottom-2 right-2 bg-[#024870] text-white p-2 rounded-full hover:bg-[#013456] shadow-md transition-all transform hover:scale-110"
                title="Edit Profile"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-24 px-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                {user.displayName || "No name provided"}
              </h1>
              {user.currentPosition && (
                <p className="text-lg text-[#024870] dark:text-[#6bd3f3] mt-1">
                  {user.currentPosition}
                </p>
              )}
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {user.social?.linkedin && (
                <a
                  href={user.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] hover:text-[#005582] transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              )}
              {user.social?.github && (
                <a
                  href={user.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="GitHub"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              )}
              {user.social?.twitter && (
                <a
                  href={user.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1DA1F2] hover:text-[#1991db] transition-colors"
                  title="Twitter"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
              )}
              {user.social?.website && (
                <a
                  href={user.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  title="Website"
                >
                  <FaGlobe className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>

          {user.bio && (
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {user.bio}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Detail icon={<FaEnvelope />} value={user.email} />
            {user.phoneNumber && (
              <Detail icon={<FaPhone />} value={user.phoneNumber} />
            )}
            {user.location && (
              <Detail icon={<FaMapMarkerAlt />} value={user.location} />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Skills & Expertise
              </h2>
              {isEditing && (
                <button
                  onClick={() =>
                    setEditData((prev) => ({
                      ...prev,
                      skills: [...prev.skills, ""],
                    }))
                  }
                  className="text-sm text-[#024870] dark:text-[#6bd3f3] hover:underline"
                >
                  + Add Skill
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <Input
                  name="skills"
                  label="Skills (comma separated)"
                  value={editData.skills.join(", ")}
                  onChange={handleSkillChange}
                />
                <div className="flex flex-wrap gap-2">
                  {editData.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#6bd3f3]/20 text-[#024870] dark:text-[#6bd3f3] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {user.skills?.length > 0 ? (
                  user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#6bd3f3]/20 text-[#024870] dark:text-[#6bd3f3] rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No skills added yet
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Contact Information
            </h2>
            <div className="space-y-3">
              <Detail icon={<FaEnvelope />} value={user.email} />
              {user.phoneNumber && (
                <Detail icon={<FaPhone />} value={user.phoneNumber} />
              )}
              {user.location && (
                <Detail icon={<FaMapMarkerAlt />} value={user.location} />
              )}

              {isEditing && (
                <>
                  <Input
                    name="email"
                    label="Email"
                    value={editData.email}
                    disabled
                  />
                  <Input
                    name="phoneNumber"
                    label="Phone"
                    value={editData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="location"
                    label="Location"
                    value={editData.location}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Social Links
            </h2>
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  name="linkedin"
                  label="LinkedIn URL"
                  value={editData.social.linkedin}
                  onChange={handleSocialChange}
                />
                <Input
                  name="github"
                  label="GitHub URL"
                  value={editData.social.github}
                  onChange={handleSocialChange}
                />
                <Input
                  name="twitter"
                  label="Twitter URL"
                  value={editData.social.twitter}
                  onChange={handleSocialChange}
                />
                <Input
                  name="website"
                  label="Website URL"
                  value={editData.social.website}
                  onChange={handleSocialChange}
                />
              </div>
            ) : (
              <div className="space-y-3">
                {user.social?.linkedin && (
                  <SocialLink
                    icon={<FaLinkedin />}
                    platform="LinkedIn"
                    url={user.social.linkedin}
                  />
                )}
                {user.social?.github && (
                  <SocialLink
                    icon={<FaGithub />}
                    platform="GitHub"
                    url={user.social.github}
                  />
                )}
                {user.social?.twitter && (
                  <SocialLink
                    icon={<FaTwitter />}
                    platform="Twitter"
                    url={user.social.twitter}
                  />
                )}
                {user.social?.website && (
                  <SocialLink
                    icon={<FaGlobe />}
                    platform="Website"
                    url={user.social.website}
                  />
                )}
                {!user.social?.linkedin &&
                  !user.social?.github &&
                  !user.social?.twitter &&
                  !user.social?.website && (
                    <p className="text-gray-500 dark:text-gray-400">
                      No social links added
                    </p>
                  )}
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-2/3">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 font-medium ${
                activeTab === "overview"
                  ? "text-[#024870] dark:text-[#6bd3f3] border-b-2 border-[#024870] dark:border-[#6bd3f3]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-4 py-2 font-medium ${
                activeTab === "experience"
                  ? "text-[#024870] dark:text-[#6bd3f3] border-b-2 border-[#024870] dark:border-[#6bd3f3]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              Experience
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-2 font-medium ${
                activeTab === "education"
                  ? "text-[#024870] dark:text-[#6bd3f3] border-b-2 border-[#024870] dark:border-[#6bd3f3]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              Education
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  About Me
                </h2>
                {isEditing ? (
                  <Textarea
                    name="bio"
                    label="Bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {user.bio || "No bio provided"}
                  </p>
                )}

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Current Position
                  </h3>
                  {isEditing ? (
                    <Input
                      name="currentPosition"
                      label="Current Position"
                      value={editData.currentPosition}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      {user.currentPosition || "Not specified"}
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Professional Experience
                  </h2>
                  {isEditing && (
                    <button
                      onClick={addExperience}
                      className="flex items-center text-sm text-[#024870] dark:text-[#6bd3f3] hover:underline"
                    >
                      <FaBriefcase className="mr-1" /> Add Experience
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-6">
                    {editData.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <Input
                            name={`experience-${index}-title`}
                            label="Job Title"
                            value={exp.title}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            name={`experience-${index}-company`}
                            label="Company"
                            value={exp.company}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "company",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <Input
                            name={`experience-${index}-period`}
                            label="Period (e.g. 2020 - Present)"
                            value={exp.period}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "period",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <Textarea
                          name={`experience-${index}-description`}
                          label="Description"
                          value={exp.description}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                        <button
                          onClick={() => removeExperience(index)}
                          className="mt-2 text-sm text-red-500 hover:text-red-700"
                        >
                          Remove Experience
                        </button>
                      </div>
                    ))}
                    {editData.experience.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400">
                        No experience added yet
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.experience?.length > 0 ? (
                      user.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-[#024870] dark:border-[#6bd3f3] pl-4 py-1"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {exp.company}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {exp.period}
                          </p>
                          {exp.description && (
                            <p className="text-gray-600 dark:text-gray-300 mt-2">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No experience added yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "education" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Education
                  </h2>
                  {isEditing && (
                    <button
                      onClick={addEducation}
                      className="flex items-center text-sm text-[#024870] dark:text-[#6bd3f3] hover:underline"
                    >
                      <FaGraduationCap className="mr-1" /> Add Education
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-6">
                    {editData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <Input
                            name={`education-${index}-institution`}
                            label="Institution"
                            value={edu.institution}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "institution",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            name={`education-${index}-degree`}
                            label="Degree"
                            value={edu.degree}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <Input
                            name={`education-${index}-field`}
                            label="Field of Study"
                            value={edu.field}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "field",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            name={`education-${index}-period`}
                            label="Period (e.g. 2016 - 2020)"
                            value={edu.period}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "period",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <button
                          onClick={() => removeEducation(index)}
                          className="mt-2 text-sm text-red-500 hover:text-red-700"
                        >
                          Remove Education
                        </button>
                      </div>
                    ))}
                    {editData.education.length === 0 && (
                      <p className="text-gray-500 dark:text-gray-400">
                        No education added yet
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {user.education?.length > 0 ? (
                      user.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-4 border-[#024870] dark:border-[#6bd3f3] pl-4 py-1"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {edu.field} {edu.period && `• ${edu.period}`}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        No education added yet
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 border border-gray-200 dark:border-gray-700 z-10">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={updating}
              className="px-4 py-2 bg-[#024870] text-white rounded hover:bg-[#013456] disabled:opacity-70 flex items-center"
            >
              {updating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditData({
                  displayName: user.displayName || "",
                  email: user.email || "",
                  phoneNumber: user.phoneNumber || "",
                  photoURL: user.photoURL || "",
                  bio: user.bio || "",
                  skills: user.skills || [],
                  social: user.social || {
                    linkedin: "",
                    github: "",
                    twitter: "",
                    website: "",
                  },
                  location: user.location || "",
                  experience: user.experience || [],
                  education: user.education || [],
                  currentPosition: user.currentPosition || "",
                });
              }}
              className="px-4 py-2 border rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Input = ({
  name,
  label,
  value,
  onChange,
  disabled = false,
  type = "text",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] transition"
    />
  </div>
);

const Textarea = ({ name, label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-[#024870] focus:border-[#024870] dark:focus:ring-[#6bd3f3] dark:focus:border-[#6bd3f3] transition"
    />
  </div>
);

const Detail = ({ icon, value }) => (
  <div className="flex items-center">
    <span className="text-[#024870] dark:text-[#6bd3f3] mr-3 w-5 h-5 flex-shrink-0">
      {icon}
    </span>
    <span className="text-gray-700 dark:text-gray-300 truncate">{value}</span>
  </div>
);

const SocialLink = ({ icon, platform, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-[#024870] dark:hover:text-[#6bd3f3] transition-colors"
  >
    <span className="mr-3 w-5 h-5 flex-shrink-0">{icon}</span>
    <span className="truncate">{platform}</span>
  </a>
);

export default Profile;
