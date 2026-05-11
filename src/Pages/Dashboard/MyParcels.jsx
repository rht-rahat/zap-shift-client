import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["myParcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id, name) => {
    // console.log(id, name);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.delete(`/parcels/${id}`);
      if (res.data.deletedCount > 0) {
        await refetch()
        await Swal.fire({
          title: "Deleted!",
          text: `Your parcel '${name}' has been deleted.`,
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message,
      });
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
                <th>Payment</th>
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
                        className={`badge badge-outline ${
                          parcel.status === "Delivered"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {parcel.status || "Delivered"}
                      </div>
                    </td>

                    <td>৳{parcel.cost || "100"}</td>

                    <td>
                      <div
                        className={`badge ${
                          parcel.payment === "paid"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {parcel.payment || "Paid"}
                      </div>
                    </td>

                    <td>
                      <div className="flex gap-2 items-center">
                        <button className="btn btn-square btn-primary text-amber-950">
                          Pay
                        </button>

                        <button className="btn btn-square btn-info text-white">
                          <FiEdit />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(parcel._id, parcel.parcelName)
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

export default MyParcels;
