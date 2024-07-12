import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrders from "../../hooks/orders/useOrders";
import { Spin } from "antd";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { orderId } = useParams();
  const { getOrderById, loading } = useOrders();
  //   console.log(orderId);
  useEffect(() => {
    getOrderById(orderId).then((res) => {
      console.log(res);
      setOrders(res.order);
    });
  }, [orderId]);

  if (loading)
    return (
      <div className="flex my-6 items-center justify-center  ">
        <Spin />
      </div>
    );
  return (
    <div className="w-full sm:max-w-6xl mx-auto my-12">
      <h1 className="text-xl font-semibold text-slate-600">
        Orders : <span className="text-2xl">{orders._id}</span>{" "}
      </h1>
      <section className="my-8 flex flex-col sm:flex-row  gap-4 items-center">
        <div className="basis-2/3">
          <h1 className="text-xl my-4 font-bold text-slate-700">Shipping</h1>
          <div className="space-y-4 text-md font-semibold ">
            <p>Name: {orders.user.name}</p>
            <p>Email: {orders.user.email}</p>
            <p>
              Address :{orders.shippingAddress.address},
              {orders.shippingAddress.city},{orders.shippingAddress.postalCode},
              {orders.shippingAddress.country}
            </p>
          </div>
        </div>
        <div className="basis-1/4">Col</div>
      </section>
    </div>
  );
}
