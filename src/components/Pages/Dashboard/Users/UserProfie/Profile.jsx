import React, { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

const Profile = ({ userInfo }) => {
  return (
    <div className="flex">
      <div className="flex items-center justify-center w-1/4">
        {userInfo?.imageURL ? (
          <img
            src={userInfo?.imageURL}
            className="rounded-full w-16 h-16 object-cover border border-tahiti-green"
            alt=""
          />
        ) : (
          <FaUserAlt className="text-tahiti-white text-5xl ml-2" />
        )}
      </div>
      <div>
        <h1 className="text-4xl font-semibold text-tahiti-white">
          {userInfo?.firstName} {userInfo?.lastName}
        </h1>
        <h4 className="text-xl font-thin text-tahiti-white">
          {userInfo?.role}
        </h4>
      </div>
    </div>
  );
};

export default Profile;
