import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    // intercept request
    const requestIntercept =axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`
      return config;
    });

    // interceptor response

    const responseIntercept = axiosSecure.interceptors.response.use((response)=>{
      return response;
    }, (error)=> {
      // console.log(error.response);
      const statusCode = error.response.status
      // console.log(statusCode);

      if(statusCode === 401 || statusCode === 403){
        logout()
        .then(()=>{
          navigate('/login')
        })
      }
      return Promise.reject(error)
    })

    return () => {
      axiosSecure.interceptors.request.eject(requestIntercept)
      axiosSecure.interceptors.response.eject(responseIntercept)
    }
  }, [user, navigate, logout]);
  return axiosSecure;
};

export default useAxiosSecure;
