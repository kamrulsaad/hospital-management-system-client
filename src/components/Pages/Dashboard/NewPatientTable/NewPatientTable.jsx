import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewPatientTable = () => {
  const [loading, setLoading] = useState(null);
  const [patient, setPatients] = useState([]);

  // Using .reverse for new Patients
  const patients = patient.slice(0, 5).concat().reverse();
  // All Patient fetch data
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/v1/patient/all-patient", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPatients(data?.data);
      });
  }, []);

  // Loading functionality
  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <img src="assets/preloader.gif" alt="" />
      </div>
    );

  if (patients?.length === 0)
    return (
      <h2 className="text-tahiti-darkGreen text-center mt-60 text-5xl ">
        No Patient Found
      </h2>
    )

  return (
    <div className="col-span-2">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">New Patients</h1>
        <Link to="/addapatient">
          <button className="btn btn-xs btn-ghost bg-tahiti-mainBlue  text-tahiti-white">
            Add New
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto shadow-2xl shadow-tahiti-blue mt-2  rounded-xl">
        <table className="table w-full bg-tahiti-white ">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Patient ID</th>
              <th>Name</th>
              {/* <th>Last Name</th> */}
              <th>Phone</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((patient, i) => (
              <tr key={patient?._id}>
                <th>{i + 1}</th>
                <td>{patient?.serialId}</td>
                <td>{patient?.name}</td>
                {/* <td>{ patient?.lastName}</td> */}
                {/* <td>{ patient?.email}</td> */}
                <td>{patient?.phone}</td>
                <td>
                  <Link to={`/patient/newpatientprofile/${patient._id}`}>
                    <button className="btn btn-xs btn-ghost bg-tahiti-lightBlue text-tahiti-cyan">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewPatientTable;
