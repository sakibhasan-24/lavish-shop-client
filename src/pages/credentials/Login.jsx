import React, { useState } from "react";
import useUsers from "../../hooks/user/useUsers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userInfoSetUp } from "../../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // const [register, setRegister] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, userLogin, userSignUp } = useUsers();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  //   console.log(userInfo);
  // userInfoSetUp
  const hanldeLogIn = async (e) => {
    e.preventDefault();
    console.log("login");
    try {
      const res = await userLogin({ email, password });
      if (res.data.success) toast.success(res.data.message);
      console.log(res, "from login page");
      dispatch(userInfoSetUp(res.data));
      navigate(location.state?.from || "/");
    } catch (error) {
      toast.error(error.message);
      console.log(error, "from login page");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("sign up");
    if (registerPassword !== confirmPassword) {
      toast.error("Password does not match");
      return;
    } else {
      try {
        const res = await userSignUp({ name, email, password });
        if (res.data.success) toast.success(res.data.message);
        console.log(res, "from sign up page");
        dispatch(userInfoSetUp(res.data));
        navigate(location.state?.from || "/");
      } catch (error) {
        console.log(error, "from sign up page");
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="my-12 w-full  sm:max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-10 text-slate-600">
        Sign in
      </h1>
      <div className="max-w-md mx-auto shadow-2xl shadow-slate-400  p-8 bg-white rounded-md">
        <form onSubmit={hanldeLogIn} className="flex flex-col gap-8">
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-slate-600 hover:bg-slate-500 font-bold text-white p-2 rounded-md">
            Sign in
          </button>
        </form>
        <p>
          Don't have an account?
          <button
            className="text-blue-500 hover:text-blue-600"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            sign up
          </button>
        </p>
        <div>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form onSubmit={handleSignUp} className="" method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  //   type="button"
                  onClick={() => document.getElementById("my_modal_3").close()}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>

                <h3 className="font-bold text-lg">Sign up</h3>
                <div className="flex flex-col gap-6 ">
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                  />
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
                    type="password"
                    placeholder="confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").close()
                    }
                    type="submit"
                    className="bg-slate-600 hover:bg-slate-500 font-bold text-white p-2 rounded-md"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}
