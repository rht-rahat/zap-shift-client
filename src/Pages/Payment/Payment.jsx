import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payment = () => {
  const {parcelID} = useParams()
  const axiosSecure = useAxiosSecure()
  

  const {isLoading, data: parcel} = useQuery({
    queryKey: ["parcels", parcelID],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelID}`)
      return res.data
    }
  })

  console.log(parcel);
  
  const handlePayment = async() => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    }

    const res = await axiosSecure.post("/payment-checkout-session", paymentInfo)
    window.location.href=res.data.url
  }

  if(isLoading) {
    return <div className='flex min-h-screen justify-center items-center'>
      <span className="loading loading-ring loading-xl"></span>
    </div>
  }

  

  return (
    <div>
      <h2 className='text-2xl font-bold'>Please Pay for {parcel.parcelName}</h2>
      <button onClick={handlePayment} className='btn btn-secondary'>Pay: {parcel.cost}</button>
    </div>
  );
};

export default Payment;