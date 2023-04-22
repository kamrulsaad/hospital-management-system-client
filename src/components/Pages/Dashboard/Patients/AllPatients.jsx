import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
// import { useQuery } from 'react-query';
import Spinner from "../../../Shared/Spinner";
import PatientsRow from "./PatientsRow";
import { MdSearch } from "react-icons/md";

const AllPatients = () => {
  const [loading, setLoading] = useState(null);
  const [patients, setPatients] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const [user, role] = useUserData();
  const [name, setName] = useState([]);
  const [value, setValue] = useState([]);

  const handleSearch = event => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const name = form.name.value;
    const value = form.value.value;
    setName(name)
    setValue(value)
  };



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
      `http://localhost:5000/api/v1/patient/all-patient?page=${pageNumber}&limit=${size}&key=${name}&value=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDataCount(data?.total);
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
      <h1 className="text-5xl font-bold mt-20 mb-4">Patients : {dataCount}</h1>
      {/* Search Field */}
      <div className={`flex ${role?.includes("receptionist") ? "justify-between" : 'justify-end'} pr-10`}>
        {role?.includes("receptionist") && (
          <>
            <Link to="/addapatient">
              <button className=" lg:mb-5 font-semibold px-2 py-1 rounded-md btn-ghost bg-tahiti-darkGreen text-tahiti-white">
                Add New
              </button>
            </Link>
          </>
        )}
        <form onSubmit={handleSearch} className="flex mb-4 gap-2">

          <select
            type="text"
            name="name"
            id="name"
            className="select select-sm focus:outline-none bg-tahiti-primary font-bold  text-tahiti-white "
          >
            <option disabled selected>
              Select
            </option>
            <option value={"serialId"}>Serial ID </option>
            <option value={"name"}>Name</option>
            <option value={"phone"}>Phone</option>
            <option value={"gender"}>Gender</option>
            <option value={"bloodGroup"}>Blood Group</option>
            <option value={"age"}>Age</option>
          </select>
          <input type="text" name="value" id="value" className="input input-bordered input-info  input-sm  max-w-xs" />
          <button type="submit" className="btn btn-sm">
            <MdSearch
              className="cursor-pointer mx-auto"
            />
          </button>
        </form>
      </div>

      <div className="overflow-x-auto pr-10">
        <table className="table w-full bg-tahiti-white">
          <thead>
            <tr>
              <th className="text-center">Sl</th>
              <th className="text-center">Patient ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Age</th>
              <th className="text-center">Blood Group</th>
              <th className="text-center">Gender</th>
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
