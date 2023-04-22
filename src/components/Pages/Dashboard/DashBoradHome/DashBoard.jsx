import React from "react";
import NewPatientTable from "../NewPatientTable/NewPatientTable";
import { FaAccessibleIcon, FaBed, FaUserMd } from "react-icons/fa";
import DashboardCard from "./DashboardCard";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DashBoard = () => {
  const cards = [
    {
      title: "Patients",
      icon: <FaAccessibleIcon className="text-6xl text-tahiti-grey" />,
    },
    {
      title: "Doctors",
      icon: <FaUserMd className="text-6xl text-tahiti-grey" />,
    },
    {
      title: "Beds",
      icon: <FaBed className="text-6xl text-tahiti-grey" />,
    },
    {
      title: "New Patient",
      icon: <FaAccessibleIcon className="text-6xl text-tahiti-grey" />,
    },
    {
      title: "Available Doctors",
      icon: <FaUserMd className="text-6xl text-tahiti-grey" />,
    },
    {
      title: "Available Beds",
      icon: <FaBed className="text-6xl text-tahiti-grey" />,
    },
  ];

  const tileClassName = ({ date, view }) => {
    // Add the class "today" to the tile that represents today's date
    if (view === "month" && date.getDate() === new Date().getDate()) {
      return "today";
    }
  };

  return (
    <div className="p-10">
      <div className="grid gap-y-10 gap-x-20 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        {cards.map((card) => (
          <DashboardCard data={card}></DashboardCard>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-3 gap-x-20">
        <Calendar className="rounded-lg" tileClassName={tileClassName} />
        <NewPatientTable></NewPatientTable>
      </div>
    </div>
  );
};

export default DashBoard;
