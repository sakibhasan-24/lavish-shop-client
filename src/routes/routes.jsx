import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

export default router;
