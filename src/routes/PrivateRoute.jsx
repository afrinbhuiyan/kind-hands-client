import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) return <Spinner/>

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
