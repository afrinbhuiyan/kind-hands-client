import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

const UpdatePostModal = ({ isOpen, onClose, postData, refetch }) => {
  const { user } = useContext(AuthContext);
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postData?.deadline) {
      setDeadline(new Date(postData.deadline));
    }
  }, [postData]);

  if (!isOpen || !postData) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const updatedPost = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: form.volunteersNeeded.value,
      deadline: deadline.toISOString().split("T")[0],
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    try {
      const res = await fetch(`http://localhost:5000/my-posts/${postData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (res.ok) {
        Swal.fire("Success", "Post updated successfully", "success");
        refetch();
        onClose();
      } else {
        throw new Error("Failed to update post");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-md shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Update Volunteer Post
        </h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="thumbnail"
            defaultValue={postData.thumbnail}
            placeholder="Thumbnail URL"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="title"
            defaultValue={postData.title}
            placeholder="Post Title"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            defaultValue={postData.description}
            placeholder="Description"
            required
            className="w-full border px-3 py-2 rounded"
          ></textarea>
          <select
            name="category"
            defaultValue={postData?.category}
            className="w-full border px-3 py-2 rounded"
            required
          >
            {/* <option value="">{postData?.category ? postData.category : "Select Category"}</option> */}
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social service">Social Service</option>
            <option value="animal welfare">Animal Welfare</option>
          </select>
          <input
            type="text"
            name="location"
            defaultValue={postData.location}
            placeholder="Location"
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            name="volunteersNeeded"
            defaultValue={postData.volunteersNeeded}
            placeholder="No. of Volunteers Needed"
            required
            min="1"
            className="w-full border px-3 py-2 rounded"
          />
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            readOnly
            value={user?.displayName}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
          <input
            type="email"
            readOnly
            value={user?.email}
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostModal;
