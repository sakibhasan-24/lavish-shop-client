import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { userLogOutAction } from "../../redux/slices/userSlice";
import useUsers from "../../hooks/user/useUsers";
import { toast } from "react-toastify";
import { userLogOutAction } from "../../redux/slices/userSlice";

export default function Navbar() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { cartItem } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const { userLogOut, loading } = useUsers();
  // console.log(cartItem)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // userLogOut
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  // userLogOutAction

  // handle logout

  const handleLogout = async () => {
    try {
      const res = await userLogOut();
      // console.log(res, "from nav");
      if (res?.data?.success) toast.success(res.data.message);
      dispatch(userLogOutAction());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-purple-600 shadow-xl">
      <div className="flex items-center gap-2">
        <HomeOutlined className="text-2xl text-white" />
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Lavish
        </Link>
      </div>
      <div className="hidden lg:flex gap-6">
        <Link
          to="/products"
          className="text-md font-semibold text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
        >
          <AppstoreOutlined />
          Products
        </Link>
        <Link
          to="/categories"
          className="text-md font-semibold text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
        >
          <ShoppingOutlined />
          Categories
        </Link>
        {cartItem.length > 0 && (
          <Link to="/carts">
            <div
              tabIndex={0}
              role="button"
              className="text-md font-semibold text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItem.length}
                </span>
              </div>
            </div>
          </Link>
        )}
        <Link
          to="/offers"
          className="text-md font-semibold text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
        >
          <ShoppingOutlined />
          Offers
        </Link>
      </div>
      <div className="hidden lg:flex items-center gap-4">
        {userInfo ? (
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn">
              {userInfo?.user?.name}
            </div>
            <div
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-24  shadow"
            >
              <button className="w-full text-left p-2 rounded hover:bg-gray-200">
                <Link to="/profile">Profile</Link>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <Button
              type="primary"
              shape="round"
              icon={<LoginOutlined />}
              size="large"
              className="bg-white text-purple-600 border-none hover:bg-purple-300 transition-all duration-300"
            >
              Sign in
            </Button>
          </Link>
        )}
      </div>
      <div className="lg:hidden">
        <MenuOutlined className="text-2xl text-white" onClick={showDrawer} />
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        closable={true}
      >
        <div className="flex flex-col gap-4">
          <Link
            to="/products"
            className="text-md font-semibold text-black hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
          >
            <AppstoreOutlined />
            Products
          </Link>
          <Link
            to="/categories"
            className="text-md font-semibold text-black hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
          >
            <ShoppingOutlined />
            Categories
          </Link>
          <Link
            to="/offers"
            className="text-md font-semibold text-black hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
          >
            <ShoppingOutlined />
            Offers
          </Link>
          <Link to="/signin" className="mt-4">
            <Button
              type="primary"
              shape="round"
              icon={<LoginOutlined />}
              size="large"
              className="bg-purple-600 text-white border-none hover:bg-yellow-300 transition-all duration-300 w-full"
            >
              Sign in
            </Button>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
