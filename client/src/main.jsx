import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./routes/homepage/Homepage.jsx";
import Dashboard from "./routes/dashboard/Dashboard.jsx";
import Chat from "./routes/chat/Chat.jsx";
import RootLayout from "./layouts/rootLayout/RootLayout.jsx";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout.jsx";
import Signin from "./routes/signIn/Signin.jsx";
import Signup from "./routes/signUp/SignUp.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/", 
        element: <Homepage />,
      },
      {
        path: "/sign-in/*", 
        element: <Signin />,
      },
      {
        path: "/sign-up/*", 
        element: <Signup />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard", 
            element: <Dashboard />,
          },
          {
            path: "/dashboard/chats/:id", 
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
