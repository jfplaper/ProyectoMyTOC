import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Clinics from "../pages/Clinics";
import Forum from "../pages/Forum";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import MyTocAppWeb from "../pages/MyTocAppWeb"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "clinics",
        element: <Clinics />,
      },
      {
        path: "forum",
        element: <Forum />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "mytocappweb",
        element: <MyTocAppWeb />,
      },
    ],
  },
]);
