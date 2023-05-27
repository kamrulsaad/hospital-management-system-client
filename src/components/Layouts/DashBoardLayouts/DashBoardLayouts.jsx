import React from "react";
import Navbar from "../../Shared/Navbar";
import Profile from "../../Pages/Dashboard/Users/UserProfie/Profile";
import useUserData from "../../Hooks/useUserData";
import { MdDashboard } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { ImLab } from "react-icons/im";
import {
  FaAccessibleIcon,
  FaBed,
  FaFilePrescription,
  FaUserAlt,
  FaUserMd,
} from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { VscReferences } from "react-icons/vsc";
import { BiMoneyWithdraw } from "react-icons/bi";

const DashBoardLayouts = () => {
  const { user, role } = useUserData();

  return (
    <>
      <Navbar></Navbar>
      <div className="grid grid-cols-6">
        <div className="h-[calc(100vh-68px)] sticky top-[68px] p-3 pt-0 flex flex-col justify-between space-y-2 w-full bg-tahiti-darkGreen text-tahiti-white">
          <div>
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
                  activeclassname="active"
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
                role === "receptionist") && (
                <>
                  <li>
                    <NavLink
                      to="/beds"
                      activeclassname="active"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <FaBed className="text-xl text-tahiti-white"></FaBed>
                      <span>Beds</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeclassname="active"
                      to="/pc"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <VscReferences className="text-tahiti-white text-xl"></VscReferences>
                      <span>PC</span>
                    </NavLink>
                  </li>
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
                  <li>
                    <NavLink
                      activeclassname="active"
                      to="/expense/all"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BiMoneyWithdraw className="text-tahiti-white text-xl"></BiMoneyWithdraw>
                      <span>Expenses</span>
                    </NavLink>
                  </li>
                </>
              )}
              {role === "doctor" && (
                <li>
                  <NavLink
                    className="flex items-center p-2 space-x-3 rounded-md"
                    activeclassname="active"
                    to="/myappointment"
                  >
                    {" "}
                    <FaFilePrescription className="text-tahiti-white text-xl"></FaFilePrescription>
                    <span>Appointments</span>
                  </NavLink>
                </li>
              )}
              {(role === "super-admin" ||
                role === "admin" ||
                role === "receptionist" ||
                role === "accountant") && (
                <li>
                  <NavLink
                    activeclassname="active"
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
          <p className="text-xs">
            Powered by <img className="w-4 inline" src="/favicon.ico" alt="" />{" "}
            UNIECH{" "}
          </p>
        </div>
        <div className="col-span-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoardLayouts;
