import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query';
import Spinner from '../../../Shared/Spinner'

const MyAppointments = () => {

  const [loading, setLoading] = useState(null);
  const [appointments, setAppointments] = useState([]);
  // console.log(appointments);

  // pagination
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState(10);
  const pages = Math.ceil(count / size);
  // console.log(pages);

  const increasePageNumber = () => {
   if(pageNumber<pages){
    setPageNumber(pageNumber + 1)
    console.log(pageNumber);
   }
  }

  const decreasePageNumber = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
      console.log(pageNumber);
    }
    else {
      setPageNumber(1)
    }
  }


  // All Patient fetch data  ?page=1&limit=10
  useEffect(() => {
    setLoading(true);
    fetch(`https://hms.uniech.com/api/v1/appointment/my-appointments?page=${pageNumber}&limit=${size}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setCount(data.total);
        setAppointments(data?.data);
      });
  }, [pageNumber, size]);

  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  if (count === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Appointments Found</h2>;

  return (
    <div className='lg:ml-20 '>
      <h1 className='text-5xl font-bold mt-20 '>All Appointments</h1>
      <div className="overflow-x-auto pr-10">
        <table className="table w-full bg-tahiti-white">
          <thead>
            <tr>
              <th></th>
              <th>Patient ID</th>
              <th>Name</th>
              {/* <th>Last Name</th> */}
              <th>Phone</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>

            {
              appointments.map((appointment, i) =>
                <tr key={appointment?._id}>
                  <th>{i + 1}</th>
                  <td>{appointment?.serialId}</td>
                  <td>{appointment?.name}</td>
                  {/* <td>{ patient?.lastName}</td> */}
                  {/* <td>{ patient?.email}</td> */}
                  <td>{appointment?.phone}</td>
                  <td><button className='btn btn-xs'><Link to={`/patientprofile/${appointment._id}`}>Details</Link></button></td>
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


    </div >
  );
};

export default MyAppointments;