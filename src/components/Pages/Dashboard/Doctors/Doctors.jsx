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
                            <th className='border border-tahiti-lightGreen'>Index</th>
                            <th className='border border-tahiti-lightGreen'>First Name</th>
                            <th className='border border-tahiti-lightGreen'>Last Name</th>
                            <th className='border border-tahiti-lightGreen'>Email</th>
                            <th className='border border-tahiti-lightGreen'>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.map((doctor, i) => <tr key={ doctor._id}>
                                <th className='border border-tahiti-lightGreen'>{i + 1}</th>
                                {/* <td>{ doctor?._id}</td> */}
                                <td className='border border-tahiti-lightGreen'>{ doctor?.firstName}</td>
                                <td className='border border-tahiti-lightGreen'>{ doctor?.lastName}</td>
                                <td className='border border-tahiti-lightGreen'>{ doctor?.email}</td>
                                {/* <td>{ doctor?.phone}</td> */}
                                <td className='border border-tahiti-lightGreen'><button className='btn btn-xs bg-tahiti-darkGreen'>Details</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default Doctors;



