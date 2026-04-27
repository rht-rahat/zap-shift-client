import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const [toggle, setToggle] = useState(true);
  const { signInUser, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // যদি private route থেকে আসে তাহলে সেখানে যাবে, না হলে home
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    const toastId = toast.loading("Logging in... Please wait");

    try {
      const result = await signInUser(data.email, data.password);
      console.log("User Login", result.user);
      toast.update(toastId, {
        render: "Login Successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });

      reset();

      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);


    } catch (error) {
      console.log("From Login page", error.message);
      toast.update(toastId, {
        render: error.message || "Login Failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
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
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            className="input w-full mt-1"
            placeholder="Email"
          />
          {errors?.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm">Password</label>
          <div className="relative mt-1">
            <input
              type={toggle ? "password" : "text"}
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
                  message:
                    "Password must include uppercase, lowercase, and a number",
                },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
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

            {errors?.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {/* Forgot */}
        <div className="text-sm text-gray-500">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        {/* Button */}
        <button className="btn w-full bg-lime-400 border-none text-black">
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Logging...
            </>
          ) : (
            "Login"
          )}
        </button>

        {/* Register */}
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-lime-600 font-medium">
            Register
          </Link>
        </p>

      </form>
        <div className="divider">OR</div>
        <SocialLogin />

    </div>
  );
};

export default Login;
