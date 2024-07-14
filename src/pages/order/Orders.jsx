import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrders from "../../hooks/orders/useOrders";
import { Spin } from "antd";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { orderId } = useParams();

  const { getOrderById, loading, paymentServer } = useOrders();
  console.log(orderId);
  useEffect(() => {
    const readData = async (id) => {
      const res = await getOrderById(id);
      console.log(res);
      setOrders(res.order);
    };
    if (orderId) readData(orderId);
  }, [orderId]);

  console.log(orders);

  const handlePayment = async () => {
    try {
      const result = await paymentServer(
        {
          email: orders?.user?.email,
          name: orders?.user?.name,
          totalPrice: orders.totalPrice,
        },
        orderId
      );
      console.log(result);
      if (result?.data) window.location.href = result.data;
    } catch (error) {
      console.log(error);
    }
  };
  if (loading || !orders)
    return (
      <div className="flex my-6 items-center justify-center  ">
        <Spin />
      </div>
    );
  return (
    <div className="w-full sm:max-w-6xl mx-auto my-12">
      <h1 className="text-xl font-semibold text-slate-600">
        Orders : <span className="text-2xl">{orders?._id}</span>{" "}
      </h1>
      <section className="my-8 flex flex-col sm:flex-row  gap-4 ">
        <div className="basis-2/3 ">
          <h1 className="text-xl my-4 font-bold text-slate-700">Shipping</h1>
          <div className="space-y-4 text-md font-semibold my-4 ">
            <p>Name: {orders?.user?.name}</p>
            <p>Email: {orders?.user?.email}</p>
            <p>
              Address :{orders.shippingAddress.address},
              {orders.shippingAddress.city},{orders.shippingAddress.postalCode},
              {orders.shippingAddress.country}
            </p>
          </div>
          {orders?.isDelivered ? (
            <p className="text-slate-900 p-2  bg-green-500 font-semibold">
              {orders?.deliveredAt}
            </p>
          ) : (
            <p className="bg-red-300 p-2  text-slate-600 rounded-md">
              Not delivered
            </p>
          )}
          <div>
            <p className="font-bold text-xl text-slate-500 mt-4">
              Payment Method
            </p>

            <p className="text-md font-semibold ">{orders.paymentMethod}</p>
            {orders?.isPaid ? (
              <p className="text-slate-50 p-2 bg-green-500 font-semibold my-4">
                {new Date(orders.paidAt).toLocaleString()}
              </p>
            ) : (
              <p className="bg-red-300 p-2  text-slate-600 rounded-md my-4">
                Not Paid
              </p>
            )}
            <div className="my-4  ">
              <h1>Orders Items</h1>

              <div className="flex flex-col  justify-between gap-4 my-6">
                {orders?.orderItems.map((item) => (
                  <div
                    className="flex justify-between gap-4 my-6 p-4 shadow-lg shadow-slate-500 rounded-lg"
                    key={item._id}
                  >
                    <div className=" flex w-1/4">
                      <img
                        src={item.imageUrl}
                        className="h-[80px] w-[80px] object-contain"
                        alt="img"
                      />
                      <p className="text-slate-600 underline">{item.name}</p>
                    </div>
                    <div>
                      <p>
                        {item.quantity} x ${item.price} = $
                        {item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/4 p-4 rounded-lg shadow-2xl shadow-slate-600 h-[200px]">
          <h1>Order Summary</h1>
          <hr />
          <div>
            <div className="flex justify-between font-bold text-xl">
              <p>Items:</p>
              <p>{orders.productPrice}</p>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <p>Shipping:</p>
              <p>{orders.shippingPrice}</p>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <p>Tax:</p>
              <p>{orders.taxPrice}</p>
            </div>
            <div className="flex justify-between font-bold text-xl">
              <p>Total:</p>
              <p>{orders.totalPrice}</p>
            </div>
          </div>
          <button
            onClick={handlePayment}
            disabled={orders.isPaid}
            className={`w-full px-2 py-1 rounded-md font-bold text-white bg-blue-950 ${
              orders.isPaid ? "bg-gray-500" : ""
            }`}
          >
            {orders.isPaid ? "Paid" : "Pay Now"}
          </button>
        </div>
      </section>
    </div>
  );
}
