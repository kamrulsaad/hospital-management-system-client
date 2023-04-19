import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Profile from "../../Pages/Dashboard/Users/UserProfie/Profile";
import { ImList2 } from "react-icons/im";
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

const DashBoardLayouts = () => {
  const [user, userRole, loading] = useUserData();
  const navigate = useNavigate();

  if (loading) return <Spinner bg></Spinner>;

  // LogOutButton
  const handleLogOut = () => {
    localStorage.removeItem("LoginToken");
    navigate("/user/login");
  };

  return (
    <div >
      <div className="flex justify-end -mb-11 mr-10 ">





        {/* nav bar  */}
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
        {/* nabbar */}









        {/* Logout Button */}
        <button onClick={handleLogOut} >
          <div className="flex justify-around mt-1">
            <p className="text-tahiti-white  text-3xl -mr-5 mt-1 font-bold">Log Out</p>
            <svg
              width="120"
              height="39"
              viewBox="0 0 181 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-ml-16"
            >
              <path
                d="M169.214 6.43326L180.007 17.1234C180.64 17.7502 181 18.6121 181 19.5C181 20.3879 180.64 21.2498 180.007 21.8766L169.214 32.5667C168.651 33.1239 167.896 33.4286 167.104 33.4286C165.461 33.4286 164.125 32.1054 164.125 30.4775V25.0714H152.875C151.319 25.0714 150.062 23.8266 150.062 22.2857V16.7143C150.062 15.1734 151.319 13.9286 152.875 13.9286H164.125V8.52254C164.125 6.89464 165.461 5.57143 167.104 5.57143C167.896 5.57143 168.651 5.88482 169.214 6.43326ZM150.062 5.57143H144.438C142.882 5.57143 141.625 6.81629 141.625 8.35714V30.6429C141.625 32.1837 142.882 33.4286 144.438 33.4286H150.062C151.618 33.4286 152.875 34.6734 152.875 36.2143C152.875 37.7551 151.618 39 150.062 39H144.438C139.779 39 136 35.2567 136 30.6429V8.35714C136 3.7433 139.779 0 144.438 0H150.062C151.618 0 152.875 1.24487 152.875 2.78571C152.875 4.32656 151.618 5.57143 150.062 5.57143Z"
                fill="#00CC99"
              />

            </svg>
          </div>
        </button>
      </div>
      <div className="drawer drawer-mobile ">
        <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content mt-20 rounded-tl-xl ml-5 bg-tahiti-green ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side grid grid-rows-4 mb-2 ">
          <div
            // onClick={changeRoute}
            className="flex justify-center lg:block "
          >
            <div className="lg:mt-20 hidden lg:block">
              <Link to='/'>
                <h1 className=" text-4xl font-bold -mt-16 ml-5 mb-10">
                  <span className="text-tahiti-lightGreen">UNICEH </span>
                  <span className="text-tahiti-white">HMS</span>
                </h1>
              </Link>
              <Link to="/userprofile">
                {" "}
                <Profile userInfo={user}></Profile>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
            <ul className="menu  p-4 w-80  text-base-content  ">
              <li>
                <NavLink activeclassname="active" to="/">
                  <MdDashboard className="text-tahiti-white text-3xl" />

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
              {(userRole === "super-admin" || userRole === "admin" || userRole === "accountant") && (
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayouts;
