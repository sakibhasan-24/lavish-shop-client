import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useUsers from "../../hooks/user/useUsers";
import { userInfoSetUp } from "../../redux/slices/userSlice";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userInfo } = useSelector((state) => state.user);

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
  return (
    <div className="my-6">
      <div>
        <h1>Profile</h1>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-0">
          <form
            onSubmit={handleUpdateForm}
            className="flex flex-col gap-6 basis-[40%]"
          >
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
      </div>
    </div>
  );
}
