import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PatientProfile = () => {
    const [newPatient, setNewPatient] = useState({});
    console.log(newPatient);
    const [loading, setLoading] = useState({});
    const { id } = useParams();
    // console.log(id);
    // patient api call by their id 
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const response = await fetch(`https://hms.uniech.com/api/v1/patient/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
                }
            })
            const data = await response.json();
            setNewPatient(data);
            setLoading(false);
        };
        fetchUserData();
    }, []);


    return (
        <div className=''>
            <div className="p-16 ">
                <div className="p-8 bg-white mt-24 shadow-xl bg-tahiti-white ">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">

                        </div>
                        <div className="relative mb-10">
                            <div className="w-48 h-48 bg-indigo-100 bg-tahiti-white   mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 " viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">

                        </div>
                    </div>

                    <div className="mt-20 text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-700"> {newPatient?.data?.name}, <span className="font-light text-gray-500">27</span></h1>
                        <p className="mt-4 text-gray-500 text-2xl">Patient ID - {newPatient?.data?.serialId}</p>
                        <p className="mt-2 text-gray-500 text-2xl">Phone - {newPatient?.data?.phone}</p>
                    </div>

                    <div className="mt-12 grid justify-items-center">
                        <h1 className='text-center text-5xl font-semibold'>Emergency Contact</h1>
                        <h3 className='text-center text-5xl font-semibold mt-10'>{newPatient?.data?.emergency_contact?.name}</h3>
                        <h3 className='text-center text-2xl  mt-4'>Phone - {newPatient?.data?.emergency_contact?.phone}</h3>
                        <h3 className='text-center text-2xl  mt-2'>Relation - {newPatient?.data?.emergency_contact?.relation}</h3>
                        <button className="text-tahiti-white bg-tahiti-lightGreen  rounded-md py-2 px-4 w-60  font-medium mt-4" >
                        <Link to={`/appointment/${newPatient?.data?._id}`}>Add Apppointment</Link></button>
                    </div>
                  
                </div>
            </div>

        </div>
    );
};

export default PatientProfile;