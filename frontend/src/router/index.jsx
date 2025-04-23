import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Clinics from "../pages/Clinics";
import Forum from "../pages/Forum";
import ThreadDetail from "../pages/ThreadDetail";
import Events from "../pages/Events";
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import MyTocAppWeb from "../pages/MyTocAppWeb";
import MyTocAppManual from "../pages/MyTocAppManual";

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
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
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
        path: "thread/:id",
        element: <ThreadDetail />,
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
        element: (
          <ProtectedRoute>
            <MyTocAppWeb />
          </ProtectedRoute>
        ),
      },
      {
        path: "mytocappmanual",
        element: <MyTocAppManual />,
      },
    ],
  },
]);
