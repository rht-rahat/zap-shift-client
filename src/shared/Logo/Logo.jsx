import React from 'react';
import logo from "../../assets/logo.png"
import { Link } from 'react-router';

const Logo = () => {
  return (
    <Link to="/">
    <div className='flex text-[#303030] items-end'>
      <img src={logo} alt="" />
      <span className='text-3xl font-extrabold -ml-6'>ZapShift</span>
    </div>
    </Link>
  );
};

export default Logo;