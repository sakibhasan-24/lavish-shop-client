import React from "react";

export default function Banner() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6  p-8 mmy-6">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl lg:text-3xl font-bold text-orange-500">
          Find{" "}
          <span className="text-slate-700 font-extrabold text-4xl lg:text-5xl">
            Products that match your style
          </span>
        </h1>
        <p className="text-2xl font-semibold lg:text-lg text-slate-700 mt-4">
          Discover a variety of items tailored to your taste.
        </p>
        <button className="mt-6 px-6 py-3 bg-orange-300 text-purple-700 font-semibold rounded-lg shadow-md hover:bg-orange-400 transition duration-300">
          Shop Now
        </button>
      </div>
      <div className="w-full lg:w-2/3 mx-auto b">
        <img
          className="rounded-lg "
          src="https://4.imimg.com/data4/LY/LS/MY-6264815/men-canvas-shoes-500x500.jpg"
          alt="Fashionable Shoes"
        />
      </div>
    </div>
  );
}
