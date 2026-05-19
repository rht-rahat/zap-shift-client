import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const axiosSecure = useAxiosSecure();
  const riderModalRef = useRef();

  const {
    data: parcels,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=pending-pickup",
      );
      return res.data;
    },
  });

  const { data: riders = [], refetch: refetchRiders } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistricts, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.senderDistricts}&workStatus=available`,
      );
      return res.data;
    },
  });

  console.log("riders array", riders);

  const handleOpenModalAssignRider = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = async (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.displayName,
      parcelId: selectedParcel._id,
      trackingId: selectedParcel.trackingId
    };
    const res = await axiosSecure.patch(
      `/parcels/${selectedParcel._id}`,
      riderAssignInfo,
    );

    if (res.data.modifiedCount > 0) {
      await refetch();
      await refetchRiders();
      riderModalRef.current.close();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Rider has been assigned",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <h1 className="text-2xl font-extrabold px-5">
        Total parcels: {parcels?.length}
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
                <th>ID</th>
                <th>Sender Name</th>
                <th>Parcel Name</th>
                <th>Cost</th>
                <th>Created At</th>
                <th>Tracking Number</th>
                <th>PickUp District</th>
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
                    <td>#{index + 1}</td>

                    <td>{parcel?.senderName}</td>

                    <td>
                      <div>
                        <p className="font-medium">{parcel.parcelName}</p>
                      </div>
                    </td>

                    <td>{parcel.cost}</td>

                    <td>{parcel.created_at}</td>
                    <td>{parcel.trackingId}</td>

                    <td>
                      {parcel.senderDistricts}, {parcel.senderThana}
                    </td>

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
                      <button
                        onClick={() => handleOpenModalAssignRider(parcel)}
                        className="btn btn-primary text-amber-950"
                      >
                        Find Riders
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog
        ref={riderModalRef}
        className="modal modal-bottom  sm:modal-middle"
      >
        <div className="modal-box max-w-4xl mx-auto">
          <h3 className="font-bold text-lg">
            Available Riders: {riders?.length}!
          </h3>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Riders Name</th>
                  <th>Email</th>
                  <th>District</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  [...Array(3)].map((_, index) => (
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
                ) : riders?.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10">
                      No parcels found
                    </td>
                  </tr>
                ) : (
                  riders?.map((rider, index) => (
                    <tr key={rider._id || index}>
                      <td>#{index + 1}</td>

                      <td>{rider?.displayName}</td>

                      <td>
                        <div>
                          <p className="font-medium">{rider.email}</p>
                        </div>
                      </td>

                      <td>{rider.district}</td>

                      <td>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn btn-primary  text-amber-950"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
