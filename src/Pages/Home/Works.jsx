import React from 'react';
import bookingIcon from "../../assets/bookingIcon.png"

const Works = () => {
  return (
    <div>
      <div className='lg:p-10'>
        <h3 className='font-extrabold text-3xl pb-5 m-3 lg:m-0'>How it works</h3>

        <div className='grid grid-cols-12 gap-5 m-3 lg:m-3'>
          <div className='lg:col-span-3 col-span-6 bg-white space-y-2.5 rounded-2xl p-5'>
            <img src={bookingIcon} alt="" />
            <h4 className='font-extrabold text-xl'>Booking Pick & Drop</h4>
            <p className='text-sm  tracking-wide'>Form personal  packages  to <br /> business  shipments - we deliver <br /> on time every time</p>
          </div>
          <div className='lg:col-span-3 col-span-6 bg-white space-y-2.5 rounded-2xl p-5'>
            <img src={bookingIcon} alt="" />
            <h4 className='font-extrabold text-xl'>Booking Pick & Drop</h4>
            <p className='text-sm  tracking-wide'>Form personal  packages  to <br /> business  shipments - we deliver <br /> on time every time</p>
          </div>
          <div className='lg:col-span-3 col-span-6 bg-white space-y-2.5 rounded-2xl p-5'>
            <img src={bookingIcon} alt="" />
            <h4 className='font-extrabold text-xl'>Booking Pick & Drop</h4>
            <p className='text-sm  tracking-wide'>Form personal  packages  to <br /> business  shipments - we deliver <br /> on time every time</p>
          </div>
          <div className='lg:col-span-3 col-span-6 bg-white space-y-2.5 rounded-2xl p-5'>
            <img src={bookingIcon} alt="" />
            <h4 className='font-extrabold text-xl'>Booking Pick & Drop</h4>
            <p className='text-sm  tracking-wide'>Form personal  packages  to <br /> business  shipments - we deliver <br /> on time every time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;