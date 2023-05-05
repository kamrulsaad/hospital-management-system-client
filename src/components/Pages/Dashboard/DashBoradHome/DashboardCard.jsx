import React from "react";

const DashboardCard = ({ data }) => {
  return (
    <div className="shadow-lg shadow-tahiti-blue flex items-center rounded-lg">
      <div className="bg-tahiti-darkGreen p-6 rounded-lg">{data?.icon}</div>
      <div className="ml-4">
        <h1
          className={`${
            data?.title.length > 13 ? "text-2xl" : "text-3xl"
          } font-medium`}
        >
          {data?.title}
        </h1>
        <h1 className="text-5xl mt-2 text-tahiti-primary">{data?.count}</h1>
      </div>
    </div>
  );
};

export default DashboardCard;
