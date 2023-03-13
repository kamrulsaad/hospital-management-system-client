import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/UserProvider/UserProvider';
// import Spinner from '../Shared/Spinner';



const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    console.log(user);
    const location = useLocation();



    // const [user, setUser] = useState();
    // console.log(user);
    // // fetching userInfo from backend
    // useEffect(() => {
    //     fetch("https://hms.uniech.com/api/v1/user/user-info", {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
    //         },
    //     })
    //         .then((res) => res.json())
    //         .then((data) => setUser(data))
    //         .catch((err) => console.log(err));

    // }, []);


    // if(loading){
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