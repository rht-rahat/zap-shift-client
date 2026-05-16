import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useRole = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()


  const {data: role = 'user', isLoading: roleLoading} = useQuery({queryKey: ["user-role", user?.email], queryFn: async()=> {
    const res = await axiosSecure.get(`/users/${user?.email}/role`)
    return res.data.role
  }})
  return {role, roleLoading}
};

export default useRole;