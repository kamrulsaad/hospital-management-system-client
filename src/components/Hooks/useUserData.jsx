import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/v1/user/user-info', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        }
      })
      const data = await response.json();
      setUserData(data?.data);
      setUserRole(data?.data?.role);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  return [userData, userRole, loading];
};

export default useUserData;