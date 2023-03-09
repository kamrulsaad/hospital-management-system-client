import React, { useEffect, useState } from "react";
import Spinner from "../../../Shared/Spinner";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://hms.uniech.com/api/v1/patient/all-patient", {
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

  if (loading) return <Spinner></Spinner>;

  if (patients.length === 0)
    return <h2 className="text-tahiti-red text-center">No Result Found</h2>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10 mt-5 ">All Patients</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Patient ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 &&
              patients.map((patient, i) => (
                <tr key={patient._id}>
                  <th>{i + 1}</th>
                  <td>{patient?._id}</td>
                  <td>{patient?.firstName}</td>
                  <td>{patient?.lastName}</td>
                  <td>{patient?.email}</td>
                  <td>{patient?.phone}</td>
                  <td>
                    <button>Details</button>
                  </td>
                  {/* onClick={() => handleDeleteUser(user._id)} */}
                  <td>
                    {/* { patient?.role !== 'admin' &&  */}
                    <button className="btn btn-xs btn-danger">Delete</button>
                    {/* // } */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPatients;
