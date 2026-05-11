import React, { useState } from "react";
import {
  IoMenu,
  IoGridOutline,
  IoCubeOutline,
  IoDocumentTextOutline,
  IoStorefrontOutline,
  IoLocationOutline,
  IoSettingsOutline,
  IoLockClosedOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const menuItems = [
    // {
    //   name: "Dashboard",
    //   path: "/dashboard",
    //   icon: <IoGridOutline size={20} />,
    // },
    {
      name: "My Parcels",
      path: "/dashboard/my-parcels",
      icon: <IoCubeOutline size={20} />,
    },
    {
      name: "Invoices",
      path: "/dashboard/invoices",
      icon: <IoDocumentTextOutline size={20} />,
    },
    {
      name: "Stores",
      path: "/dashboard/stores",
      icon: <IoStorefrontOutline size={20} />,
    },
    {
      name: "Coverage Area",
      path: "/dashboard/coverage",
      icon: <IoLocationOutline size={20} />,
    },
  ];

  const generalItems = [
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <IoSettingsOutline size={20} />,
    },
    {
      name: "Change Password",
      path: "/dashboard/change-password",
      icon: <IoLockClosedOutline size={20} />,
    },
    {
      name: "Help",
      path: "/dashboard/help",
      icon: <IoHelpCircleOutline size={20} />,
    },
  ];

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      {/* TOGGLE */}
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* NAVBAR */}
        <nav className="navbar bg-base-100 border-b border-base-300 px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-square btn-ghost"
            >
              {isSidebarOpen ? (
                <IoChevronBack size={22} />
              ) : (
                <IoChevronForward size={22} />
              )}
            </button>

            <h1 className="text-xl font-bold hidden md:block">Dashboard</h1>
          </div>

          <div className="flex-1"></div>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <button className="btn btn-circle btn-ghost">
              <div className="indicator">
                <IoNotificationsOutline size={22} />

                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>

            {/* USER */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost gap-3">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10">
                    <img src={user?.photoURL} alt="" />
                  </div>
                </div>

                <div className="hidden md:block text-left">
                  <h2 className="text-sm font-semibold leading-none">
                    {user?.displayName}
                  </h2>

                  {/* <p className="text-xs text-base-content/60">Admin</p> */}
                </div>
              </div>

              {/* <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-base-300"
              >
                <li>
                  <a>Profile</a>
                </li>

                <li>
                  <a>Settings</a>
                </li>

                <li>
                  <a className="text-error">Logout</a>
                </li>
              </ul> */}
            </div>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-6">
          <div className="bg-base-100 rounded-2xl p-5 min-h-[calc(100vh-110px)]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side is-drawer-close:overflow-visible z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="flex min-h-full flex-col bg-base-100 border-r border-base-300 duration-300 is-drawer-close:w-20 is-drawer-open:w-72">
          {/* LOGO */}
          <div className="h-16 border-b border-base-300 flex items-center px-5">
            <Link to="/">
              <h1 className="text-2xl font-extrabold text-black tracking-wide">
                Z
              </h1>
            </Link>
          </div>

          {/* MENU */}
          <div className="flex-1 p-3">
            <p className="text-xs font-semibold text-base-content/50 px-3 mb-2">
              MENU
            </p>

            <ul className="menu gap-1 w-full">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `
                        rounded-xl flex items-center gap-3
                        ${
                          isActive
                            ? "bg-primary text-amber-950"
                            : "hover:bg-base-200"
                        }
                      `
                    }
                  >
                    <span
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip={item.name}
                    >
                      {item.icon}
                    </span>

                    <span className="is-drawer-close:hidden">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="divider my-5"></div>

            <p className="text-xs font-semibold text-base-content/50 px-3 mb-2">
              GENERAL
            </p>

            <ul className="menu gap-1 w-full">
              {generalItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="rounded-xl flex items-center gap-3 hover:bg-base-200"
                  >
                    <span
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip={item.name}
                    >
                      {item.icon}
                    </span>

                    <span className="is-drawer-close:hidden">{item.name}</span>
                  </NavLink>
                </li>
              ))}

              {/* LOGOUT */}
              <li className="mt-2">
                <button className="rounded-xl flex items-center gap-3 text-error hover:bg-error/10">
                  <span
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Logout"
                  >
                    <IoLogOutOutline size={20} />
                  </span>

                  <span className="is-drawer-close:hidden">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
