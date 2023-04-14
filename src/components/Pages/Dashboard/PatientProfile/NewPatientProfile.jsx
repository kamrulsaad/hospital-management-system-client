import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PatientReports from "./PatientReports";
import PatientPresciption from "./PatientPresciption";
import Spinner from "../../../Shared/Spinner";
import QRCode from "react-qr-code";

const NewPatientProfile = () => {
  const [newPatient, setNewPatient] = useState({});
  const [loading, setLoading] = useState({});
    // `${window.location.host}/qr/newpatientprofile/${newPatient?.data?._id}`
  const { id } = useParams();
  
  // patient api call by their id
  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      const response = await fetch(
        `https://hms-server.onrender.com/api/v1/patient/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
        }
      );
      const data = await response.json();
      setNewPatient(data);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) return <Spinner bg></Spinner>;

  return (
    <div className="bg-tahiti-darkGreen xl:p-20 sm:p-10 grid justify-items-center ">
      <div className="grid xl:grid-cols-2  sm:grid-cols-1 gap-x-4 xl:gap-y-22 bg-tahiti-green rounded-2xl ">
        <div className="grid xl:grid-cols-3 sm:grid-cols-1 gap-y-2">
          <div></div>
          <h1 className="text-4xl  font-semibold xl:col-span-2 mt-14">
            <span>PATIENT</span>{" "}
            <span className="text-tahiti-lightGreen">INFORMATION</span>
          </h1>
          <div className="w-48 h-48 bg-indigo-100 bg-tahiti-white mx-auto rounded-full shadow-2xl  flex items-center justify-center text-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="col-span-2">
            <h1 className="text-4xl font-medium text-gray-700 capitalize">
              {" "}
              {newPatient?.data?.name},{" "}
              <span className="font-light text-gray-500">
                {newPatient?.data?.age}
              </span>
            </h1>
            <p className="mt-4 text-gray-500 text-2xl">
              <span className="font-bold">Patient ID</span>:{" "}
              {newPatient?.data?.serialId}
            </p>
            <p className="mt-2 text-gray-500 text-2xl">
              <span className="font-bold">Phone</span>:{" "}
              {newPatient?.data?.phone}
            </p>
            <p className="mt-2 text-gray-500 text-2xl">
              <span className="font-bold">Blood Group</span>:{" "}
              {newPatient?.data?.bloodGroup}
            </p>
            <p className="mt-2 text-gray-500 text-2xl">
              <span className="font-bold">Gender</span>:{" "}
              {newPatient?.data?.gender}
            </p>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto  xl:p-10 ">
            <PatientReports></PatientReports>
          </div>
        </div>
        <div className="grid grid-cols-3">
            <div>

            </div>
            <h1 className="text-4xl font-semibold xl:col-span-2 mt-14">
            <span>EMERGENCY</span>{" "}
            <span className="text-tahiti-lightGreen uppercase">Contact</span>
          </h1>
          <div>
            <QRCode
              className="ml-20"
              style={{ height: "auto", maxWidth: "100%", width: "50%" }}
              value={`${window.location.host}/qr/newpatientprofile/${newPatient?.data?._id}`}
            />
          </div>
          <div>
            <h3 className="text-3xl font-semibold ">
              {newPatient?.data?.emergency_contact?.name}
            </h3>
            <h3 className="text-xl  ">
              <span className="font-bold">Phone</span>:{" "}
              {newPatient?.data?.emergency_contact?.phone}
            </h3>
            <h3 className="text-xl ">
              <span className="font-bold">Relation</span>:{" "}
              {newPatient?.data?.emergency_contact?.relation}
            </h3>
            <button className="text-tahiti-white bg-tahiti-lightGreen  rounded-md py-2 px-4 w-60 mb-8  font-medium mt-4">
              <Link to={`/appointment/${newPatient?.data?._id}`}>
                Add Apppointment
              </Link>
            </button>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto xl:p-10">
            <PatientPresciption></PatientPresciption>
          </div>
        </div>
      </div>
      <div>
        <Link to="/">
          <button className="btn btn-ghost mt-5 bg-tahiti-primary text-tahiti-white">
            Back to dashBoard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewPatientProfile;
