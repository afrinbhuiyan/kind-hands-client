import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import Swal from "sweetalert2";

const VolunteerRequestModal = ({ post, isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState("");

  if (!isOpen || !post) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      postId: post._id,
      volunteerName: user?.displayName,
      volunteerEmail: user?.email,
      suggestion,
      status: "requested",
    };

    console.log(requestData);

    try {
      const res = await fetch("http://localhost:5000/volunteer-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await res.json();
      console.log(result);

      if (result.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Volunteer Post Added Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        onClose();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request.");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#111111a1] bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Be a Volunteer</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            readOnly
            value={post.thumbnail}
            className="input input-bordered col-span-2"
          />
          <input
            readOnly
            value={post.title}
            className="input input-bordered col-span-2"
          />
          <textarea
            readOnly
            value={post.description}
            className="textarea textarea-bordered col-span-2"
          />
          <input
            readOnly
            value={post.category}
            className="input input-bordered"
          />
          <input
            readOnly
            value={post.location}
            className="input input-bordered"
          />
          <input
            readOnly
            value={post.volunteersNeeded}
            className="input input-bordered"
          />
          <input
            readOnly
            value={new Date(post.deadline).toLocaleDateString()}
            className="input input-bordered"
          />
          <input
            readOnly
            value={post.organizerName}
            className="input input-bordered"
          />
          <input
            readOnly
            value={post.organizerEmail}
            className="input input-bordered"
          />
          <input
            readOnly
            value={user?.displayName}
            className="input input-bordered"
          />
          <input
            readOnly
            value={user?.email}
            className="input input-bordered"
          />

          <textarea
            placeholder="Your suggestion"
            className="textarea textarea-bordered col-span-2"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          ></textarea>

          <button type="submit" className="btn btn-primary col-span-2">
            Request
          </button>
          <button
            onClick={onClose}
            type="button"
            className="btn btn-secondary col-span-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteerRequestModal;
