import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
// import { useQuery } from 'react-query';
import Spinner from "../../../Shared/Spinner";
import PatientsRow from "./PatientsRow";

const AllPatients = () => {
  const [loading, setLoading] = useState(null);
  const [patients, setPatients] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [user, role] = useUserData();

  // pagination
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(count / size);

  const increasePageNumber = () => {
    if (pageNumber < pages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const decreasePageNumber = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(1);
    }
  };

  // All Patient fetch data  ?page=1&limit=10
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:5000/api/v1/patient/all-patient?page=${pageNumber}&limit=${size}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCount(data.total);
        setPatients(data?.data);
      });
  }, [pageNumber, size, refetch]);

  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  else if (count === 0)
    return (
      <>
        <h2 className="text-tahiti-red text-center mt-60 text-3xl ">
          No Patient Found
        </h2>
        <Link to="/addapatient">
          <button className=" lg:my-5 font-semibold p-1 rounded-md btn-ghost block mx-auto bg-tahiti-darkGreen text-tahiti-white">
            Add New
          </button>
        </Link>
      </>
    );

  return (
    <div className="lg:ml-20 ">
      <h1 className="text-5xl font-bold mt-20 mb-4">Patients</h1>
      {!role?.includes("accountant") && (
        <>
          <Link to="/addapatient">
            <button className=" lg:mb-5 font-semibold px-2 py-1 rounded-md btn-ghost bg-tahiti-darkGreen text-tahiti-white">
              Add New
            </button>
          </Link>
        </>
      )}

      <div className="overflow-x-auto pr-10">
        <table className="table w-full bg-tahiti-white">
          <thead>
            <tr>
              <th className="text-center">Sl</th>
              <th className="text-center">Patient ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Age</th>
              <th className="text-center">Phone</th>
              <th className="text-center">Details</th>
              {(role?.includes("super-admin") || role?.includes("admin")) && (
                <th className="text-center">Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, i) => (
              <PatientsRow
                key={patient._id}
                patient={patient}
                i={i}
                role={role}
                refetch={refetch}
                setRefetch={setRefetch}
              ></PatientsRow>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Button */}
      <div className="flex flex-col items-center mt-5 mb-5 text-xl">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing Page{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageNumber}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white"></span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pages}
          </span>{" "}
          Pages
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={decreasePageNumber}
            className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white rounded-l  dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white"
          >
            Prev
          </button>
          <button
            onClick={increasePageNumber}
            className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white   border-0 border-l  rounded-r dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPatients;
