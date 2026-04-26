import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const ResetPassword = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="w-full">
      <form className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Reset Password</h2>
          <p className="text-gray-500 text-sm">Reset Password</p>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm">New Password</label>
          <div className="relative mt-1">
            <input
              type={toggle ? "password" : "text"}
              className="input w-full"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="absolute right-3 top-3"
            >
              {toggle ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>
        {/* Confirm Password */}
        <div>
          <label className="text-sm">Confirm Password</label>
          <div className="relative mt-1">
            <input
              type={toggle ? "password" : "text"}
              className="input w-full"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setToggle(!toggle)}
              className="absolute right-3 top-3"
            >
              {toggle ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>

        {/* Forgot */}
        {/* <div className="text-sm text-gray-500">
          <Link to="/reset-password">Forgot Password?</Link>
        </div> */}

        {/* Button */}
        <button className="btn w-full bg-lime-400 border-none text-black">
          Reset Password
        </button>


      </form>
    </div>
  );
};

export default ResetPassword;
