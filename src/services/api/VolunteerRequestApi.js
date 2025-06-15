const API_URL = import.meta.env.VITE_API_URL;

export const createVolunteerRequest = async (requestData) => {
  const response = await fetch(`${API_URL}/volunteer_requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to create volunteer request");
  }

  return response.json();
};

export const getMyVolunteerRequests = async (email) => {
  const res = await fetch(`${API_URL}/my-volunteer-requests?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch volunteer requests");
  return res.json();
};

export const deleteVolunteerRequestById = async (id) => {
  const res = await fetch(`${API_URL}/volunteer-requests/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  if (!res.ok || data.deletedCount === 0) {
    throw new Error("Failed to cancel request");
  }

  return data;
};