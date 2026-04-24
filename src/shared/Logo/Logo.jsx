import React from 'react';
import logo from "../../assets/logo.png"

const Logo = () => {
  return (
    <div className='flex text-[#303030] items-end'>
      <img src={logo} alt="" />
      <span className='text-3xl font-extrabold -ml-6'>ZapShift</span>
    </div>
  );
};

export default Logo;