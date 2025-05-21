import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        
      }
    ],
  },
]);

export default router;
