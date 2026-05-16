import React from "react";
import { Link } from "react-router";
import { XCircle } from "lucide-react";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 border border-red-100">
        
        {/* Cancel Icon */}
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle className="w-20 h-20 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Payment Cancelled
          </h1>

          <p className="text-gray-500 mt-3 text-base md:text-lg">
            Your payment was not completed.  
            You can try again anytime.
          </p>
        </div>

        {/* Payment Info */}
        <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Transaction ID</span>
            <span className="font-semibold">#TXN948372</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Amount</span>
            <span className="font-semibold">$120.00</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Reason</span>
            <span className="font-semibold text-red-500">
              User Cancelled
            </span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Status</span>
            <span className="text-red-600 font-bold">
              Cancelled
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard/my-parcels"
            className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="flex-1 text-center border border-gray-300 hover:border-red-500 hover:text-red-600 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;