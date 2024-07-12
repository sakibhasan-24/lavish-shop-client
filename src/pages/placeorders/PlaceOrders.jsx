import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOrders from "../../hooks/orders/useOrders";
import { clearCartItems } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

export default function PlaceOrders() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  //   console.log(cart);

  const {
    cartItem,
    deliveryAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  //   console.log(deliveryAddress);
  const navigate = useNavigate();
  useEffect(() => {
    if (!deliveryAddress || !paymentMethod) {
      navigate("/shipping");
    }
  }, [deliveryAddress, paymentMethod, navigate]);

  const { loading, createOrders } = useOrders();

  const placeOrderHandler = async () => {
    const res = await createOrders({
      orderItems: cart.cartItem,
      shippingPrice,
      taxPrice,
      totalPrice,
      shippingAddress: deliveryAddress,
      paymentMethod: paymentMethod,
    });
    // console.log(res.data.success);
    if (res.data.success) {
      toast.success("Order Placed Successfully");
      dispatch(clearCartItems());
      navigate(`/order/${res.data.order._id}`);
    }
  };
  //   clearCartItems
  return (
    <div className="w-full my-6 p-8 sm:max-w-6xl mxau-auto sm:p-4">
      <section className="flex flex-col sm:flex-row justify-between gap-14">
        <div className="flex-1 basis-[60%] ">
          <h1 className="text-xl text-slate-500 font-bold">Shipping Address</h1>
          <p className="text-gray-700 my-2">
            {deliveryAddress.address} ,{deliveryAddress.city} ,
            {deliveryAddress.postalCode} ,{deliveryAddress.country}
          </p>
          <hr className="my-6 border-t-1 border-gray-900" />

          <h1 className="text-xl text-slate-500 font-bold">Payment Method</h1>
          <p className="text-gray-700 text-xl my-2">{paymentMethod}</p>
          <hr className="my-6 border-t-1 border-gray-900" />
          <h1 className="text-xl text-slate-500 font-bold">Order Items</h1>
          {cartItem.map((item, idx) => (
            <div
              className="flex justify-between items-center my-4"
              key={item._id}
            >
              <div className="flex items-center  gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <p className="text-gray-700  text-md font-bold underline">
                  {item.name}
                </p>
              </div>

              <p className="text-gray-500 text-xl space-x-2 font-semibold">
                {item.quantity} X ${item.price}=${item.quantity * item.price}
              </p>
            </div>
          ))}
        </div>
        <div className="basis-[30%] shadow-xl shadow-slate-300 p-4 rounded-md h-72">
          <h1 className="text-lg font-semibold text-slate-600 text-center">
            Order Summary
          </h1>
          <div className="w-full mx-auto">
            <div className="flex justify-between items-center my-4">
              <p className="text-gray-700 text-md font-semibold">Items:</p>
              <p className="text-gray-700 text-md font-semibold">
                $
                {cartItem.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}
              </p>
            </div>
            <div className="flex justify-between items-center my-4">
              <p className="text-gray-700 text-md font-semibold">Shipping:</p>
              <p className="text-gray-700 text-md font-semibold">
                ${shippingPrice}
              </p>
            </div>
            <div className="flex justify-between items-center my-4">
              <p className="text-gray-700 text-md font-semibold">Tax:</p>
              <p className="text-gray-700 text-md font-semibold">${taxPrice}</p>
            </div>
            <div className="flex justify-between items-center my-4">
              <p className="text-gray-700 text-md font-semibold">Total:</p>
              <p className="text-gray-700 text-md font-semibold">
                ${totalPrice}
              </p>
            </div>

            <button
              onClick={placeOrderHandler}
              className="px-2 py-2  rounded-md bg-slate-600 hover:bg-slate-900 text-white w-full mt-4"
            >
              place Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
