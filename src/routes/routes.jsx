import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main/MainLayout";
import Home from "../components/home/Home";
import ProductDetails from "../pages/productDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

export default router;
