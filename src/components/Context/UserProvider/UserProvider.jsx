import React, { createContext, useEffect, useState, } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [result, setResult] = useState([]);
    // console.log(result);
   
    useEffect(() => {
        fetch('http://hms.uniech.com/api/v1/user/user-info', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem("LoginToken")}`
            },
         
        })
            .then(res => res.json())
            .then(data => setResult(data))
    }, [])



    const userInfo = result;
    console.log(result);

    return (
        <div>
            <UserContext.Provider value={userInfo}>
                {children}
            </UserContext.Provider>
        </div>
    );
};

export default UserProvider;