import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayouts from "../layouts/RootLayouts/RootLayouts";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import VerifyOTP from "../Pages/Auth/VerifyOTP/VerifyOTP";
import ForgotPassword from "../Pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../Pages/Auth/ResetPassword/ResetPassword";
import Rider from "../Pages/Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Payment/Payment";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Payment/PaymentCancel ";
import ParcelsHistory from "../Pages/Dashboard/ParcelsHistory";
import ApprovedRiders from "../Pages/Dashboard/ApprovedRiders/ApprovedRiders";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoutes from "./RiderRoutes";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import UserRoute from "./UserRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack/ParcelTrack";

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
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "parcel-track/:trackingId",
        Component: ParcelTrack
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "send-Parcel",
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <p>Loading...</p>
      },
    ],
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
        path: "forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "reset-password",
        Component: ResetPassword,
      },
      {
        path: "VerifyOTP",
        Component: VerifyOTP,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'my-parcels',
        element: <UserRoute><MyParcels /></UserRoute>
        // Component: MyParcels
      },
      {
        path: 'payment/:parcelID',
        element: <UserRoute><Payment /></UserRoute>
        // Component: Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancel
      },
      {
        path: 'payment-history',
        element: <UserRoute><ParcelsHistory /></UserRoute>
      },
      // riders only routes

      {
        path: "assigned-deliveries",
        element: <RiderRoutes><AssignedDeliveries /></RiderRoutes>
      },
      {
        path: "completed-deliveries",
        element: <RiderRoutes><CompletedDeliveries /></RiderRoutes>
      },

      // admin routes
      {
        path: 'approved-riders',
        element: <AdminRoute><ApprovedRiders/></AdminRoute>
        // Component: ApprovedRiders
      },
      {
        path: 'user-management',
        element: <AdminRoute><UserManagement/></AdminRoute>
        // Component: UserManagement
      },
      {
        path: 'assign-riders',
        element: <AdminRoute><AssignRiders/></AdminRoute>
        // Component: UserManagement
      },
    ]
  }
]);
