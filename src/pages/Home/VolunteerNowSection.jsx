import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
console.log(motion)

const VolunteerNowSection = () => {
  const [volunteerPosts, setVolunteerPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts/home")
      .then((res) => res.json())
      .then((data) => setVolunteerPosts(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Volunteer Needs Now
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {volunteerPosts.map((post) => (
            <div
              key={post._id}
              className="card bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p>
                  <strong>Category:</strong> {post.category}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
                <Link to={`/volunteer/${post._id}`} className="btn btn-primary mt-2">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 👇 See All Button */}
        <div className="text-center mt-8">
          <Link to="/volunteers" className="btn btn-outline btn-secondary">
            See All
          </Link>
        </div>
      </motion.div>

      {/* 🟦 Extra Section 1 – About Volunteering */}
      <motion.div
        className="mt-20 bg-base-100 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4">Why Volunteer?</h2>
        <p className="text-gray-600">
          Volunteering connects you to others, boosts your confidence, and
          brings purpose to your life. Join thousands of volunteers making an
          impact in their community today.
        </p>
      </motion.div>

      {/* 🟪 Extra Section 2 – How It Works */}
      <motion.div
        className="mt-12 bg-base-200 p-8 rounded-lg shadow"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>1. Browse available volunteer opportunities</li>
          <li>2. View details and requirements</li>
          <li>3. Sign up or contact the organizer</li>
          <li>4. Make a positive impact!</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default VolunteerNowSection;
