import React, { createContext, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useQuery } from 'react-query';
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    // const [data, setData] = useState();

    // // login send to backend 

    // fetch('http://hms.uniech.com/api/v1/user/login', {
    //     method: 'POST',
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify(loginData)
    // })
    //     .then(res => res.json())
    //     .then(result => {

    //         console.log(result);

    //         if (result.status === "fail") {
    //             return setError(result.error)
    //         }
    //         setData(result)
    //         // toast.success(`Login Is SuccessFull`);
    //         navigate(from, { replace: true });
    //         // Navigate('/dashboard')
    //         form.reset();

    //     })
    //     .catch(error => {
    //         console.error(error)
    //         setError(error.message);
    //     });
    const userInfo = {}




    // }






    return (
        <div>
            <UserContext.Provider value={userInfo}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProvider;