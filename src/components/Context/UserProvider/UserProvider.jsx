import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // fetching userInfo from backend
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    fetch("http://hms.uniech.com/api/v1/user/user-info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data))
      .catch((err) => console.log(err));
  }, []);
  // console.log(userInfo?.data?.firstName);
  const userInfos = { userInfo }
  // console.log(userInfos);
  return (
    <div>
      <UserContext.Provider value={userInfos}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
