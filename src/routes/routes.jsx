import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main/MainLayout";
import Home from "../components/home/Home";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Carts from "../pages/carts/Carts";
import Login from "../pages/credentials/Login";
import Registration from "../pages/credentials/Registration";
import ShippingAddress from "../pages/ShippingAddress/ShippingAddress";
import Private from "./Private";
import Payments from "../pages/payment/Payments";
import PlaceOrders from "../pages/placeorders/PlaceOrders";
import Orders from "../pages/order/Orders";

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
      {
        path: "/shipping",
        element: (
          <Private>
            <ShippingAddress />
          </Private>
        ),
      },
      {
        path: "/order/:orderId",
        element: (
          <Private>
            <Orders />
          </Private>
        ),
      },
      {
        path: "/payment",
        element: (
          <Private>
            <Payments />
          </Private>
        ),
      },
      {
        path: "/placeorder",
        element: (
          <Private>
            <PlaceOrders />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

export default router;
