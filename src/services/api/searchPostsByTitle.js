export const searchPostsByTitle = async (title) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/search?title=${encodeURIComponent(title)}`);
  return response.json();
};