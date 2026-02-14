import { createBrowserRouter } from "react-router";
import Posts from "../Pages/Posts/Posts";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Layout from "../Components/Layout/Layout";
import NotFound from "../Pages/NotFound/NoutFound";
import ProtectedRouted from "./ProtectedRouted/ProtectedRouted";
import AuthProtectedRouted from "./AuthProtectedRouted/AuthProtectedRouted";

// This file contains all the routes of my app

export const myRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <ProtectedRouted>
            <Posts />
          </ProtectedRouted>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRouted>
            <Posts />
          </ProtectedRouted>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthProtectedRouted>
            <Login />
          </AuthProtectedRouted>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthProtectedRouted>
            <Register />
          </AuthProtectedRouted>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
