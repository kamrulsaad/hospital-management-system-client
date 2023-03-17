import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Shared/Spinner";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  if (!localStorage.getItem("LoginToken")) {
    navigate("/login");
  }
  const [loading, setLoading] = useState(null);
  const location = useLocation();

  const [user, setUser] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch("https://hms.uniech.com/api/v1/user/user-info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") navigate("/login");
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner></Spinner>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
