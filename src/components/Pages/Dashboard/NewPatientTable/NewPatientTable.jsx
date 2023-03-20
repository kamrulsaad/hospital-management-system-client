import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../Shared/Spinner";

const NewPatientTable = () => {
  const [loading, setLoading] = useState(null);
  const [patient, setPatients] = useState([]);
  // Using .reverse for new Patients
  const patients = patient.slice(0, 5).concat().reverse();
  // All Patient fetch data
  useEffect(() => {
    setLoading(true);
    fetch("https://hms.uniech.com/api/v1/patient/all-patient", {
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
  if (loading) return <Spinner></Spinner>;
  if (patients?.length === 0)
    return (
      <h2 className="text-tahiti-darkGreen text-center mt-60 text-5xl ">
        No Patient Found
      </h2>
    );

  return (
    <div className="p-8">
      <div  className="flex justify-between mt-5 ">
        <h1 className="text-3xl font-bold">New Patients</h1>
        <Link to="/addapatient"><button class="btn btn-sm btn-ghost bg-tahiti-mainBlue  text-tahiti-white">Add New</button></Link>
      </div>
      <div className="overflow-x-auto shadow-2xl shadow-tahiti-blue mt-5  rounded-xl">
        <table className="table w-full bg-tahiti-white ">
          <thead>
            <tr>
              <th></th>
              <th>Patient ID</th>
              <th>Name</th>
              {/* <th>Last Name</th> */}
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((patient, i) => (
              <tr key={patient?._id}>
                <th>{i + 1}</th>
                <td>{patient?._id}</td>
                <td>{patient?.name}</td>
                {/* <td>{ patient?.lastName}</td> */}
                {/* <td>{ patient?.email}</td> */}
                <td>{patient?.phone}</td>
                <td>
                  <button className="btn btn-xs btn-ghost bg-tahiti-lightBlue text-tahiti-cyan">
                    Details
                  </button>
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
