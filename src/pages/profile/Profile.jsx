import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useUsers from "../../hooks/user/useUsers";
import { userInfoSetUp } from "../../redux/slices/userSlice";
import { useParams } from "react-router-dom";
import useOrders from "../../hooks/orders/useOrders";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.user);

  const [myOrders, setMyOrders] = useState([]);
  const { getMyOrders } = useOrders();
  const { updateUser } = useUsers();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const dispath = useDispatch();
  //   userInfoSetUp
  const { user } = userInfo;
  console.log(user);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [userInfo, user]);
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser(
        { name, email, password, confirmPassword },
        user?._id
      );
      dispath(userInfoSetUp(res.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const readData = async (id) => {
      const res = await getMyOrders(id);
      //   console.log(res);
      setMyOrders(res.orders);
    };
    readData(user?._id);
  }, []);
  console.log(myOrders);
  return (
    <div className="my-6">
      <div>
        <h1>Profile</h1>
        <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
          <div className="basis-[40%]">
            <form onSubmit={handleUpdateForm} className="flex flex-col gap-6 ">
              <input
                type="text"
                placeholder="Name"
                value={name}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-50"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-50"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-50"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-50"
              />
              <input
                type="submit"
                value="Update"
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-50 bg-blue-500 text-white cursor-pointer"
              />
            </form>
          </div>
          <div>
            <h1>My Orders</h1>
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Delivered
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Others
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* {order.createdAt} */}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.totalPrice}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.isPaid
                          ? new Date(order.paidAt).toLocaleDateString()
                          : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.isDelivered ? order.deliveredAt : "No"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">details</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
