import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();

  const logOutUser = async () => {
  const toastId = toast.loading("Logging out... Please wait");

  try {
    await logout();

    toast.update(toastId, {
      render: "Logout Successful 👋",
      type: "success",
      isLoading: false,
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
    });

  } catch (error) {
    toast.update(toastId, {
      render: error.message || "Logout Failed ❌",
      type: "error",
      isLoading: false,
      autoClose: 4000,
      closeOnClick: true,
    });

    console.log("Logout Error:", error.message);
  }
};


  // console.log("From Navbar", user);
  const links = (
    <>
      <li className="font-medium text-[16px] text-secondary">
        <NavLink
          className={({ isActive }) =>
            `hover:bg-transparent hover:text-[#1d0f0f] 
       focus:bg-transparent active:bg-transparent 
       transition-all duration-300 ease-in-out
       ${isActive ? "font-bold text-[#1d0f0f]" : ""}`
          }
          to="/"
        >
          Services
        </NavLink>
      </li>
      <li className="font-medium text-[16px] text-secondary">
        <NavLink
          className={({ isActive }) =>
            `hover:bg-transparent hover:text-[#1d0f0f] 
       focus:bg-transparent active:bg-transparent 
       transition-all duration-300 ease-in-out
       ${isActive ? "font-bold text-[#1d0f0f]" : ""}`
          }
          to="/coverage"
        >
          Coverage
        </NavLink>
      </li>
      <li className="font-medium text-[16px] text-secondary">
        <NavLink
          className={({ isActive }) =>
            `hover:bg-transparent hover:text-[#1d0f0f] 
       focus:bg-transparent active:bg-transparent 
       transition-all duration-300 ease-in-out
       ${isActive ? "font-bold text-[#1d0f0f]" : ""}`
          }
          to="/about"
        >
          About Us
        </NavLink>
      </li>
      <li className="font-medium text-[16px] text-secondary">
        <NavLink
          className={({ isActive }) =>
            `hover:bg-transparent hover:text-[#1d0f0f] 
       focus:bg-transparent active:bg-transparent 
       transition-all duration-300 ease-in-out
       ${isActive ? "font-bold text-[#1d0f0f]" : ""}`
          }
          to="/pricing"
        >
          Pricing
        </NavLink>
      </li>
      <li className="font-medium text-[16px] text-secondary">
        <NavLink
          className={({ isActive }) =>
            `hover:bg-transparent hover:text-[#1d0f0f] 
       focus:bg-transparent active:bg-transparent 
       transition-all duration-300 ease-in-out
       ${isActive ? "font-bold text-[#1d0f0f]" : ""}`
          }
          to="/blog"
        >
          Blog
        </NavLink>
      </li>
      <li className="font-medium text-[16px] text-secondary">
        <NavLink
          className={({ isActive }) =>
            `hover:bg-transparent hover:text-[#1d0f0f] 
       focus:bg-transparent active:bg-transparent 
       transition-all duration-300 ease-in-out
       ${isActive ? "font-bold text-[#1d0f0f]" : ""}`
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="py-5">
      <div className="navbar bg-base-100 shadow-lg  rounded-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className=" text-xl">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 " style={{ zIndex: 10 }}>
            {links}
          </ul>
        </div>
        <div className="navbar-end flx gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              {/* Avatar Button */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    alt={user?.displayName || "User"}
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow"
              >
                {/* User Name */}
                <li className="pointer-events-none font-semibold text-center py-2">
                  {user?.displayName || "User"}
                </li>

                {/* Optional Email */}
                <li className="pointer-events-none text-xs text-gray-500 text-center mb-2">
                  {user?.email}
                </li>

                <div className="divider my-1"></div>

                {/* Logout */}
                <li>
                  <button
                    onClick={logOutUser}
                    className="text-red-500 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary text-black">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
