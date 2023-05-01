import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("LoginToken");
    navigate("/user/login");
  };

  return (
    <div className="flex sticky top-0 justify-between items-center bg-tahiti-darkGreen px-6 py-4 z-50">
      <Link to="/">
        <h1 className="text-3xl font-bold">
          <span className="text-tahiti-lightGreen">UNIECH </span>
          <span className="text-tahiti-white">HMS</span>
        </h1>
      </Link>
      <button onClick={handleLogOut}>
        <div className="flex items-center gap-4">
          <p className="text-tahiti-white  text-3xl font-bold">Log Out</p>
          <FiLogOut className="text-tahiti-primary text-3xl"></FiLogOut>
        </div>
      </button>
    </div>
  );
};

export default Navbar;
