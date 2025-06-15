export const allVolunteersPromise = () => {
  return fetch(`${import.meta.env.VITE_API_URL}/posts`).then((res) =>
    res.json()
  );
};
