import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
console.log(motion)
import { AuthContext } from "../../context/AuthContext";

const AddVolunteer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const post = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline: deadline,
      organizerName: user?.displayName,
      organizerEmail: user?.email,
    };

    try {
      const res = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const data = await res.json();
      if (data.insertedId || data.acknowledged) {
        Swal.fire({
          title: "Success!",
          text: "Volunteer Post Added Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        form.reset();
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Add Volunteer Need Post</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="thumbnail" placeholder="Thumbnail URL" required className="input input-bordered" />
        <input type="text" name="title" placeholder="Post Title" required className="input input-bordered" />
        <textarea name="description" placeholder="Description" required className="textarea textarea-bordered md:col-span-2" />

        <select name="category" required className="select select-bordered">
          <option value="">Select Category</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Social Service">Social Service</option>
          <option value="Animal Welfare">Animal Welfare</option>
        </select>

        <input type="text" name="location" placeholder="Location" required className="input input-bordered" />
        <input type="number" name="volunteersNeeded" placeholder="Volunteers Needed" required className="input input-bordered" />

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        <input type="text" name="organizerName" value={user?.displayName || ""} readOnly className="input input-bordered bg-gray-100" />
        <input type="email" name="organizerEmail" value={user?.email || ""} readOnly className="input input-bordered bg-gray-100" />

        <button type="submit" className="btn btn-primary md:col-span-2 mt-4">
          Add Post
        </button>
      </form>
    </motion.div>
  );
};

export default AddVolunteer;
