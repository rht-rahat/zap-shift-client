import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

const ParcelsHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcels } = useQuery({
    queryKey: ["parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment?email=${user?.email}`);
      // console.log(res.data);
      return res.data;
    },
  });
  // console.log({ parcel: parcels?.length });
  return (
    <div className="card bg-base-100 shadow-sm">
      <h1 className="text-2xl font-extrabold px-5">
        Total parcels: {parcels?.length}
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
                {/* <th>Store</th> */}
                <th>Parcel Info</th>
                <th>Recipient Info</th>
                <th>Tracking Number</th>
                <th>Payment info</th>
                {/* <th>Payment</th> */}
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
              ) : parcels?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    No parcels found
                  </td>
                </tr>
              ) : (
                parcels?.map((parcel, index) => (
                  <tr key={parcel._id || index}>
                    <td>#{index + 1 || "PTD145142547"}</td>

                    <td>
                      <div>
                        <p className="font-medium">{parcel.parcelName}</p>
                      </div>
                    </td>

                    <td>{user.displayName}</td>

                    <td>{parcel.trackingId}</td>

                    <td>{parcel.transactionId}</td>

                    {/* <td>
                          <div
                            className={`badge ${
                              parcel.payment === "paid"
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            {parcel.payment || "Paid"}
                          </div>
                        </td> */}

                    <td>
                      <div className="badge badge-success">
                        <svg
                          className="size-[1em]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="currentColor"
                            strokeLinejoin="miter"
                            strokeLinecap="butt"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="square"
                              stroke-miterlimit="10"
                              strokeWidth="2"
                            ></circle>
                            <polyline
                              points="7 13 10 16 17 8"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="square"
                              stroke-miterlimit="10"
                              strokeWidth="2"
                            ></polyline>
                          </g>
                        </svg>
                        {parcel.paymentStatus === "paid" ? "Paid" : ""}
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

export default ParcelsHistory;
