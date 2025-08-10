import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import VolunteerRequestModal from "../../components/Volunteer/VolunteerRequestModal";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaUserTie,
  FaEnvelope,
  FaClock,
  FaHandsHelping,
  FaChevronRight,
  FaShareAlt,
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { toast } from "sonner";
import { ToastContainer } from "react-toastify";
import Spinner from "../../components/Spinner";
import {
  decrementVolunteersCount,
  getPostById,
} from "../../services/api/volunteerDetailsApi";

const VolunteerDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const galleryImages = [
    post?.thumbnail,
    "https://www.ardms.org/wp-content/uploads/2024/10/Why-Volunteer-OCT-2024-1024x791.png",
    "https://capitalcampaignpro.com/wp-content/uploads/2023/02/capital-campaign-volunteers.jpg",
  ].filter(Boolean);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleVolunteerClick = () => {
    if (!post) return;
    if (post.volunteersNeeded <= 0) {
      toast.error("No more volunteers needed");
      return;
    }
    setIsModalOpen(true);
  };

  const handleRequestSuccess = async () => {
    setIsProcessing(true);
    try {
      const updatedPost = await decrementVolunteersCount(id);
      setPost(updatedPost);
      await fetchPost();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to copy link.");
    }
  };

  if (loading) return <Spinner />;

  if (!post) {
    return (
      <motion.div
        className="text-center py-20 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Not Found</h2>
          <p className="mb-6 max-w-md mx-auto">
            The volunteer opportunity you're looking for doesn't exist or may
            have been removed.
          </p>
          <Link
            to="/volunteers"
            className="inline-flex items-center px-6 py-3 bg-[#024870] text-white rounded-lg hover:bg-[#01314d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#024870] focus:ring-offset-2"
            aria-label="Browse other volunteer opportunities"
          >
            Browse Other Opportunities <FaChevronRight className="ml-2" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="dark:bg-[#1f283b]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <ToastContainer position="bottom-right" />
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm">
            <li>
              <Link
                to="/"
                className="inline-flex items-center font-medium text-gray-700 hover:text-[#024870] dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <Link
                  to="/volunteers"
                  className="ml-2 font-medium text-gray-700 hover:text-[#024870] dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Opportunities
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 font-medium text-gray-500 dark:text-gray-300">
                  {post.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <motion.div
          className="flex flex-col lg:flex-row gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Column - Image Gallery and Quick Facts */}
          <motion.div
            className="lg:w-1/2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-4 lg:sticky lg:top-4">
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-800">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={galleryImages[activeImage]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    loading="lazy"
                  />
                </AnimatePresence>

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#024870] text-white">
                    {post.category}
                  </span>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#024870]"
                  aria-label="Share this opportunity"
                >
                  <FaShareAlt className="text-[#024870] dark:text-[#6bd3f3]" />
                </button>

                <AnimatePresence>
                  {copied && (
                    <motion.div
                      className="absolute top-14 right-4 px-3 py-1 bg-gray-800 text-white text-sm rounded-md"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Link copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Image Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === index
                          ? "border-[#024870]"
                          : "border-transparent hover:border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-[#024870]`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {activeImage === index && (
                        <div className="absolute inset-0 bg-[#024870]/30" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Facts Card */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-lg mb-3 flex items-center text-black dark:text-white">
                  <IoMdTime className="text-[#024870] dark:text-[#6bd3f3] mr-2" />
                  Quick Facts
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Posted
                    </span>
                    <span className="font-medium text-black dark:text-white">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Duration
                    </span>
                    <span className="font-medium text-black dark:text-white">
                      {post.duration || "Ongoing"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Commitment
                    </span>
                    <span className="font-medium text-black dark:text-white">
                      {post.timeCommitment || "Flexible"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Location
                    </span>
                    <span className="font-medium flex items-center text-black dark:text-white">
                      <FaMapMarkerAlt className="mr-1.5 text-sm" />{" "}
                      {post.location}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            className="lg:w-1/2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-100 dark:border-gray-700 p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h1>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <FaMapMarkerAlt className="mr-1.5" />
                  <span>{post.location}</span>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">
                {/* About Section */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaHandsHelping className="text-[#024870] dark:text-[#6bd3f3] mr-2" />
                    About This Opportunity
                  </h2>
                  <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.description}
                  </div>
                </section>

                {/* Details Section */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Opportunity Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailCard
                      icon={<FaUsers />}
                      title="Volunteers Needed"
                      value={`${post.volunteersNeeded} ${
                        post.volunteersNeeded === 1 ? "position" : "positions"
                      }`}
                    />
                    <DetailCard
                      icon={<FaCalendarAlt />}
                      title="Application Deadline"
                      value={new Date(post.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    />
                    <DetailCard
                      icon={<FaClock />}
                      title="Time Commitment"
                      value={post.timeCommitment || "Flexible"}
                    />
                    <DetailCard
                      icon={<IoMdTime />}
                      title="Duration"
                      value={post.duration || "Ongoing"}
                    />
                  </div>
                </section>

                {/* Organizer Section */}
                <section>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    About the Organizer
                  </h2>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#024870]/10 dark:bg-[#1e3a8a]/20 flex items-center justify-center text-[#024870] dark:text-[#3b82f6]">
                        <FaUserTie className="text-xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {post.organizerName}
                      </h3>
                      <a
                        href={`mailto:${post.organizerEmail}`}
                        className="inline-flex items-center text-[#024870] dark:text-[#6bd3f3] hover:underline mt-1 transition-colors"
                        aria-label="Contact organizer via email"
                      >
                        <FaEnvelope className="mr-2" /> {post.organizerEmail}
                      </a>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sticky Apply Button */}
              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-4 shadow-lg">
                <motion.button
                  disabled={post.volunteersNeeded <= 0 || isProcessing}
                  onClick={handleVolunteerClick}
                  className={`w-full py-4 font-semibold rounded-lg shadow-md flex items-center justify-center space-x-3 transition-all ${
                    post.volunteersNeeded <= 0
                      ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#024870] to-[#6bd3f3] text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#024870] focus:ring-offset-2"
                  }`}
                  whileHover={{
                    scale: post.volunteersNeeded <= 0 ? 1 : 1.01,
                  }}
                  whileTap={{ scale: post.volunteersNeeded <= 0 ? 1 : 0.99 }}
                  aria-label={
                    post.volunteersNeeded <= 0
                      ? "No volunteers needed"
                      : "Apply for this volunteer opportunity"
                  }
                >
                  <FaHandsHelping className="text-lg" />
                  <span>
                    {isProcessing
                      ? "Processing..."
                      : post.volunteersNeeded <= 0
                      ? "No Volunteers Needed"
                      : "Apply Now"}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <VolunteerRequestModal
          post={post}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleRequestSuccess}
        />
      </div>
    </div>
  );
};

const DetailCard = ({ icon, title, value }) => (
  <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg h-full">
    <div className="p-2 rounded-lg bg-[#024870]/10 dark:bg-[#1e3a8a]/20 text-[#024870] dark:text-[#3b82f6] mr-3 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default VolunteerDetails;
