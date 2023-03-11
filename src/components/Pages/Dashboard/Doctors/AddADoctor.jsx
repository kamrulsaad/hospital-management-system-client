import React, { useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';

const handleSubmit = event => {
    const [error, setError] = useState();
    // Redirect to current path
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

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
    fetch('http://hms.uniech.com/api/v1/user/signup', {
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
            navigate(from, { replace: true });
            form.reset();

        })
        .catch(error => {
            console.error(error)
            setError(error.message);
        });

}




const AddADoctor = () => {
    return (
        <div>
            <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold pb-20"><span className='text-tahiti-primary'>UNIECH</span><span className='text-tahiti-dark'> HMS</span> </h1>
                    <p className="  text-xl font-semibold"> <span className='text-tahiti-dark'>Register A New </span> <span className='text-tahiti-primary'>User</span> </p>
                </div>
                <form onSubmit={handleSubmit} novalidate="" action="" className="container flex flex-col   mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="firstname" className="text-sm">Name</label>
                                <input id="firstname" type="text" placeholder="First name" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastname" className="text-sm">Phone</label>
                                <input id="lastname" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:outline-none" />
                            </div>

                            <div className="mb-8 text-center">
                                <h1 className="my-3 text-4xl font-bold pb-20"><span className='text-tahiti-primary'>UNIECH</span><span className='text-tahiti-dark'> HMS</span> </h1>
                                <p className="  text-xl font-semibold"> <span className='text-tahiti-dark'>Register A New </span> <span className='text-tahiti-primary'>User</span> </p>
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label for="email" className="text-sm">Email</label>
                                <input id="email" type="email" placeholder="Email" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="password" className="text-sm">Password</label>
                                <input id="password" type="password" placeholder="password" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="phone" className="text-sm">Phone</label>
                                <input id="phone" type="phone" placeholder="phone" className="w-full rounded-md  focus:outline-none" />
                            </div>

                            <select type="role" name="role" id="role" className="select bg-tahiti-primary font-bold w-full text-tahiti-white">
                                <option disabled selected>Choose Role</option>
                                <option className='font-bold ' >admin</option>
                                <option className='font-bold ' >doctor</option>
                                <option className='font-bold ' >receptionist</option>
                            </select>

                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-tahiti-primary text-tahiti-white    ">Sign Up</button>
                                </div>

                            </div>


                        </div>
                    </fieldset>

                </form>
            </section>
        </div>
    );
};

export default AddADoctor;