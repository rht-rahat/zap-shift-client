import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../Components/Forbidden/Forbidden';

const UserRoute = ({children}) => {
 const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  // const location = useLocation();

  // console.log("From Private Route", location);

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (role !== "user") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default UserRoute;