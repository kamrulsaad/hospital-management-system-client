import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Profile from "../../Pages/Dashboard/Users/UserProfie/Profile";
import { ImLab, ImList2 } from "react-icons/im";
import { MdDashboard } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import {
  FaFilePrescription,
  FaAccessibleIcon,
  FaUserMd,
  FaUserAlt,
} from "react-icons/fa";
import useUserData from "../../Hooks/useUserData";
import Spinner from "../../Shared/Spinner";
import Navbar from "../../Shared/Navbar";

const DashBoardLayouts = () => {
  const [user, userRole, loading] = useUserData();
  const navigate = useNavigate();

  if (loading) return <Spinner bg></Spinner>;

  // LogOutButton

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-end">
        <div className="navbar lg:hidden">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn bg-tahiti-lightGreen drawer-button mt-5"
              >
                <ImList2 />
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-tahiti-lightBlue rounded-box w-52"
              >
                <li>
                  <NavLink activeClassName="active" to="/">
                    <MdDashboard />
                    <span className="text-lg font-semibold text-tahiti-white  ">
                      DashBoard
                    </span>
                  </NavLink>
                </li>

                {userRole === "super-admin" && (
                  <>
                    <li>
                      <NavLink activeClassName="active" to="/alluser">
                        {" "}
                        <FaUserAlt className="text-tahiti-white text-3xl" />
                        <span className="text-lg font-semibold text-tahiti-white  ">
                          Users
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}

                {(userRole === "super-admin" || userRole === "admin") && (
                  <>
                    <li>
                      <NavLink activeClassName="active" to="/doctors">
                        <FaUserMd className="text-tahiti-white text-3xl" />
                        <span className="text-lg font-semibold text-tahiti-white  ">
                          Doctor
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}

                {(userRole === "super-admin" ||
                  userRole === "admin" ||
                  userRole === "receptionist") && (
                  <>
                    <li>
                      <NavLink activeClassName="active" to="/patients">
                        <FaAccessibleIcon className="text-tahiti-white text-3xl"></FaAccessibleIcon>
                        <span className="text-lg font-semibold text-tahiti-white  ">
                          Patient
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink activeClassName="active" to="/myappointment">
                        {" "}
                        <FaFilePrescription className="text-tahiti-white text-3xl"></FaFilePrescription>
                        <span className="text-lg font-semibold text-tahiti-white  ">
                          Appointments
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer drawer-mobile">
        <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content rounded-tl-xl ml-5 bg-tahiti-green ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <Profile userInfo={user}></Profile>
          <div className="hidden lg:block">
            <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
            <ul className="menu  p-4 w-80  text-base-content  ">
              <li>
                <NavLink  to="/">
                  

                  <span className="text-2xl font-semibold text-tahiti-white  ">
                    DashBoard
                  </span>
                </NavLink>
              </li>

              {(userRole === "super-admin" || userRole === "admin") && (
                <>
                  <li>
                    <NavLink activeclassname="active" to="/doctors">
                      <FaUserMd className="text-tahiti-white text-3xl" />
                      <span className="text-2xl font-semibold text-tahiti-white">
                        Doctors
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeclassname="active" to="/alluser">
                      {" "}
                      <FaUserAlt className="text-tahiti-white text-3xl" />
                      <span className="text-2xl font-semibold text-tahiti-white">
                        Users
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {(userRole === "super-admin" ||
                userRole === "admin" ||
                userRole === "accountant") && (
                <>
                  <li>
                    <NavLink activeclassname="active" to="/allinvoice">
                      <TbFileInvoice className="text-tahiti-white text-3xl"></TbFileInvoice>
                      <span className="text-2xl font-semibold text-tahiti-white">
                        Invoice
                      </span>
                    </NavLink>
                  </li>
                </>
              )}

              {(userRole === "super-admin" ||
                userRole === "admin" ||
                userRole === "receptionist" ||
                userRole === "accountant") && (
                <>
                  <li>
                    <NavLink activeClassName="active" to="/patients">
                      <FaAccessibleIcon className="text-tahiti-white text-3xl"></FaAccessibleIcon>
                      <span className="text-2xl font-semibold text-tahiti-white">
                        Patient
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="active" to="/appointment">
                      {" "}
                      <FaFilePrescription className="text-tahiti-white text-3xl"></FaFilePrescription>
                      <span className="text-2xl font-semibold text-tahiti-white">
                        Appointment
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {userRole === "doctor" && (
                <>
                  <li>
                    <NavLink activeclassname="active" to="/patients">
                      <FaAccessibleIcon className="text-tahiti-white text-3xl"></FaAccessibleIcon>
                      <span className="text-2xl font-semibold text-tahiti-white">
                        Patient
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeclassname="active" to="/myappointment">
                      {" "}
                      <FaFilePrescription className="text-tahiti-white text-3xl"></FaFilePrescription>
                      <span className="text-2xl font-semibold text-tahiti-white">
                        Appointments
                      </span>
                    </NavLink>
                  </li>
                </>
              )}
              {(userRole === "super-admin" || userRole === "labaratorist") && (
                <li>
                  <NavLink to="/tests">
                    {" "}
                    
                    <span className="text-2xl font-semibold text-tahiti-white">
                      Tests
                    </span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayouts;
