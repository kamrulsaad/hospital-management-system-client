import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/UserProvider/UserProvider';
// import Spinner from '../Shared/Spinner';



const PrivateRoute = ({children}) => {
    const {user} = useContext(UserContext);
    const location = useLocation();

    // if(loading){
    //     return <Spinner></Spinner>
    // }
    if(!user){
        return <Navigate to ="/login"
         state={{from: location}}
         replace></Navigate>
    }
    return children;
};

export default PrivateRoute;