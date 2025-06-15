const API_URL = import.meta.env.VITE_API_URL;

export const getPostById = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
};

export const decrementVolunteersCount = async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}/decrement-volunteers`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Failed to update count");
  return response.json();
};