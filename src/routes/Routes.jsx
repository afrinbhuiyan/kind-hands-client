import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AddVolunteer from "../pages/AddVolunteer/AddVolunteer";
import AllVolunteers from "../pages/AllVolunteers/AllVolunteers";
import VolunteerDetails from "../pages/VolunteerDetails/VolunteerDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MyPosts from "../pages/MyPosts/MyPosts";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import About from "../pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-volunteer",
        element: (
          <PrivateRoute>
            <AddVolunteer />
          </PrivateRoute>
        ),
      },
      {
        path: "/volunteers",
        element: <AllVolunteers />,
      },
      {
        path: "/volunteer/:id",
        element: (
          <PrivateRoute>
            <VolunteerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
