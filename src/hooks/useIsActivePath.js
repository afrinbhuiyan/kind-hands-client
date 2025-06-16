import { useLocation } from "react-router-dom";

const useIsActivePath = (paths) => {
  const location = useLocation();
  return paths.some((path) => location.pathname === path);
};

export default useIsActivePath;
