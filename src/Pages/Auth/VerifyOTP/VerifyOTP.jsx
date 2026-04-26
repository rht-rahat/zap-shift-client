import React, { useState, useRef } from "react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="w-full">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        
        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-black">Enter Code</h2>
          <p className="text-gray-600 text-base max-w-xs">
            Enter 6 digit code that we sent in your email address
          </p>
        </div>

        {/* OTP Input Group */}
        <div className="flex gap-2 sm:gap-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-12 sm:w-14 sm:h-14 border border-gray-300 rounded-lg text-center text-xl font-semibold focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button 
          className="btn w-full bg-[#D4ED71] hover:bg-[#c2db62] border-none text-black font-bold h-12 rounded-lg"
        >
          Verify Code
        </button>

      </form>
    </div>
  );
};

export default VerifyOTP;