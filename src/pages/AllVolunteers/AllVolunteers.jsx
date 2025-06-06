import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
console.log(motion)

const AllVolunteers = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">All Volunteer Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={post.thumbnail}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{post.category}</p>
              <p className="text-gray-700 mt-2">{post.description.slice(0, 100)}...</p>
              <div className="mt-3 text-sm">
                <p><strong>Location:</strong> {post.location}</p>
                <p><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
                <p><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
              </div>
              <Link to={`/volunteer/${post._id}`}>
                <button className="btn btn-sm btn-primary mt-4 w-full">View Details</button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AllVolunteers;
