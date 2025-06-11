import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { toast } from "sonner";

const MyVolunteerRequestPost = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-volunteer-requests?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyRequests(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  // Cancel handler
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/volunteer-requests/${id}`, {
          method: "DELETE",
        });

        const result = await res.json();
        if (result.deletedCount > 0) {
          toast.success("Request cancelled successfully.");
          setMyRequests((prev) => prev.filter((req) => req._id !== id));
        } else {
          toast.error("Failed to cancel request.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
      }
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        My Volunteer Requests ({myRequests.length})
      </h1>

      {myRequests.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven't made any volunteer requests yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((req, idx) => (
                <tr key={req._id}>
                  <td>{idx + 1}</td>
                  <td>{req.title}</td>
                  <td>{req.category}</td>
                  <td>{new Date(req.deadline).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`font-semibold ${
                        req.status === "requested"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(req._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Cancel
                    </button>
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

export default MyVolunteerRequestPost;
