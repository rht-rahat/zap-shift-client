import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck, FaUserMinus } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ApprovedRiders = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = async (rider, status) => {
    console.log(rider, rider.email);
    const updateInfo = { status: status, email: rider?.email };
    const res = await axiosSecure.patch(`/riders/${rider._id}`, updateInfo);
    console.log(res.data);
    if (res.data.modifiedCount) {
      toast.success(`${rider.name} রাইডার হিসেবে ${status} করা হয়েছে ।`);
      console.log("riderId", res.data);
    }
    refetch();
  };

  const handleApproval = async (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelete = async (id, name) => {
    // console.log(id, name);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/riders/${id}`);
        // console.log(res.data);

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: `${name} Rider file has been deleted.`,
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <h1 className="text-2xl font-extrabold px-5">
        Total parcels: {riders.length}
      </h1>
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h2 className="card-title">All Deliveries</h2>

          {/* <button className="btn btn-primary btn-sm">+ Add Delivery</button> */}
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Bike Info</th>
                <th>Status</th>
                <th>Phone</th>
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
              ) : riders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    No riders application found
                  </td>
                </tr>
              ) : (
                riders.map((rider, index) => (
                  <tr key={rider._id || index}>
                    <td>#{index + 1 || "PTD145142547"}</td>

                    <td>{rider.displayName}</td>
                    <td>{rider.email}</td>

                    <td>
                      <div>
                        <p className="font-medium">{rider.displayName}</p>

                        <p className="text-xs opacity-60">
                          {rider?.region}, {rider?.district},{" "}
                        </p>
                      </div>
                    </td>

                    <td>{rider.bikeInfo}</td>

                    <td>
                      <div
                        className={`badge badge-sm badge-outline ${
                          rider.status === "pending"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {rider.status}
                      </div>
                    </td>

                    <td>{rider.phone}</td>

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
                      <div className="flex gap-2 items-center">
                        {/* {rider.status === "paid" ? (
                          <span disabled className="btn btn-square btn-primary">
                            Paid
                          </span>
                        ) : (
                          <button
                            // onClick={() => handlePayment(parcel)}
                            className="btn btn-square btn-primary text-amber-950"
                          >
                            Pay
                          </button>
                        )} */}

                        <button
                          disabled={rider.status === "approved"}
                          onClick={() => handleApproval(rider)}
                          className="btn btn-square btn-primary text-amber-950"
                        >
                          <FaUserCheck />
                        </button>

                        <button
                          disabled={rider.status === "rejected"}
                          onClick={() => handleReject(rider)}
                          className="btn btn-square btn-info text-white"
                        >
                          <FaUserMinus />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(rider._id, rider.displayName)
                          }
                          className="btn btn-square btn-error text-white"
                        >
                          <IoTrashOutline />
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

export default ApprovedRiders;
