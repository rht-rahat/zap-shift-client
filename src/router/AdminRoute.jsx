import React from 'react';
import { useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../Components/Forbidden/Forbidden';

const AdminRoute = ({children}) => {
   const { user, loading } = useAuth();
   const {role, roleLoading} = useRole();
  const location = useLocation();

  // console.log("From Private Route", location);

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (role !== "admin") {
    return <Forbidden></Forbidden>
  }
  return children;
};

export default AdminRoute;