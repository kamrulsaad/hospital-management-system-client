import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query';
import Spinner from '../../../Shared/Spinner'

const AllPatients = () => {

  const [loading, setLoading] = useState(null);
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState([]);
  console.log(patient);

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


  // const patientDetails = () => {

  //   // All Patient fetch data onClick={patientDetails(patient?._id)}
  //   useEffect(() => {
  //     setLoading(true);
  //     fetch(`https://hms.uniech.com/api/v1/patient/${_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setLoading(false);
  //         setPatient(data?.data);
  //       });
  //   }, []);
  // };



  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  if (patients.length === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Patient Found</h2>;

  return (
    <div className='lg:ml-20 '>
      <h1 className='text-5xl font-bold mt-20 '>Patients</h1>
      <Link to="/dashboard/addapatient"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-red text-tahiti-white'>Add New</button></Link>
      <button className='lg:ml-5 lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-babyPink text-tahiti-black'>All Patients</button>
      <div className="overflow-x-auto">
        <table className="table w-full bg-tahiti-white">
          <thead>
            <tr>
              <th></th>
              <th>Patient ID</th>
              <th>Name</th>
              {/* <th>Last Name</th> */}
              <th>Phone</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {
              patients.map((patient, i) =>
                <tr key={patient?._id}>
                  <th>{i + 1}</th>
                  <td>{patient?._id}</td>
                  <td>{patient?.name}</td>
                  {/* <td>{ patient?.lastName}</td> */}
                  {/* <td>{ patient?.email}</td> */}
                  <td>{patient?.phone}</td>
                  <td><button  className='btn btn-xs'>Details</button></td>
                  {/* onClick={() => handleDeleteUser(user._id)} */}
                  <td>
                    {/* { patient?.role !== 'admin' &&  */}
                    <button className='btn btn-xs bg-tahiti-red'>Delete</button>
                    {/* // } */}
                  </td>
                </tr>)
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPatients;