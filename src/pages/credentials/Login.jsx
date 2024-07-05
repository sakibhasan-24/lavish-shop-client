import React from "react";

export default function Login() {
  return (
    <div className="my-12 w-full  sm:max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-10 text-slate-600">
        Sign in
      </h1>
      <div className="max-w-md mx-auto shadow-2xl shadow-slate-400  p-8 bg-white rounded-md">
        <form className="flex flex-col gap-8">
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="email"
            placeholder="Email"
          />
          <input
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
            type="password"
            placeholder="Password"
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
              <form className="" method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  //   type="button"
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
                  />
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-50"
                    type="password"
                    placeholder="Password"
                  />
                  <button className="bg-slate-600 hover:bg-slate-500 font-bold text-white p-2 rounded-md">
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
