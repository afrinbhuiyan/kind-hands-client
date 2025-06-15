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
import MyVolunteerNeedPost from "../pages/MyPosts/MyVolunteerNeedPost";
import MyVolunteerRequestPost from "../pages/MyPosts/MyVolunteerRequestPost";

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
        path: "/add-volunteer-need-post",
        element: (
          <PrivateRoute>
            <MyVolunteerNeedPost/>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-posts",
        element: (
          <PrivateRoute>
            <MyVolunteerRequestPost/>
          </PrivateRoute>
        ),
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
