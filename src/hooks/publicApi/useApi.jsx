import axios from "axios";
import React from "react";

export default function useApi() {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:3000/",
  });
  return axiosPublic;
}
