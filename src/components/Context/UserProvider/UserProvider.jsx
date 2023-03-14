import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

const UserProvider = ({ children }) => {


  // For Private route Loading
  // const [loading, setLoading] = useState(true);



  // fetching userInfo from backend

  const [user, setUser] = useState({});

  // fetching user from backend
  useEffect(() => {
    fetch("https://hms.uniech.com/api/v1/user/user-info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
    // setLoading(true);
  }, []);


  // // LogOut
  const logOut = () => {
    // setLoading(true);
    // setuser(null);
    localStorage.clear();
    return;
  }

  const users = { logOut, user }
  return (
    <div>
      <UserContext.Provider value={users}>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default UserProvider;
