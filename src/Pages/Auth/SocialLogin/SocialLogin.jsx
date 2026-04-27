import React from "react";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { googleLogin, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // যদি private route থেকে আসে তাহলে সেখানে যাবে, না হলে home
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Logging in... Please wait");
    try {
      const result = await googleLogin();

      console.log("User Login social login", result.user);
      toast.update(toastId, {
        render: "Login Successful 🎉",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.log("from social login", error.message);
      toast.update(toastId, {
        render: error.message || "Login Failed ❌",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="btn bg-white text-black w-full border-[#e5e5e5]"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Logging...
          </>
        ) : (
          "Login With Google"
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
