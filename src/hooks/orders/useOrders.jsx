import React, { useState } from "react";
import useApi from "../publicApi/useApi";

export default function useOrders() {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useApi();
  const createOrders = async (data) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/v1/orders/add-order", data, {
        withCredentials: true,
      });
      console.log("res", res);
      setLoading(false);
      return res;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getOrderById = async (id) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(`/api/v1/orders/get-order/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { createOrders, loading, getOrderById };
}
