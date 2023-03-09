import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';

const AllPatients = () => {


    const [patients, setPatients] = useState({});
    // const url = `http://hms.uniech.com/api/v1/patient/all-patient`;

    // const { data: patients = [], refetch } = useQuery({
    //     queryKey: ['patients'],
    //     queryFn: async () => {
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         return data;
    //     }
    // })

  useEffect(() => {
    // setLoading(true);
    fetch("http://hms.uniech.com/api/v1/patient/all-patient", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setLoading(false);
        setPatients(data?.data);
      });
  }, []);

//   if (loading) return <Spinner></Spinner>;

  if (patients.length === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Patient Found</h2>;

  return (
    <div>
        <h1 className='text-5xl font-bold m-5 ml-10mt-10'>Patients</h1>
        <button className='lg:ml-5 lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-red text-tahiti-white'>Add New</button>
        <button className='lg:ml-5 lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-babyPink text-tahiti-black'>All Patients</button>
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

                {
                        // patients.map((patient, i) => <tr key={ patient._id}>
                        //     <th>{i + 1}</th>
                        //     <td>{ patient?._id}</td>
                        //     <td>{ patient?.firstName}</td>
                        //     <td>{ patient?.lastName}</td>
                        //     <td>{ patient?.email}</td>
                        //     <td>{ patient?.phone}</td>
                        //     <td><button>Details</button></td>
                        //     {/* onClick={() => handleDeleteUser(user._id)} */}
                        //     <td>
                        //         {/* { patient?.role !== 'admin' &&  */}
                        //         <button  className='btn btn-xs btn-danger'>Delete</button>
                        //         {/* // } */}
                        //         </td>
                        // </tr>)
                    }

                </tbody>
            </table>
        </div>



    </div>
  );
};

export default AllPatients;
