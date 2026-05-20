import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email, "rider_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=parcel_delivered`,
      );
      return res.data;
    },
  });
  // console.log(parcels);

  const calculatePayout = (parcel) => {
    if(parcel.senderDistricts === parcel.receiverDistrict){
      return parcel.cost * 0.8
    }else{
      return parcel.cost * 0.6
    }
  }

  return (
    <div className="card bg-base-100 shadow-sm">
      <h1 className="text-2xl font-extrabold px-5">
        Total parcels: {parcels.length}
      </h1>
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">All Deliveries</h2>

           
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Cons ID</th>
                <th>Recipient</th>
                <th>Parcels Name</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Rider Name</th>
                <th>Amount</th>
                <th>Payable Amount</th>
                <th>Action</th>
  
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <div className="skeleton h-4 w-24"></div>
                    </td>

                    <td>
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-32"></div>
                        <div className="skeleton h-3 w-40"></div>
                      </div>
                    </td>

                    <td>
                      <div className="skeleton h-6 w-20 rounded-full"></div>
                    </td>

                    <td>
                      <div className="skeleton h-4 w-16"></div>
                    </td>

                    <td>
                      <div className="skeleton h-6 w-16 rounded-full"></div>
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <div className="skeleton h-8 w-14"></div>
                        <div className="skeleton h-8 w-14"></div>
                        <div className="skeleton h-8 w-14"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : parcels.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    No parcels found
                  </td>
                </tr>
              ) : (
                parcels.map((parcel, index) => (
                  <tr key={parcel._id || index}>
                    <td>#{index + 1 || "PTD145142547"}</td>

                    <td>
                      <div>
                        <p className="font-medium">{parcel.senderName}</p>

                        <p className="text-xs opacity-60">
                          {parcel?.senderThana}, {parcel?.senderDistricts},{" "}
                          {parcel?.senderRegion}
                        </p>
                      </div>
                    </td>

                    <td>{parcel.parcelName}</td>

                    <td>
                      <div
                        className={`badge badge-sm badge-outline ${
                          parcel.status === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {parcel.status}
                      </div>
                    </td>

                    

                    <td>
                      <div
                        className={`badge ${
                          parcel.deliveryStatus
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {!parcel?.deliveryStatus
                          ? "Pay First"
                          : parcel?.deliveryStatus === "parcel_delivered" ? "Delivered" : " "}
                      </div>
                    </td>
                    <td>{parcel.riderName}</td>
                    <td>৳{parcel?.cost}</td>
                    <td>{calculatePayout(parcel)}</td>

                    <td>
                      <div className="flex gap-2 items-center">
                        
                          <button className="btn btn-secondary">
                            Cash Out
                          </button>
                        
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
