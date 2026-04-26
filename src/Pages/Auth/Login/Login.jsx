import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router";

const Login = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="w-full">
      <form className="space-y-4">
        
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login with ZapShift</p>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="input w-full mt-1"
            placeholder="Email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm">Password</label>
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

        {/* Forgot */}
        <div className="text-sm text-gray-500">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        {/* Button */}
        <button className="btn w-full bg-lime-400 border-none text-black">
          Login
        </button>

        {/* Register */}
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-lime-600 font-medium">
            Register
          </Link>
        </p>

        <div className="divider">OR</div>
      </form>
    </div>
  );
};

export default Login;