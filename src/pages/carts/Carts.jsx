import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { DeleteOutlined } from "@ant-design/icons";
export default function Carts() {
  const { cartItem } = useSelector((state) => state.cart);
  //   console.log(typeof cartItem[0].quantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity) => {
    // console.log(product);
    dispatch(addToCart({ ...product, quantity }));
  };
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  if (cartItem?.length === 0)
    return (
      <div className="text-lg font-bold text-slate-600 text-center my-12">
        No item Found
        <br />
        <Link className="text-md underline" to="/">
          Add Items
        </Link>
      </div>
    );
  return (
    <div className="w-full sm:max-w-6xl my-6 ">
      <h1 className="text-4xl text-slate-500 font-bold my-6">Cart Items</h1>
      <section className="flex flex-col sm:flex-row  gap-6">
        <section className="flex-grow-[2] ">
          {cartItem.map((item) => {
            return (
              <div
                className="flex   gap-12 p-4 rounded-lg shadow-lg my-12"
                key={item._id}
              >
                <section className="flex gap-6">
                  <img
                    src={item.imageUrl}
                    alt="img"
                    className="w-24 h-20  rounded-lg object-cover "
                  />
                  <p className="text-md  underline font-bold text-slate-500">
                    {item.name}
                  </p>
                  <p className="text-md   font-bold text-slate-500">
                    ${item.price}
                  </p>
                </section>
                <section>
                  <form>
                    <select
                      // onChange={(e) => setQuantity(e.target.value)}
                      onChange={(e) =>
                        handleAddToCart(item, Number(e.target.value))
                      }
                      value={item.quantity}
                      className="border-2 border-slate-400 rounded-lg focus:outline-none bg-slate-50 py-1 px-2 "
                      name="quantity"
                      id="quantity"
                      // className=""
                    >
                      {[...Array(item.numberOfStock).keys()].map((item) => (
                        <option key={item + 1} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </select>
                  </form>
                </section>

                <p
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="cursor-pointer text-2xl text-red-700 hover:text-red-400"
                >
                  <DeleteOutlined />
                </p>
              </div>
            );
          })}
        </section>

        <div className=" h-40 space-y-2 flex-grow-[2] bg-slate-500p-4 rounded-lg shadow-lg p-4 ">
          <h1 className="text-2xl text-slate-500 font-bold">
            Subtotal (
            {Number(
              cartItem.reduce((acc, item) => acc + Number(item.quantity), 0)
            )}
            ) Items
          </h1>
          <p className="text-md text-slate-500">
            SubTotal : $
            {Number(
              cartItem.reduce(
                (acc, item) => acc + Number(item.price * item.quantity + acc),
                0
              )
            ).toFixed(2)}
          </p>
          <Link to="/shipping">
            <button className="bg-slate-600 text-slate-50 rounded-lg font-bold px-4 py-2">
              Checkout
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
