import React, { useState } from "react";
import useApi from "../publicApi/useApi";

export default function useProducts() {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useApi();
  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.get("/api/v1/products/get-products");
      //   console.log(response.data);
      const data = response.data;
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getProductsById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosPublic.get(
        `/api/v1/products/get-product/${id}`
      );
      const data = response.data;
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getAllProducts, getProductsById };
}
