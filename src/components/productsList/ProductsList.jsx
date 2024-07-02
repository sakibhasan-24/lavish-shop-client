import React, { useState } from "react";
import productCategories from "../../../public/products";
export default function ProductsList({ category, setCategory }) {
  console.log(category);
  return (
    <div className="w-full sm:max-w-5xl mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-slate-600">
        Explore Our{" "}
        <span className="text-orange-600 font-bold mx-4">Products</span>
      </h1>
      <p className="my-2 text-center font-md ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatibus, quidem, doloremque, voluptatum quos quis
      </p>
      <div className=" overflow-x-auto my-6  flex items-center gap-6  justify-center flex-wrap">
        {productCategories.map((cate, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === cate.category ? "All" : cate.category
                )
              }
              className="flex flex-col gap-3 items-center justify-center mt-5"
              key={index}
            >
              <img
                className={`w-24 h-24 rounded-full cursor-pointer object-cover order-4 border-gray-200 shadow-md ${
                  category === cate.category
                    ? "border-4 border-orange-500 p-1"
                    : ""
                }`}
                src={cate.img}
                alt="index"
              />
              <p
                className={`mt-2 text-xs font-semibold text-orange-500 ${
                  category === cate.category
                    ? "border-b-2 border-orange-500 "
                    : ""
                }`}
              >
                {cate.category}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
