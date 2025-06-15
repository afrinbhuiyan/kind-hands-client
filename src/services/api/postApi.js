const API_URL = import.meta.env.VITE_API_URL;

export const getMyPosts = async (email) => {
  const res = await fetch(`${API_URL}/my-posts?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const deletePostById = async (id) => {
  const res = await fetch(`${API_URL}/my-posts/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete post");
  return data;
};

export const updatePostById = async (id, updatedPost) => {
  const res = await fetch(`${API_URL}/my-posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update post");
  }

  return data;
};
