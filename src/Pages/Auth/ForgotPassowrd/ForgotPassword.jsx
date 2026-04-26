import React from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  return (
    <div className="w-full">
      <form className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Forgot Password</h2>
          <p className="text-gray-500 text-sm">
            Enter your email address and we’ll send you a reset link.
          </p>
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

        {/* Button */}
        <button className="btn w-full bg-lime-400 border-none text-black">
          Send
        </button>

        {/* Register */}
        <p className="text-sm">
          Remember your password{" "}
          <Link to="/login" className="text-lime-600 font-medium">
            Login
          </Link>
        </p>

        <div className="divider">OR</div>
      </form>
    </div>
  );
};

export default ForgotPassword;
