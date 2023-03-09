import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {


  // For Private route Loading
  // const [loading, setLoading] = useState(true);



  // fetching userInfo from backend
  const [userInfo, setUserInfo] = useState({});
  // fetching userInfo from backend
  useEffect(() => {
    fetch("http://hms.uniech.com/api/v1/user/user-info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data))
      .catch((err) => console.log(err));
    // setLoading(true);
  }, []);


  // // LogOut
  const logOut = () => {
    // setLoading(true);
    // setUserInfo(null);
    localStorage.clear();
    return ;
  }
  
  const userInfos = {logOut,userInfo}
  return (
    <div>
      <UserContext.Provider value={userInfos}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
