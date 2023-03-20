import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query';
import Spinner from '../../../Shared/Spinner'

const AllPatients = () => {

  const [loading, setLoading] = useState(null);
  const [patients, setPatients] = useState([]);
  // const [patient, setPatient] = useState([]);
  // console.log(patients);

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
        console.log(data);
        setPatients(data?.data);
      });
  }, []);

  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  if (patients.length === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Patient Found</h2>;

  return (
    <div className='lg:ml-20 '>
      <h1 className='text-5xl font-bold mt-20 '>Patients</h1>
      <Link to="/dashboard/addapatient"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-darkGreen text-tahiti-white'>Add New</button></Link>
      <button className='lg:ml-5 lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-babyPink text-tahiti-black'>All Patients</button>
      <div className="overflow-x-auto pr-10">
        <table className="table w-full bg-tahiti-white">
          <thead>
            <tr>
              <th className='border border-tahiti-lightGreen'>Index</th>
              <th className='border border-tahiti-lightGreen'>Patient ID</th>
              <th className='border border-tahiti-lightGreen'>Name</th>
              <th className='border border-tahiti-lightGreen'>Phone</th>
              <th className='border border-tahiti-lightGreen'>Details</th>
            </tr>
          </thead>
          <tbody>

            {
              patients.map((patient, i) =>
                <tr key={patient?._id}>
                  <th className='border border-tahiti-lightGreen'>{i + 1}</th>
                  <td className='border border-tahiti-lightGreen'>{patient?._id}</td>
                  <td className='border border-tahiti-lightGreen'>{patient?.name}</td>
                  <td className='border border-tahiti-lightGreen'>{patient?.phone}</td>
                  <td className='border border-tahiti-lightGreen'><button className='btn btn-xs'>Details</button></td>
                </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPatients;