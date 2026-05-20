import React from "react";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import RiderDashboard from "./RiderDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "user") {
    return <UserDashboardHome />;
  } else {
    return <RiderDashboard />;
  }

  // eslint-disable-next-line no-unreachable
  return <div>This is a dashboard home</div>;
};

export default DashboardHome;
