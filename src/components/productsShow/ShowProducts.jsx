import React, { useContext, useEffect, useState } from "react";
import { storeContextProvider } from "../../context/StoreProvider";
import ProductCard from "./ProductCard";
import useProducts from "../../hooks/products/useProducts";

export default function ShowProducts() {
  const { productsList } = useContext(storeContextProvider);
  const [products, setProducts] = useState([]);
  const { getAllProducts } = useProducts();
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getAllProducts();
      //   console.log(data);
      setProducts(data.products);
    };
    fetchProduct();
  }, []);
  //   console.log(productsList);
  return (
    <div className="my-2 w-full sm:max-w-2xl md:max-w-5xl mx-auto">
      <h1 className="text-center font-bold text-4xl">
        Top <span className="text-orange-500 font-bold">Products</span> We Have
      </h1>
      <div className="grid grid-cols-1  mx-8 sm:mx-2  items-center justify-center  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
}
