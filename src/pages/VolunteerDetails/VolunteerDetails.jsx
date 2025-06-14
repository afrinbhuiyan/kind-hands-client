import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
console.log(motion)
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
  FaShareAlt
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

const VolunteerDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [copied, setCopied] = useState(false);

  const galleryImages = [
    post?.thumbnail,
    "https://media.istockphoto.com/id/1498170916/photo/a-couple-is-taking-a-bag-of-food-at-the-food-and-clothes-bank.jpg?s=612x612&w=0&k=20&c=0fnD_g46lvoZ5NdzX5zYOSM4PzM95ezfs5uMe9D1QKs=",
    "https://capitalcampaignpro.com/wp-content/uploads/2023/02/capital-campaign-volunteers.jpg"
  ].filter(Boolean);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading.........
      </div>
    );
  }

  if (!post) {
    return (
      <motion.div
        className="text-center py-20 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Opportunity Not Found</h2>
          <p className="mb-6">The volunteer opportunity you're looking for doesn't exist or may have been removed.</p>
          <Link 
            to="/volunteers" 
            className="inline-flex items-center px-6 py-3 bg-[#024870] text-white rounded-lg hover:bg-[#01314d] transition-colors"
          >
            Browse Other Opportunities <FaChevronRight className="ml-2" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#024870] dark:text-gray-400 dark:hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/volunteers" className="ml-2 text-sm font-medium text-gray-700 hover:text-[#024870] dark:text-gray-400 dark:hover:text-white">
                Opportunities
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">{post.title}</span>
            </div>
          </li>
        </ol>
      </nav>

      <motion.div
        className="flex flex-col lg:flex-row gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="lg:w-1/2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="sticky top-8 space-y-4">

            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-w-16 aspect-h-10 bg-gray-100 dark:bg-gray-800">
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
                />
              </AnimatePresence>
              
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#024870] text-white">
                  {post.category}
                </span>
              </div>
              
              <button 
                onClick={copyToClipboard}
                className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-900/90 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label="Share"
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

            {galleryImages.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === index ? 'border-[#024870]' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {activeImage === index && (
                      <div className="absolute inset-0 bg-[#024870]/30" />
                    )}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
              <h3 className="font-medium text-lg mb-3 flex items-center">
                <IoMdTime className="text-[#024870] dark:text-[#6bd3f3] mr-2" />
                Quick Facts
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Posted</span>
                  <span className="font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Duration</span>
                  <span className="font-medium">{post.duration || "Ongoing"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Commitment</span>
                  <span className="font-medium">{post.timeCommitment || "Flexible"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Location</span>
                  <span className="font-medium flex items-center">
                    <FaMapMarkerAlt className="mr-1.5 text-sm" /> {post.location}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="lg:w-1/2"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header with title */}
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
              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaHandsHelping className="text-[#024870] dark:text-[#6bd3f3] mr-2" />
                  About This Opportunity
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Opportunity Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailCard 
                    icon={<FaUsers />}
                    title="Volunteers Needed"
                    value={`${post.volunteersNeeded} positions`}
                  />
                  <DetailCard 
                    icon={<FaCalendarAlt />}
                    title="Application Deadline"
                    value={new Date(post.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
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
                    <h3 className="font-semibold text-gray-900 dark:text-white">{post.organizerName}</h3>
                    <a 
                      href={`mailto:${post.organizerEmail}`}
                      className="inline-flex items-center text-[#024870] dark:text-[#6bd3f3] hover:underline mt-1"
                    >
                      <FaEnvelope className="mr-2" /> {post.organizerEmail}
                    </a>
                  </div>
                </div>
              </section>
            </div>

            {/* Fixed CTA */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-4 shadow-lg">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-[#024870] to-[#6bd3f3] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <FaHandsHelping className="text-lg" />
                <span>Apply Now</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <VolunteerRequestModal
        post={post}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

// DetailCard component
const DetailCard = ({ icon, title, value }) => (
  <div className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/20 rounded-lg">
    <div className="p-2 rounded-lg bg-[#024870]/10 dark:bg-[#1e3a8a]/20 text-[#024870] dark:text-[#3b82f6] mr-3">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default VolunteerDetails;