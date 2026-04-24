import React from 'react';
import logo from "../../assets/logo.png"

const FooterLogo = () => {
  return (
    <div>
      <div className='flex text-[#303030] items-end'>
            <img src={logo} alt="" />
            <span className='text-3xl font-extrabold -ml-6 text-white'>ZapShift</span>
          </div>
    </div>
  );
};

export default FooterLogo;