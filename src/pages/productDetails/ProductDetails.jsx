import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productsList } from "../../../public/productsList";
import useProducts from "../../hooks/products/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductDetails() {
  const params = useParams();
  //   console.log(params.id);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, getProductsById } = useProducts();
  //   productsList
  useEffect(() => {
    // const products = getProductsById(params.id);
    const fetchProduct = async (id) => {
      const product = await getProductsById(id);
      setProduct(product.product);
    };
    // setProduct(productsList.find((item) => item._id == params.id));
    fetchProduct(params.id);
  }, [params.id]);
  //   console.log(product);
  const handleAddtoCart = (e) => {
    e.preventDefault();
    // console.log("hello");
    dispatch(addToCart({ ...product, quantity }));
    navigate("/carts");
  };
  if (loading) return <h1>loading...</h1>;

  return (
    <div className="w-full sm:max-w-2xl  mx-auto md:max-w-6xl p-2 sm:p-8 flex flex-col sm:flex-row sm:gap-20 items-center justify-center">
      <div className="w-1/2 bg-slate-300 ">
        <img src={product.imageUrl} alt="img" />
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl text-amber-600 font-semibold text-center">
          {product.name}
        </h1>

        <div className="border-y-2 py-6 border-y-amber-600 flex flex-col gap-2">
          review
        </div>
        <h1 className="text-slate-700 text-md font-semibold">
          price:${product.price}
        </h1>
      </div>
      <div className="flex flex-col gap-8 w-full sm:w-[260px] shadow-lg shadow-slate-400 p-4 rounded-xl text-slate-500">
        <section className="flex items-center justify-between">
          <p>Price :</p>
          <p>${product.price}</p>
        </section>
        <section className="flex items-center justify-between">
          <p>Status :</p>
          <div>
            {product.numberOfStock > 0 ? (
              <p className="text-green-600">In Stock</p>
            ) : (
              <p className="text-red-600">Out of Stock</p>
            )}
          </div>
        </section>
        {product.numberOfStock > 0 && (
          <section className="flex items-center justify-between">
            <p>Quantity :</p>
            <form>
              <select
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                className="border-0 focus:outline-none bg-slate-50 py-1 px-2 rounded-md"
                name="quantity"
                id="quantity"
                // className=""
              >
                {[...Array(product.numberOfStock).keys()].map((item) => (
                  <option key={item + 1} value={item + 1}>
                    {item + 1}
                  </option>
                ))}
              </select>
            </form>
          </section>
        )}

        <div>
          <button
            onClick={handleAddtoCart}
            disabled={product.numberOfStock < 1}
            className="bg-orange-600 font-bold text-md text-slate-50 py-2 px-4 rounded-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
