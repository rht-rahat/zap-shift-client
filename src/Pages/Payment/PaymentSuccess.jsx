import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const hasFetched = useRef(false); // ← এটাই মূল fix

  useEffect(() => {
    if (!sessionId || hasFetched.current) return; // already fetched হলে বন্ধ
    hasFetched.current = true; // প্রথমবারের পরে block করো

    // localStorage-এ আগের data আছে কিনা চেক করো
    const cached = localStorage.getItem(`payment_${sessionId}`);
    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaymentInfo(JSON.parse(cached));
      return;
    }

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        const data = {
          trackingId: res.data.trackingId,
          status: res.data.status,
          transactionId: res.data.transactionId,
          amount: res.data.amount,
        };
        setPaymentInfo(data);
        // localStorage-এ save করো যাতে refresh-এ আর API call না হয়
        localStorage.setItem(`payment_${sessionId}`, JSON.stringify(data));
      })
      .catch((err) => console.error(err));
  }, [sessionId, axiosSecure]); // axiosSecure dependency বাদ দাও

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 border border-green-100">
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-20 h-20 text-green-600" />
          </div>
        </div>

        <div className="text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Payment Successful
          </h1>
          <p className="text-gray-500 mt-3 text-base md:text-lg">
            Your payment has been completed successfully.
          </p>
        </div>

        <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Transaction ID</span>
            <span className="font-semibold text-sm break-all">
              {paymentInfo.transactionId}
            </span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Tracking ID</span>
            <span className="font-semibold">{paymentInfo.trackingId}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Amount</span>
            <span className="font-semibold">৳{paymentInfo.amount}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Payment Method</span>
            <span className="font-semibold">Credit Card</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Status</span>
            <span className="text-green-600 font-bold">Paid</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard/my-parcels"
            className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Go Dashboard
          </Link>
          <Link
            to="/"
            className="flex-1 text-center border border-gray-300 hover:border-green-500 hover:text-green-600 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-300"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;