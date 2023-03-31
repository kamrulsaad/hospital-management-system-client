import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const NewPatientProfile = () => {

    const [newPatient, setNewPatient] = useState({});
    console.log(newPatient);
    const [loading, setLoading] = useState({});
    const { id } = useParams();
    // console.log(id);
    // patient api call by their id 
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            const response = await fetch(`https://hms-server.onrender.com/api/v1/patient/${id}`, {
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
        <div className='bg-tahiti-darkGreen p-20 '>
            <div className='grid grid-cols-2 gap-x-4 gap-y-40 bg-tahiti-green rounded-2xl '>
                <div className='grid grid-cols-3 '>
                    <h1 className='text-center text-4xl font-semibold col-span-3 mt-8 mb-8'><span>PATIENT</span> <span className='text-tahiti-lightGreen'>INFORMATION</span></h1>
                    <div>
                        <div className="w-48 h-48 bg-indigo-100 bg-tahiti-white   mx-auto rounded-full shadow-2xl    flex items-center justify-center text-indigo-500">

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 " viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl font-medium text-gray-700"> {newPatient?.data?.name}, <span className="font-light text-gray-500">{newPatient?.data?.age}</span></h1>
                        <p className="mt-4 text-gray-500 text-2xl">Patient ID - {newPatient?.data?.serialId}</p>
                        <p className="mt-2 text-gray-500 text-2xl">Phone - {newPatient?.data?.phone}</p>
                        <p className="mt-2 text-gray-500 text-2xl">Blood Group - {newPatient?.data?.bloodGroup}</p>
                        <p className="mt-2 text-gray-500 text-2xl">Gender - {newPatient?.data?.gender}</p>

                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto ">
                        <h1 className='text-center text-4xl font-semibold mb-8 mt-8'><span>PATIENT</span> <span className='text-tahiti-lightGreen'>REPORTS</span></h1>
                        <table className="table w-full">
                            {/* head */}
                            <thead >
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                                {/* row 3 */}
                                <tr >
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='grid justify-items-center'>
                    <h1 className='text-center text-4xl font-semibold'><span>Emergency</span> <span className='text-tahiti-lightGreen'>Contact</span></h1>



                    <h3 className='text-center text-3xl font-semibold mt-10'>{newPatient?.data?.emergency_contact?.name}</h3>
                    <h3 className='text-center text-xl  mt-4'>Phone - {newPatient?.data?.emergency_contact?.phone}</h3>
                    <h3 className='text-center text-xl  mt-2'>Relation - {newPatient?.data?.emergency_contact?.relation}</h3>
                    <button className="text-tahiti-white bg-tahiti-lightGreen  rounded-md py-2 px-4 w-60 mb-4  font-medium mt-4" >
                        <Link to={`/appointment/${newPatient?.data?._id}`}>Add Apppointment</Link></button>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <h1 className='text-center text-4xl font-semibold mb-8'><span>PATIENT</span> <span className='text-tahiti-lightGreen'>PRESCRIPTIONS</span></h1>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>Quality Control Specialist</td>
                                    <td>Blue</td>
                                </tr>
                                {/* row 2 */}
                                <tr>
                                    <th>2</th>
                                    <td>Hart Hagerty</td>
                                    <td>Desktop Support Technician</td>
                                    <td>Purple</td>
                                </tr>
                                {/* row 3 */}
                                <tr>
                                    <th>3</th>
                                    <td>Brice Swyre</td>
                                    <td>Tax Accountant</td>
                                    <td>Red</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPatientProfile;