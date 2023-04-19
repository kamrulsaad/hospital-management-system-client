import React, { useEffect, useState } from "react";
import Spinner from "../../../Shared/Spinner";
import useUserData from "../../../Hooks/useUserData";
import AppointmentsRow from "./AppointmentsRow";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";

const AllApointments = () => {
  const [loading, setLoading] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [appointments, setAppointment] = useState([]);
  const [user, role] = useUserData();
  const [name, setName] = useState([]);
  const [value, setValue] = useState([]);
  const [dataCount, setDataCount] = useState(0);

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
   if(pageNumber<pages){
    setPageNumber(pageNumber + 1)
   }
  }

  const decreasePageNumber = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  };

  // All Appointment fetch data  ?page=1&limit=10
  useEffect(() => {
    setLoading(true);
    fetch(`https://hms-server.onrender.com/api/v1/appointment/all-appointments?page=${pageNumber}&limit=${size}&key=${name}&value=${value}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDataCount(data?.total);
        setLoading(false);
        setCount(data.total);
        setAppointment(data?.data);
      });
  }, [pageNumber, size, refetch]);

  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  if (appointments?.length === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Appointment Found</h2>;

  return (
    <div className='lg:ml-20 '>
      <h1 className='text-5xl font-bold mt-20 mb-4 '>Appointment : {dataCount}</h1>
      {/* <Link to="/addapatient"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-darkGreen text-tahiti-white'>Add New</button></Link> */}
      {/* Search Field */}
      <div className="flex justify-between pr-10 mb-3">


        {/* {!role?.includes("accountant") && (
          <>
            <Link to="/addapatient">
              <button className=" lg:mb-5 font-semibold px-2 py-1 rounded-md btn-ghost bg-tahiti-darkGreen text-tahiti-white">
                Add New
              </button>
            </Link>
          </>
        )} */}


        <div></div>
        <form onSubmit={handleSearch} action="" className=" flex gap-2">

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
            <option value={"phone"}>Phone</option>
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
              <th>SL</th>
              <th>Appointment ID</th>
              <th>Reason</th>
              <th className="text-center">Payment Status</th>
              <th>Patient's Phone</th>
              <th>Details</th>
              {/* {(role?.includes("super-admin") || role?.includes("admin")) && (
                <th className="text-center">Delete</th>
              )} */}
            </tr>
          </thead>
          <tbody>

            {
              appointments.map((appointment, i) =>
                <tr key={appointment?._id}>
                  <th>{i + 1}</th>
                  <td>{appointment?.serialId}</td>
                  <td>{appointment?.reason}</td>
                  <td className="text-center">{appointment?.paymentCompleted ? "Paid" : "Unpaid"}</td>
                  <td>{appointment?.patient?.phone}</td>
                  <td><button className='btn btn-xs'><Link to={`/patient/newpatientprofile/${appointment._id}`}>Details</Link></button></td>
               
                </tr>)
            }

          </tbody>
        </table>
      </div>

      {/* Pagination Button */}
      <div class="flex flex-col items-center mt-5 mb-5 text-xl">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          Showing Page <span class="font-semibold text-gray-900 dark:text-white">{pageNumber}</span><span class="font-semibold text-gray-900 dark:text-white"></span> of <span class="font-semibold text-gray-900 dark:text-white">{pages}</span> Pages
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <button onClick={decreasePageNumber} class="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white rounded-l  dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white">
            Prev
          </button>
          <button onClick={increasePageNumber} class="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white   border-0 border-l  rounded-r dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllApointments;
