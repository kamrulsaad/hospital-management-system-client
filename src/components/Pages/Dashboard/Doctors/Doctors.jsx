import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner'


const Doctors = () => {

const [loading,setLoading] =useState(null);
   const [doctors, setDoctors] = useState([]);
    console.log(doctors);
  
    useEffect(() => {
      setLoading(true);
      fetch("https://hms.uniech.com/api/v1/user/all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setDoctors(data?.data);
        });
    }, []);
    if (loading)return<Spinner></Spinner>




    if (doctors.length === 0)
    return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Doctor Found</h2>;


    return (
        <div className='lg:ml-20 '>
            <h1 className='text-5xl font-bold mt-20 '>Doctor</h1>
            <Link to="/dashboard/signup"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-darkGreen text-tahiti-white'>Add New</button></Link>
            <button className='lg:ml-5 lg:mb-5 lg:mt-5 font-semibold p-1 rounded-sm btn-ghost bg-tahiti-babyPink text-tahiti-black'>All Doctor</button>
            <div className="overflow-x-auto pr-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.map((doctor, i) => <tr key={ doctor._id}>
                                <th>{i + 1}</th>
                                {/* <td>{ doctor?._id}</td> */}
                                <td>{ doctor?.firstName}</td>
                                <td>{ doctor?.lastName}</td>
                                <td>{ doctor?.email}</td>
                                {/* <td>{ doctor?.phone}</td> */}
                                <td><button className='btn btn-xs bg-tahiti-darkGreen'>Details</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default Doctors;



