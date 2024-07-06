import React, { useState } from "react";
import useApi from "../publicApi/useApi";

export default function useUsers() {
  const axiosPublic = useApi();
  const [loading, setLoading] = useState(false);
  const userLogin = async (userInformation) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post(
        "/api/v1/users/login",
        userInformation,
        {
          withCredentials: true,
        }
      );
      //   console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const userLogOut = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/v1/users/logout", {
        withCredentials: true,
      });
      //   console.log(res);
      return res;
    } catch (error) {
      console.log(error, "from api");
    } finally {
      setLoading(false);
    }
  };
  return { loading, userLogin, userLogOut };
}
