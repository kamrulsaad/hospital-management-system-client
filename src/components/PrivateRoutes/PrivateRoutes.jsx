import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Shared/Spinner";

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    // if login token not available login redirect
    if (!localStorage.getItem("LoginToken")) {
      navigate('/login')
    }
    // if login token expired login redirect
    if (user.status === 'fail') {
      navigate('/login')
    }
    // const { user } = useContext(UserContext);
    // const [loading, useLoading] = useState();
    // console.log(user);
    const location = useLocation();




    console.log(user);
    // fetching userInfo from backend
    useEffect(() => {
        fetch("https://hms.uniech.com/api/v1/user/user-info", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log(err));

    }, []);


    // if (loading) {
    //     return <Spinner></Spinner>
    // }
    if (!user) {
        return <Navigate to="/login"
            state={{ from: location }}
            replace></Navigate>
    }
    return children;

};

export default PrivateRoute;
