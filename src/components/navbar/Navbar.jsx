import React from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  ShoppingOutlined,
  UserOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { useState } from "react";

export default function Navbar() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
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
        <Link
          to="/offers"
          className="text-md font-semibold text-white hover:text-yellow-300 transition-colors duration-300 flex items-center gap-2"
        >
          <ShoppingOutlined />
          Offers
        </Link>
      </div>
      <div className="hidden lg:flex items-center gap-4">
        <Link to="/signin">
          <Button
            type="primary"
            shape="round"
            icon={<LoginOutlined />}
            size="large"
            className="bg-white text-purple-600 border-none hover:bg-yellow-300 transition-all duration-300"
          >
            Sign in
          </Button>
        </Link>
      </div>
      <div className="lg:hidden">
        <MenuOutlined className="text-2xl text-white" onClick={showDrawer} />
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
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
