export const getHomePosts = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/home`);
  return response.json();
};