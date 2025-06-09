import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyVolunteerNeedPost = () => {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-posts?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setMyPosts(data));
  }, [user?.email]);

  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Delete this post?",
      html: `<div class="text-left"><p class="mb-2">You're about to delete this post.</p></div>`,
      showCancelButton: true,
      confirmButtonColor: "#EA4744",
      cancelButtonColor: "#D2B48C",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      background: "#F5F4F1",
      customClass: {
        popup: "rounded-lg border-2 border-[#D2B48C]",
        title: "text-2xl font-semibold text-[#331A15]",
        htmlContainer: "text-[#5C3A21]",
        confirmButton: "px-6 py-2 rounded-md font-medium",
        cancelButton: "px-6 py-2 rounded-md font-medium",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/my-posts/${taskId}`, {
            method: "DELETE",
          });
          const data = await response.json();

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "The post has been removed.",
              icon: "success",
              background: "#F5F4F1",
              timer: 2000,
              showConfirmButton: false,
            });
            setMyPosts((prev) => prev.filter((post) => post._id !== taskId));
          } else {
            throw new Error(data.message || "Failed to delete post");
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonColor: "#f59e0b",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        My Volunteer Need Posts ({myPosts.length})
      </h2>

      {myPosts.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any volunteer posts yet.
        </p>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-[#f9f9f9] text-gray-700 uppercase text-left">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Deadline</th>
                <th className="py-3 px-4">Volunteers Needed</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map((post) => (
                <tr key={post._id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{post.title}</td>
                  <td className="py-3 px-4">{post.category}</td>
                  <td className="py-3 px-4">{post.deadline}</td>
                  <td className="py-3 px-4">{post.volunteersNeeded}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/update-post/${post._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyVolunteerNeedPost;
