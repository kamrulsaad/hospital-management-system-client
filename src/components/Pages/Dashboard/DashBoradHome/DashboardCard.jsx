import React, { useEffect, useState } from "react";
import Spinner from "../../../Shared/Spinner";
import { FaAccessibleIcon } from "react-icons/fa";

const DashboardCard = ({data}) => {
  const [loading, setLoading] = useState(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/patient/all-patient`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCount(data.total);
      });
  }, []);
  // if (loading) return <Spinner></Spinner>;
  return (
    <div className="shadow-lg shadow-tahiti-blue flex items-center rounded-lg">
      <div className="bg-tahiti-darkGreen p-6 rounded-lg">
        {
            data?.icon
        }
      </div>
      <div className="ml-4">
        <h1 className={`${data?.title.length > 13 ? "text-2xl" : "text-3xl"} font-medium`}>{data?.title}</h1>
        <h1 className="text-5xl mt-2 text-tahiti-primary">{count}</h1>
      </div>
    </div>
  );
};

export default DashboardCard;
