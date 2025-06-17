const API_URL = import.meta.env.VITE_API_URL;

export const createVolunteerRequest = async (requestData, accessToken) => {
  const response = await fetch(`${API_URL}/volunteer_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error("Failed to create volunteer request");
  }

  return response.json();
};

export const getMyVolunteerRequests = async (email, accessToken) => {
  console.log(accessToken);
  const res = await fetch(`${API_URL}/my-volunteer-requests?email=${email}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch volunteer requests");
  return res.json();
};

export const deleteVolunteerRequestById = async (id, accessToken) => {
  const res = await fetch(`${API_URL}/volunteer-requests/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  if (!res.ok || data.deletedCount === 0) {
    throw new Error("Failed to cancel request");
  }

  return data;
};
