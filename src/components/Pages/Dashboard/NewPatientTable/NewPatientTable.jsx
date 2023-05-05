import React from "react";
import { Link } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";

const NewPatientTable = ({ newPatients }) => {
  const { role } = useUserData();

  if (newPatients?.length === 0)
    return (
      <div className="col-span-2">
        <h2 className="text-tahiti-darkGreen  mt-10 text-center text-2xl ">
          No New Patients in last 7 days
        </h2>
        {(role === "admin" ||
          role === "receptionist" ||
          role === "super-admin") && (
          <Link to="/addapatient">
            <button className="btn btn-xs btn-ghost bg-tahiti-mainBlue block mx-auto mt-2 text-tahiti-white">
              Add New
            </button>
          </Link>
        )}
      </div>
    );

  return (
    <div className="col-span-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">New Patients</h1>
        {(role === "admin" ||
          role === "receptionist" ||
          role === "super-admin") && (
          <Link to="/addapatient">
            <button className="btn btn-xs btn-ghost bg-tahiti-mainBlue  text-tahiti-white">
              Add New
            </button>
          </Link>
        )}
      </div>
      <div className="overflow-x-auto shadow-2xl shadow-tahiti-blue mt-2  rounded-xl">
        <table className="table w-full bg-tahiti-white text-sm">
          <thead>
            <tr>
              <th className="p-2 pl-4">Sl</th>
              <th className="p-2">Patient ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Created</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {newPatients?.map((patient, i) => {
              const date = new Date(patient?.createdAt);
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const formattedDate = `${day}/${month}/${year}`;

              return (
                <tr key={patient?._id}>
                  <th className="p-2 pl-4">{i + 1}</th>
                  <td className="p-2">{patient?.serialId}</td>
                  <td className="p-2">{patient?.name}</td>
                  <td className="p-2">{formattedDate}</td>
                  <td className="p-2">{patient?.phone}</td>
                  <td className="p-2">
                    <Link to={`/patient/newpatientprofile/${patient._id}`}>
                      <button className="btn btn-xs btn-ghost bg-tahiti-lightBlue text-tahiti-cyan">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewPatientTable;
