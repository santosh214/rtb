import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "../Common/Login";
import Register from "../Common/Register";
import Dashboard from "../Admin/Dashboard/Dashboard";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return <RouterProvider router={router} />
}
