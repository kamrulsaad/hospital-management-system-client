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
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const phone = form.phone.value;
        const role = form.role.value;
        const email = form.email.value;
        const password = form.password.value;
        const signUpData = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            role: role,
            email: email,
            password: password,
        };
        console.log(signUpData);



        // login send to backend 
        fetch('https://hms.uniech.com/api/v1/user/signup', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(signUpData)
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
        <div className=''>
            <h1 className='bg-tahiti-white text-tahiti-lightGreen font-bold text-center xl:pt-5 text-5xl'>Appointment</h1>
            <div className='bg-tahiti-white grid grid-cols-2'>
                <div className=''>
                    <div className=''>
                       Patient Name :<input type="text" placeholder="Type here" className="input w-full max-w-xl rounded-none border-2 border-tahiti-dark " />
                    </div>
                    <div>
                       Symptoms :  <textarea className="textarea rounded-none w-full lg:mt-10 textarea-lg h-48 max-w-xl border-2 border-tahiti-dark" placeholder=""></textarea>
                    </div>
                    <div>
                       Diagnosis <textarea className="textarea rounded-none w-full lg:mt-5 textarea-lg h-48 max-w-xl border-2 border-tahiti-dark" placeholder=""></textarea>
                    </div>
                    <button className="btn btn-outline btn-wide  rounded-full">Button</button>
                </div>
                <div>
                    <div className='grid justify-items-center'>
                    <p className='text-center text-2xl font-semibold '>Select Date</p>
                        <div className='lg:mt-20 bg-tahiti-white xl:w-80 rounded-xl shadow-2xl mb-10'>
                   
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
        </div>
    );
};

export default Appointment;