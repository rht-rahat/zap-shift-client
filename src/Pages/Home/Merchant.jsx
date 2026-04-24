import React from 'react';
import merchantBg from "../../assets/be-a-merchant-bg.png"
import locationMerchant from "../../assets/location-merchant.png"

const Merchant = () => {
  return (
    <div className="w-full flex justify-center py-10 bg-gray-100">
      <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-[#063C3F] px-10 py-16 flex items-center justify-between">

        {/* Decorative wave top */}
        <div className="absolute top-0 left-0 w-full z-50">
          <div className="w-full h-24 opacity-82">
            <img src={merchantBg} alt="" />
          </div>
        </div>

        {/* Left Content */}
        <div className="text-white max-w-xl z-10">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            Merchant and Customer Satisfaction 
            is Our First Priority
          </h1>

          <p className="mt-4 text-sm text-gray-200 leading-relaxed">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-lime-400 hover:bg-lime-300 text-black font-semibold px-6 py-3 rounded-full transition">
              Become a Merchant
            </button>

            <button className="border border-lime-400 text-lime-300 hover:bg-lime-400 hover:text-black px-6 py-3 rounded-full transition">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hidden md:block z-10">
          <img
            src={locationMerchant}
            alt="delivery illustration"
            className=" drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Merchant;