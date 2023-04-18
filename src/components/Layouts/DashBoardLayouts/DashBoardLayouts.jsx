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
      <div className="flex justify-end -mb-14 mr-10 ">

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
                  <NavLink activeClassName="active"  to="/">
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
          <svg
            width="181"
            height="39"
            viewBox="0 0 181 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-3"
          >
            <path
              d="M169.214 6.43326L180.007 17.1234C180.64 17.7502 181 18.6121 181 19.5C181 20.3879 180.64 21.2498 180.007 21.8766L169.214 32.5667C168.651 33.1239 167.896 33.4286 167.104 33.4286C165.461 33.4286 164.125 32.1054 164.125 30.4775V25.0714H152.875C151.319 25.0714 150.062 23.8266 150.062 22.2857V16.7143C150.062 15.1734 151.319 13.9286 152.875 13.9286H164.125V8.52254C164.125 6.89464 165.461 5.57143 167.104 5.57143C167.896 5.57143 168.651 5.88482 169.214 6.43326ZM150.062 5.57143H144.438C142.882 5.57143 141.625 6.81629 141.625 8.35714V30.6429C141.625 32.1837 142.882 33.4286 144.438 33.4286H150.062C151.618 33.4286 152.875 34.6734 152.875 36.2143C152.875 37.7551 151.618 39 150.062 39H144.438C139.779 39 136 35.2567 136 30.6429V8.35714C136 3.7433 139.779 0 144.438 0H150.062C151.618 0 152.875 1.24487 152.875 2.78571C152.875 4.32656 151.618 5.57143 150.062 5.57143Z"
              fill="#00CC99"
            />
            <path
              d="M7.04 8.856V27.224H15.808L15.296 31H2.336V8.856H7.04ZM24.8448 13.528C27.3834 13.528 29.3674 14.328 30.7968 15.928C32.2261 17.5067 32.9408 19.704 32.9408 22.52C32.9408 24.312 32.6101 25.8907 31.9488 27.256C31.3088 28.6 30.3701 29.6453 29.1328 30.392C27.9168 31.1387 26.4768 31.512 24.8128 31.512C22.2741 31.512 20.2794 30.7227 18.8288 29.144C17.3994 27.544 16.6848 25.336 16.6848 22.52C16.6848 20.728 17.0048 19.16 17.6448 17.816C18.3061 16.4507 19.2448 15.3947 20.4608 14.648C21.6981 13.9013 23.1594 13.528 24.8448 13.528ZM24.8448 16.92C23.6928 16.92 22.8288 17.3787 22.2528 18.296C21.6981 19.192 21.4208 20.6 21.4208 22.52C21.4208 24.44 21.6981 25.8587 22.2528 26.776C22.8288 27.672 23.6821 28.12 24.8128 28.12C25.9434 28.12 26.7861 27.672 27.3408 26.776C27.9168 25.8587 28.2048 24.44 28.2048 22.52C28.2048 20.6 27.9274 19.192 27.3728 18.296C26.8181 17.3787 25.9754 16.92 24.8448 16.92ZM51.5643 14.968C50.4549 15.3947 48.8229 15.608 46.6683 15.608C47.7349 16.0773 48.5243 16.664 49.0363 17.368C49.5483 18.0507 49.8043 18.9147 49.8043 19.96C49.8043 21.048 49.5163 22.0293 48.9403 22.904C48.3856 23.7573 47.5749 24.4293 46.5083 24.92C45.4629 25.4107 44.2363 25.656 42.8283 25.656C42.0816 25.656 41.4203 25.5813 40.8443 25.432C40.4176 25.7093 40.2043 26.0827 40.2043 26.552C40.2043 26.8933 40.3323 27.1707 40.5883 27.384C40.8656 27.576 41.3883 27.672 42.1562 27.672H44.7483C46.0069 27.672 47.1056 27.8853 48.0443 28.312C49.0043 28.7173 49.7403 29.2933 50.2523 30.04C50.7856 30.7653 51.0522 31.5973 51.0522 32.536C51.0522 34.264 50.3056 35.608 48.8123 36.568C47.3403 37.5493 45.2069 38.04 42.4123 38.04C40.4069 38.04 38.8176 37.8267 37.6443 37.4C36.4923 36.9947 35.6816 36.3973 35.2122 35.608C34.7429 34.8187 34.5083 33.8267 34.5083 32.632H38.5723C38.5723 33.1867 38.6789 33.624 38.8923 33.944C39.1056 34.2853 39.4896 34.5307 40.0443 34.68C40.6203 34.8507 41.4416 34.936 42.5083 34.936C43.9803 34.936 45.0043 34.7547 45.5803 34.392C46.1776 34.0293 46.4763 33.5173 46.4763 32.856C46.4763 32.2587 46.2523 31.8 45.8043 31.48C45.3563 31.16 44.6949 31 43.8203 31H41.3243C39.6389 31 38.3803 30.6907 37.5483 30.072C36.7163 29.432 36.3003 28.632 36.3003 27.672C36.3003 27.0747 36.4709 26.4987 36.8123 25.944C37.1749 25.368 37.6656 24.888 38.2843 24.504C37.2389 23.928 36.4709 23.256 35.9803 22.488C35.5109 21.6987 35.2763 20.76 35.2763 19.672C35.2763 18.4347 35.5749 17.3573 36.1723 16.44C36.7909 15.5013 37.6443 14.7867 38.7323 14.296C39.8416 13.784 41.1003 13.528 42.5083 13.528C44.2576 13.5707 45.6976 13.4213 46.8283 13.08C47.9589 12.7387 49.1643 12.2053 50.4443 11.48L51.5643 14.968ZM42.6042 16.568C41.7509 16.568 41.0683 16.8453 40.5563 17.4C40.0656 17.9333 39.8203 18.6693 39.8203 19.608C39.8203 20.568 40.0656 21.3253 40.5563 21.88C41.0683 22.4347 41.7616 22.712 42.6363 22.712C43.5536 22.712 44.2469 22.4453 44.7163 21.912C45.1856 21.3787 45.4203 20.5893 45.4203 19.544C45.4203 17.56 44.4816 16.568 42.6042 16.568ZM70.447 8.344C72.4737 8.344 74.223 8.80267 75.695 9.72C77.167 10.616 78.2977 11.928 79.087 13.656C79.8763 15.384 80.271 17.4747 80.271 19.928C80.271 22.3387 79.8763 24.4187 79.087 26.168C78.2977 27.896 77.167 29.2187 75.695 30.136C74.223 31.0533 72.4737 31.512 70.447 31.512C68.4203 31.512 66.6603 31.064 65.167 30.168C63.695 29.2507 62.5643 27.928 61.775 26.2C60.9857 24.4507 60.591 22.36 60.591 19.928C60.591 17.5387 60.9857 15.48 61.775 13.752C62.5857 12.0027 63.727 10.6693 65.199 9.752C66.6923 8.81333 68.4417 8.344 70.447 8.344ZM70.447 11.864C68.8257 11.864 67.599 12.504 66.767 13.784C65.9563 15.064 65.551 17.112 65.551 19.928C65.551 22.744 65.967 24.792 66.799 26.072C67.631 27.352 68.847 27.992 70.447 27.992C72.0683 27.992 73.2843 27.3627 74.095 26.104C74.9057 24.824 75.311 22.7653 75.311 19.928C75.311 17.0907 74.9057 15.0427 74.095 13.784C73.2843 12.504 72.0683 11.864 70.447 11.864ZM97.628 31H93.692L93.468 28.728C92.8707 29.6667 92.1453 30.3707 91.292 30.84C90.4387 31.288 89.4467 31.512 88.316 31.512C86.78 31.512 85.6067 31.0533 84.796 30.136C83.9853 29.1973 83.58 27.896 83.58 26.232V14.04H88.124V25.656C88.124 26.552 88.2733 27.192 88.572 27.576C88.8707 27.9387 89.34 28.12 89.98 28.12C91.196 28.12 92.2307 27.384 93.084 25.912V14.04H97.628V31ZM112.259 30.2C111.64 30.6267 110.936 30.9467 110.147 31.16C109.379 31.3947 108.611 31.512 107.843 31.512C106.094 31.4907 104.771 30.9893 103.875 30.008C102.979 29.0267 102.531 27.5867 102.531 25.688V17.24H100.003V14.04H102.531V10.328L107.075 9.784V14.04H110.979L110.531 17.24H107.075V25.592C107.075 26.4027 107.214 26.9893 107.491 27.352C107.768 27.7147 108.195 27.896 108.771 27.896C109.347 27.896 109.987 27.704 110.691 27.32L112.259 30.2Z"
              fill="#f0fdf4"
            />
          </svg>
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
            className="flex justify-center lg:block  "
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
                <NavLink activeclassname="active"  to="/">
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
