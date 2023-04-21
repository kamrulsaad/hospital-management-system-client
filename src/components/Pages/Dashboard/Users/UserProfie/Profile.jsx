import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Profile = ({ userInfo }) => {
  const total = userInfo?.firstName.length + userInfo?.lastName.length;

  return (
    <NavLink to="/user/profile">
      <div className="flex items-center pl-2 rounded-md space-x-4 hover:cursor-pointer hover:border-tahiti-dark hover:bg-tahiti-primary hover:text-tahiti-grey duration-200">
        {userInfo?.imageURL ? (
          <img
            src={userInfo?.imageURL}
            className="rounded-full w-10 h-10 object-cover border border-tahiti-green"
            alt=""
          />
        ) : (
          <FaUserAlt className="text-tahiti-white text-3xl" />
        )}

        <div>
          <h1 className="text-lg font-semibold text-tahiti-white">
            {userInfo?.firstName} {total < 16 && userInfo?.lastName}
          </h1>
          <h4 className="font-light text-tahiti-white capitalize">
            {userInfo?.role}
          </h4>
        </div>
      </div>
    </NavLink>
  );
};

export default Profile;
