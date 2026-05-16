import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiEdit, FiShieldOff } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res?.data);
      return res?.data;
    },
  });

  const handleMakeAdmin = async (user) => {
    const roleInfo = { role: "admin" };

    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `${user.displayName} কে অ্য়াডমিন বানাতে চান`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্য়া আমি চাই",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "অ্য়াডমিন",
            text: `${user.displayName} কে সফল ভাবে অ্যাডমিন করা হয়েছে।`,
            icon: "success",
          });
        }
      }
    });
  };

  const handleRemoveAdmin = async (user) => {
    const roleInfo = { role: "user" };

    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: `${user.displayName} কে অ্য়াডমিন থেকে বাতিল করতে চান`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্য়া আমি চাই",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/${user._id}`, roleInfo);

        console.log(res.data);

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "অ্য়াডমিন",
            text: `${user.displayName} কে সফল ভাবে অ্যাডমিন থেকে বাতিল করা হয়েছে।`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <h1 className="text-2xl font-extrabold px-5">
        Total users: {users?.length}
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
                <th>No.</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Admin Action</th>
                <th>Others Actions</th>
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
              ) : users?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10">
                    No users found
                  </td>
                </tr>
              ) : (
                users?.map((user, index) => (
                  <tr key={user._id || index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.displayName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "user" ? (
                        <div className="badge badge-accent">User</div>
                      ) : user.role === "admin" ? (
                        <div className="badge badge-neutral">Admin</div>
                      ) : (
                        <div className="badge badge-info">Rider</div>
                      )}
                    </td>
                    <th>
                      {user.role === "admin" ? (
                        <button
                          onClick={() => handleRemoveAdmin(user)}
                          className="btn btn-square btn-secondary "
                        >
                          <FiShieldOff size={10} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-square btn-neutral "
                        >
                          <FaUserShield size={10} />
                        </button>
                      )}
                    </th>
                    <th>
                      <button className="btn btn-square ">d</button>
                    </th>
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

export default UserManagement;
