import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const [toggle, setToggle] = useState(true);
  const { createUserEmailAndPassword, loading } = useAuth();

  // React Form Hook

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegistration = async (data) => {
    try {
      const result = await createUserEmailAndPassword(
        data.email,
        data.password,
      );

      console.log("User Created:", result.user);

      // optional form clear
      reset();
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-4" onSubmit={handleSubmit(handleRegistration)}>
        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Create An Account</h2>
          <p className="text-gray-500 text-sm">Login with ZapShift</p>
        </div>

        {/* name */}
        <div>
          <label className="text-sm">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input w-full mt-1"
            placeholder="name"
            // aria-invalid={errors.firstName ? "true" : "false"}
          />
          {errors.name?.type === "required" && (
            <p className="text-sm text-rose-500 mt-1">
              {errors?.name?.message}
            </p>
          )}
        </div>

        {/* email */}

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
            placeholder="email"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm">Password</label>
          <div className="relative mt-1">
            <input
              type={toggle ? "password" : "text"}
              className="input w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
                  message:
                    "Password must include uppercase, lowercase, and a number",
                },
              })}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
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
        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-lime-400 border-none text-black"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Creating Account...
            </>
          ) : (
            "Register"
          )}
        </button>
        <div className="divider">OR</div>
        <SocialLogin />

        {/* Register */}
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 font-medium">
            Login
          </Link>
        </p>
        {/* <div className="divider">OR</div> */}
        

      </form>
    </div>
  );
};

export default Register;
