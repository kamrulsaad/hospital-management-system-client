import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
    const [error, setError] = useState("");

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
                toast.success(`User Added Successful`);
                form.reset();

            })
            .catch(error => {
                console.error(error)
                setError(error.message);
            });

    }

    return (
        <div>
            {/* <div className='bg-tahiti-green  py-20'>
                <div className="bg-tahiti-white shadow-xl mb-20 w-full max-w-md p-8 mx-auto space-y-3 rounded-xl bg-light text-gray-100">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold pb-20"><span className='text-tahiti-primary'>UNIECH</span><span className='text-tahiti-dark'> HMS</span> </h1>
                        <p className="  text-xl font-semibold"> <span className='text-tahiti-dark'>Sign Up to your </span> <span className='text-tahiti-primary'>account</span> </p>
                    </div>
                    <form onSubmit={handleSubmit} novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">

                            <select type="role" name="role" id="role" className="select bg-tahiti-primary block w-full text-center text-white">
                                <option disabled selected>Choose User</option>
                                <option>admin</option>
                                <option>doctor</option>
                                <option>receptionist</option>
                            </select>


                            <div>
                                <label for="firstName" className="block mb-2 text-sm text-tahiti-primary">FIRST NAME </label>
                                <input type="firstName" name="firstName" id="firstName" placeholder="your first name" className="w-full focus:outline-none pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <label for="lastName" className="block mb-2 text-sm text-tahiti-primary">LAST NAME </label>
                                <input type="lastName" name="lastName" id="lastName" placeholder="your last name" className="w-full focus:outline-none pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm text-tahiti-primary">EMAIL</label>
                                <input type="email" name="email" id="email" placeholder="your email" className="w-full focus:outline-none pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label for="password" className="text-sm text-tahiti-primary">PASSWORD</label>

                                </div>

                                <input type="password" name="password" id="password" placeholder="password" className="w-full focus:outline-none pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm text-tahiti-primary">PHONE</label>
                                <input type="phone" name="phone" id="phone" placeholder="your phone" className="w-full pb-3 focus:outline-none text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-tahiti-primary ">Sign Up</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>



 */}













            <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold pb-20"><span className='text-tahiti-primary'>UNIECH</span><span className='text-tahiti-dark'> HMS</span> </h1>
                    <p className="  text-xl font-semibold"> <span className='text-tahiti-dark'>Register A New </span> <span className='text-tahiti-primary'>User</span> </p>
                </div>
                <form onSubmit={handleSubmit} novalidate="" action="" className="container flex flex-col   mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="firstName" className="text-sm">First name</label>
                                <input name="firstName" type="text" placeholder="First name" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="lastName" className="text-sm">Last name</label>
                                <input name="lastName" type="text" placeholder="Last name" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="email" className="text-sm">Email</label>
                                <input name="email" type="email" placeholder="Email" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="password" className="text-sm">Password</label>
                                <input name="password" type="password" placeholder="password" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="phone" className="text-sm">Phone</label>
                                <input name="phone" type="phone" placeholder="phone" className="w-full rounded-md  focus:outline-none" />
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

export default Register;