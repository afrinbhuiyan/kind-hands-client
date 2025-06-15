export const addVolunteerPost = async (post) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("Failed to add volunteer post");
  }

  return response.json();
};
