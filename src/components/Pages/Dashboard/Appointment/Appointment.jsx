import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Appointment = ({ newPatient }) => {
    const [error, setError] = useState("");
    console.log(newPatient);

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



        // login send to backend 
        fetch('https://hms.uniech.com/api/v1/user/signup', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(patientData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`User Added Successful`);
                form.reset();

            })
            .catch(error => {
                console.error(error)
                setError(error.message);
            });

    }

    return (
        <div className='bg-tahiti-white'>
            <h1 className=' text-tahiti-lightGreen font-bold text-center xl:pt-5 text-5xl mb-10'>Appointment</h1>
            <form onSubmit={handleSubmit} novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className=' grid grid-cols-2'>

                    <div className=''>
                        <div className=''>
                            Patient Name :<input  type="patientName" name="patientName" id="patientName" placeholder="" className="input w-full max-w-xl rounded-none border-2 border-tahiti-dark " />
                        </div>
                        <div>
                            Symptoms :  <textarea type="symptoms" name="symptoms" id="symptoms"  className="textarea rounded-none w-full lg:mt-10 textarea-lg h-48 max-w-xl border-2 border-tahiti-dark" placeholder=""></textarea>
                        </div>
                        <div>
                            Diagnosis <textarea type="diagnosis" name="diagnosis" id="diagnosis"  className="textarea  rounded-none w-full lg:mt-5 textarea-lg h-48 max-w-xl border-2 border-tahiti-dark" placeholder=""></textarea>
                        </div>
                        <button type ="submit" className="btn btn-outline btn-wide bg-tahiti-darkGreen text-tahiti-white flex mt-12 mx-auto rounded-full">Button</button>
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


            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
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
            </div>




        </div>
    );
};

export default Appointment;