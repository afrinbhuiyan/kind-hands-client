const API_URL = import.meta.env.VITE_API_URL;

export const getMyPosts = async (email, accessToken) => {
  console.log(accessToken)
  const res = await fetch(`${API_URL}/my-posts?email=${email}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const deletePostById = async (id, accessToken) => {
  const res = await fetch(`${API_URL}/my-posts/${id}`, {
    method: "DELETE",
    headers: {
       Authorization: `Bearer ${accessToken}`,
    }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete post");
  return data;
};

export const updatePostById = async (id, updatedPost, accessToken) => {
  const res = await fetch(`${API_URL}/my-posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(updatedPost),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update post");
  }

  return data;
};
