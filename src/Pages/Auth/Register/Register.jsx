import React, { useState } from "react";
import { useForm, Watch } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const [toggle, setToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { createUserEmailAndPassword, updateUser } = useAuth();
  const axiosSecure = useAxiosSecure()

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // console.log("From Register page", location);

  // React Form Hook

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleRegistration = async (data) => {
    // console.log("From submit data", data);
    //   console.log(data.photo);
    // console.log(data.photo[0]);

    const toastId = toast.loading("Creating Account");
    setIsLoading(true);

    try {
      const profileImage = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImage);
      const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGESECRETE}`;

      const imageUpload = await axios.post(image_api_url, formData);

      const photoURL = imageUpload.data.data.url;

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL
      }

      const res = await axiosSecure.post("/users", userInfo)

      console.log("user Created in database:", res.data);

      toast.update(toastId, {
        render: "Photo uploaded. Creating account...",
        isLoading: true,
      });

      // const profile = {};

      await createUserEmailAndPassword(data.email, data.password);

      

      await updateUser({
        displayName: data.name,
        photoURL: photoURL,
      });

      // console.log("User Created:", result.user);

      toast.update(toastId, {
        render: "Create Successful Account",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });

      // optional form clear
      reset();
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Registration Error:", error.message);
      console.error("Registration Error:", error.message);

      let errorMessage = "Something went wrong";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already exists";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      }

      toast.update(toastId, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      // 🔥 Stop button loading after all process ends
      setIsLoading(false);
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

        {/* photo image upload */}

        <div>
          <label className="text-sm font-medium">Profile Photo</label>

          <label className="mt-2 flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            {/* Preview Image */}
            {watch("photo")?.[0] ? (
              <img
                src={URL.createObjectURL(watch("photo")[0])}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full border"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg
                  className="w-6 h-6 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 12l-3-3m3 3l3-3M4 20h16"
                  />
                </svg>
                <p className="text-sm font-medium">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, JPEG (Max 5MB)
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("photo", {
                required: "Profile photo is required",
                validate: {
                  fileSize: (files) =>
                    !files[0] ||
                    files[0].size <= 5000000 ||
                    "Max file size is 5MB",
                },
              })}
            />
          </label>

          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
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
          disabled={isLoading}
          className="btn w-full bg-lime-400 border-none text-black"
        >
          {isLoading ? (
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
          <Link
            state={{ from: location?.state?.from }}
            to="/login"
            className="text-lime-600 font-medium"
          >
            Login
          </Link>
        </p>
        {/* <div className="divider">OR</div> */}
      </form>
    </div>
  );
};

export default Register;
