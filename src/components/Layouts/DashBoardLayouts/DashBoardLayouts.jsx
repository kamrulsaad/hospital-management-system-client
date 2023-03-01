import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DashBoardLayouts = () => {
    return (

        <div>
            {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            <div className="drawer drawer-mobile ">
                <input id="dashboardDrawer" className="drawer-toggle" />
                <div className='lg:grid grid-cols-2 '>
                    <div className="drawer-side">
                        <label htmlFor="dashboardDrawer" className="drawer-overlay"></label>
                        <ul className="menu  p-4 ">
                            <li><Link to="/dashboard">DashBoard</Link></li>
                            <li><a>Doctor</a></li>
                            <li><a>Patient</a></li>
                            <li><a>Emergency</a></li>
                        </ul>

                    </div>
                    <div className="drawer-content ">
                        <Outlet></Outlet>
                    </div>
                </div>

            </div> */}


            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li><Link to="/dashboard">DashBoard</Link></li>
                            <li><a>Doctor</a></li>
                            <li><a>Patient</a></li>
                            <li><a>Emergency</a></li>
                    </ul>

                </div>
            </div>



        </div>
    );
};

export default DashBoardLayouts;