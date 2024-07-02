import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Banner from "../banner/Banner";
import ProductsList from "../productsList/ProductsList";
import ShowProducts from "../productsShow/ShowProducts";

export default function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      {/* <Navbar /> */}
      <Banner />
      <ProductsList category={category} setCategory={setCategory} />
      <ShowProducts />
    </div>
  );
}
