// src/pages/VolunteerDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
console.log(motion)

const VolunteerDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div className="text-center py-20">Loading post...</div>;

  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
      <p className="mb-4 text-gray-600">{post.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <p><strong>Category:</strong> {post.category}</p>
        <p><strong>Location:</strong> {post.location}</p>
        <p><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
        <p><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
        <p><strong>Organizer:</strong> {post.organizerName}</p>
        <p><strong>Email:</strong> {post.organizerEmail}</p>
      </div>

      <button className="btn btn-primary w-full">Be a Volunteer</button>
    </motion.div>
  );
};

export default VolunteerDetails;
