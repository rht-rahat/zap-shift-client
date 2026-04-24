import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayouts from "../layouts/RootLayouts/RootLayouts";
import Coverage from "../Pages/Coverage/Coverage";

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
  }
])