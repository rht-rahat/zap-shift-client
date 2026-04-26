import React from "react";
import authImage from "../assets/authImage.png";
import Logo from "../shared/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
      
      {/* Left Side (White) */}
      <div className="bg-white flex flex-col">
        {/* Logo */}
        <div className="px-10 py-6">
          <Logo />
        </div>

        {/* Form Center */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Right Side (Light color) */}
      <div className="bg-[#F5F5ED] flex items-center justify-center">
        <img
          src={authImage}
          alt="Auth"
          className="w-[70%] max-w-md object-contain"
        />
      </div>
    </div>
  );
};

export default AuthLayout;