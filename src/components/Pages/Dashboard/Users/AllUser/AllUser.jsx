import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useQuery } from 'react-query';
import Spinner from '../../../../Shared/Spinner'

const AllUser = () => {

  const [loading, setLoading] = useState(null);
  const [users, setUsers] = useState([]);
  // const [user, setUser] = useState([]);
  console.log(users);


  // All Patient fetch data
  useEffect(() => {
    setLoading(true);
    fetch("https://hms.uniech.com/api/v1/user/all-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUsers(data?.data);
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
  if (users.length === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Patient Found</h2>;

  return (
    <div className='lg:ml-20 '>
      <h1 className='text-5xl font-bold mt-20 '>Users</h1>
      <Link to="/dashboard/signup"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-darkGreen text-tahiti-white'>Add New</button></Link>
      {/* <button className='lg:ml-5 lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-babyPink text-tahiti-black'>All User</button> */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-tahiti-white">
          <thead>
            <tr>
              <th></th>
              <th>User ID</th>
              <th>Name</th>
              {/* <th>Last Name</th> */}
              <th>Role</th>
              <th>Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {
              users.map((user, i) =>
                <tr key={user?._id}>
                  <th>{i + 1}</th>
                  <td>{user?._id}</td>
                  <td>{user?.firstName}</td>
                  {/* <td>{ user?.lastName}</td> */}
                  {/* <td>{ user?.email}</td> */}
                  <td>{user?.role}</td>
                  <td><button className='btn btn-xs btn-ghost bg-tahiti-darkGreen text-tahiti-white '>Details</button></td>
                  {/* onClick={() => handleDeleteUser(user._id)} */}
                  <td>
                    {/* { user?.role !== 'admin' &&  */}
                    <button className='btn btn-xs bg-tahiti-red btn-ghost text-tahiti-white '>Delete</button>
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

export default AllUser;