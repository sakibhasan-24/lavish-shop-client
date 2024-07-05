import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main/MainLayout";
import Home from "../components/home/Home";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Carts from "../pages/carts/Carts";
import Login from "../pages/credentials/Login";
import Registration from "../pages/credentials/Registration";

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
      {
        path: "/carts",
        element: <Carts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Registration />,
      },
    ],
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

export default router;
