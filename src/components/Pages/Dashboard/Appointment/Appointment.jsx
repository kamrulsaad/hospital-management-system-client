import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useParams } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner';

const Appointment = () => {
    const [error, setError] = useState("");
    const [newPatient,setNewPatient]= useState({});
    const [loading,setLoading]= useState({});
    console.log(newPatient);
    const {id} = useParams();
    console.log(id);



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

    if (loading) return <Spinner></Spinner>;


    const handleSubmit = event => {
        // Getting From Data 
        event.preventDefault();
        const form = event.target;
        const patientName = form.patientName.value;
        const symptoms = form.symptoms.value;
        const diagnosis = form.diagnosis.value;
        const patientData = {
            patientName: patientName,
            symptoms: symptoms,
            diagnosis: diagnosis,

        };
        console.log(patientData);

    }

    return (
        <div className='bg-tahiti-white'>
            <h1 className=' text-tahiti-lightGreen font-bold text-center xl:pt-5 text-5xl mb-10'>Appointment</h1>
            <form onSubmit={handleSubmit} novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className=' grid grid-cols-2'>

                    <div className=''>
                        <div className=''>
                            Patient Name : <input type="patientName" name="patientName" id="patientName" defaultValue={newPatient.data.name} placeholder="" className="input w-full max-w-xl font-semibold text-lg rounded-none border-2 border-tahiti-dark " />
                        </div>
                        <div className='grid grid-cols-2 content-start'>
                            Symptoms :  <textarea type="symptoms" name="symptoms" id="symptoms" className="textarea rounded-none w-full lg:mt-10 textarea-lg h-48 max-w-xl border-2 border-tahiti-dark" placeholder=""></textarea>
                        </div>
                        <div className='grid grid-cols-2 content-start'>
                            Diagnosis : <textarea type="diagnosis" name="diagnosis" id="diagnosis" className="textarea  rounded-none w-full lg:mt-5 textarea-lg h-48 max-w-xl border-2 border-tahiti-dark" placeholder=""></textarea>
                        </div>
                        <button type="submit" className="btn btn-outline btn-wide bg-tahiti-darkGreen text-tahiti-white flex mt-12 mx-auto rounded-full">Button</button>
                    </div>
                    <div>
                        <div className='grid justify-items-center'>
                            <p className='text-center text-2xl font-semibold '>Select Date</p>
                            <div className='lg:mt-20  xl:w-80 rounded-xl shadow-2xl mb-10'>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar />
                                </LocalizationProvider>
                            </div>

                        </div>
                        <div >
                            <p className='text-center text-2xl mb-5 font-semibold '>Select Slot</p>
                            <div className='grid grid-cols-3'>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                                <button className="btn btn-outline mt-5 mr-5 rounded-full">Button</button>
                            </div>"
                        </div>
                    </div>
                </div>
            </form>


            {/* <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                    <p className="text-sm dark:text-gray-400">Sign in to access your account</p>
                </div>
                <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label for="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label for="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot password?</a>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="button" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Sign in</button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
                            <a rel="noopener noreferrer" href="#" className="hover:underline dark:text-violet-400">Sign up</a>.
                        </p>
                    </div>
                </form>
            </div> */}




        </div>
    );
};

export default Appointment;