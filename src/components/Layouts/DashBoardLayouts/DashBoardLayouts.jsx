import React from "react";
import Navbar from "../../Shared/Navbar";
import Profile from "../../Pages/Dashboard/Users/UserProfie/Profile";
import useUserData from "../../Hooks/useUserData";
import { MdDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { ImLab } from "react-icons/im";
import {
  FaAccessibleIcon,
  FaFilePrescription,
  FaUserAlt,
  FaUserMd,
} from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";

const DashBoardLayouts = () => {
  const [user, role] = useUserData();

  return (
    <>
      <Navbar></Navbar>
      <div className="grid grid-cols-6">
        <div className="min-h-[calc(100vh-68px)] p-3 pt-0 space-y-2 w-full bg-tahiti-darkGreen text-tahiti-white">
          <Profile userInfo={user} />
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="bg-gray-800 text-gray-50">
              <NavLink
                to="/"
                activeclassname="active"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <MdDashboard className="text-tahiti-white text-xl" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                to="/patients"
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                <FaAccessibleIcon className="text-tahiti-white text-xl"></FaAccessibleIcon>
                <span>Patients</span>
              </NavLink>
            </li>

            {(role === "super-admin" || role === "admin") && (
              <>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/doctors"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <FaUserMd className="text-tahiti-white text-xl" />
                    <span>Doctors</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/alluser"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    {" "}
                    <FaUserAlt className="text-tahiti-white text-xl" />
                    <span>Users</span>
                  </NavLink>
                </li>
              </>
            )}
            {(role === "super-admin" ||
              role === "admin" ||
              role === "labaratorist") && (
              <li>
                <NavLink
                  to="/tests"
                  activeclassname="active"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <ImLab className="text-xl text-tahiti-white"></ImLab>
                  <span>Tests</span>
                </NavLink>
              </li>
            )}
            {(role === "super-admin" ||
              role === "admin" ||
              role === "accountant") && (
              <>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="/allinvoice"
                    className="flex items-center p-2 space-x-3 rounded-md"
                  >
                    <TbFileInvoice className="text-tahiti-white text-xl"></TbFileInvoice>
                    <span>Invoice</span>
                  </NavLink>
                </li>
              </>
            )}
            {role === "doctor" && (
              <li>
                <NavLink activeclassname="active" to="/myappointment">
                  {" "}
                  <FaFilePrescription className="text-tahiti-white text-3xl"></FaFilePrescription>
                  <span className="text-2xl font-semibold text-tahiti-white">
                    Appointments
                  </span>
                </NavLink>
              </li>
            )}
            {(role === "super-admin" ||
              role === "admin" ||
              role === "receptionist" ||
              role === "accountant") && (
              <li>
                <NavLink
                  activeClassName="active"
                  to="/appointment"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  {" "}
                  <FaFilePrescription className="text-tahiti-white text-xl"></FaFilePrescription>
                  <span>Appointments</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="col-span-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoardLayouts;
