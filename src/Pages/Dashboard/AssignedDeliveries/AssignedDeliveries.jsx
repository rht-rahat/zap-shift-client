import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { IoTrashOutline } from "react-icons/io5";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const AssignedDeliveries = () => {
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
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider_assigned`,
      );
      return res.data;
    },
  });

  const handleAcceptDelivery = async (parcel) => {
    const statusInfo = { deliveryStatus: "rider_arriving" };
    const res = await axiosSecure.patch(
      `/parcels/${parcel._id}/status`,
      statusInfo,
    );
    if (res.data.modifiedCount > 0) {
      await refetch();
      toast.success("Thanks for accepting parcel");
    }
  };

  const handleReject = async (parcel) => {
    const res = await axiosSecure.patch(`/parcels/${parcel._id}/reject-rider`);

    if (res.data.modifiedCount > 0) {
      await refetch();
      toast.success("Rider rejected");
    }
  };

  const handleDeliveryStatusUpdate = async (parcel, status) => {
    const statusInfo = { deliveryStatus: status, riderId: parcel.riderId, trackingId: parcel.trackingId};

    let message = `parcel status is updated ${status === "pick_up" ? "Pickup Parcel" : "Parcel Delivered"}`
    const res = await axiosSecure.patch(
      `/parcels/${parcel._id}/status`,
      statusInfo,
    );
    if (res.data.modifiedCount > 0) {
      await refetch();
      toast.success(message);
    }
  };
  return (
    <div className="card bg-base-100 shadow-sm">
      <h1 className="text-2xl font-extrabold px-5">
        Total parcels: {parcels.length}
      </h1>
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">All Deliveries</h2>

          <button className="btn btn-primary btn-sm">+ Add Delivery</button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Cons ID</th>
                {/* <th>Store</th> */}
                <th>Recipient</th>
                <th>Parcels Name</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Delivery Status</th>
                <th>Rider Name</th>
                {/* <th>Payment</th> */}
                <th>Action</th>
                <th>Others Action</th>
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

                    <td>৳{parcel.cost}</td>

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
                          : parcel?.deliveryStatus}
                      </div>
                    </td>
                    <td>{parcel.riderName}</td>

                    <td>
                      <div className="flex gap-2 items-center">
                        {parcel.deliveryStatus === "rider_assigned" ? (
                          <>
                            <button
                              onClick={() => handleAcceptDelivery(parcel)}
                              className="btn btn-square btn-info text-white"
                            >
                              <FaCheck />
                            </button>

                            <button
                              onClick={() => handleReject(parcel)}
                              className="btn btn-square btn-error text-white"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-secondary">
                            Accepted
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                        disabled={parcel.deliveryStatus === "pick_up"}
                          onClick={() =>
                            handleDeliveryStatusUpdate(parcel, "pick_up")
                          }
                          className="btn btn-secondary"
                        >
                          Pick Up
                        </button>
                        <button
                          onClick={() =>
                            handleDeliveryStatusUpdate(parcel, "parcel_delivered")
                          }
                          className="btn btn-secondary"
                        >
                          Delivery
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

export default AssignedDeliveries;
