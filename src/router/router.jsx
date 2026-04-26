import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayouts from "../layouts/RootLayouts/RootLayouts";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import VerifyOTP from "../Pages/Auth/VerifyOTP/VerifyOTP";
import ForgotPassword from "../Pages/Auth/ForgotPassowrd/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword/ResetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("warehouses.json").then(res => res.json())
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword
      },
      {
        path: 'reset-password',
        Component: ResetPassword
      },
      {
        path: "VerifyOTP",
        Component: VerifyOTP,
      }
    ]
  }
])