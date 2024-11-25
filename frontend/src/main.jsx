import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./App.css";
import RootLayout from "./routes/root.jsx";
import TasksLayout from "./routes/tasks.jsx";
import EpicsLayout from "./routes/epics.jsx";
import EpicDetails from "./routes/epicDetail.jsx";
import Dashboard from "./routes/dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "dashboard/",
        element: <Dashboard />,
      },
      {
        path: "tasks/",
        element: <TasksLayout />,
      },
      {
        path: "epics/",
        element: <EpicsLayout />,
      },
      {
        path: "epics/:epicId",
        element: <EpicDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
