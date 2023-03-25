import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query';
import Spinner from '../../../Shared/Spinner'

const AllPatients = () => {

  const [loading, setLoading] = useState(null);
  const [patients, setPatients] = useState([]);
  // console.log(patients);

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
    fetch(`http://localhost:5000/api/v1/patient/all-patient?page=${pageNumber}&limit=${size}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setCount(data.total);
        setPatients(data?.data);
      });
  }, [pageNumber, size]);

  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  if (patients.length === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Patient Found</h2>;

  return (
    <div className='lg:ml-20 '>
      <h1 className='text-5xl font-bold mt-20 '>Patients</h1>
      <Link to="/addapatient"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-darkGreen text-tahiti-white'>Add New</button></Link>
      <button className='lg:ml-5 lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-babyPink text-tahiti-black'>All Patients</button>
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
              patients.map((patient, i) =>
                <tr key={patient?._id}>
                  <th>{i + 1}</th>
                  <td>{patient?.serialId}</td>
                  <td>{patient?.name}</td>
                  {/* <td>{ patient?.lastName}</td> */}
                  {/* <td>{ patient?.email}</td> */}
                  <td>{patient?.phone}</td>
                  <td><button className='btn btn-xs'><Link to={`/patientprofile/${patient._id}`}>Details</Link></button></td>
                </tr>)
            }

          </tbody>
        </table>
      </div>


      {/* Pagination Button */}
      <div className="flex flex-col items-center mt-5 mb-5 text-xl">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing Page <span className="font-semibold text-gray-900 dark:text-white">{pageNumber}</span><span className="font-semibold text-gray-900 dark:text-white"></span> of <span className="font-semibold text-gray-900 dark:text-white">{pages}</span> Pages
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button onClick={decreasePageNumber} className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white rounded-l  dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white">
            Prev
          </button>
          <button onClick={increasePageNumber} className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white   border-0 border-l  rounded-r dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white">
            Next
          </button>
        </div>
      </div>


    </div >
  );
};

export default AllPatients;