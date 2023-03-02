import React from 'react';

const Register = () => {
    return (
        <div>
            <div className='bg-tahiti-green  py-20'>
                <div className="bg-tahiti-white shadow-xl mb-20 w-full max-w-md p-8 mx-auto space-y-3 rounded-xl bg-light text-gray-100">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold pb-20"><span className='text-tahiti-primary'>UNIECH</span><span className='text-tahiti-dark'> HMS</span> </h1>
                        <p className="  text-xl font-semibold"> <span className='text-tahiti-dark'>Sign Up to your </span> <span className='text-tahiti-primary'>account</span> </p>
                    </div>
                    <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">

                            <div className="dropdown">
                             <span className=" text-xl text-tahiti-primary">Select Your Role</span>
                                <label tabIndex={0} className="btn btn-ghost ml-5 text-tahiti-dark bg-tahiti-primary">Select</label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-tahiti-green rounded-box w-52">
                                    <li><a>Admin</a></li>
                                    <li><a>Doctor</a></li>
                                    <li><a>Receptionist</a></li>
                                </ul>
                            </div>

                            <div>
                                <label for="email" className="block mb-2 text-sm text-tahiti-primary">FIRST NAME </label>
                                <input type="email" name="email" id="email" placeholder="your first name" className="w-full pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm text-tahiti-primary">LAST NAME </label>
                                <input type="email" name="email" id="email" placeholder="your last name" className="w-full pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm text-tahiti-primary">EMAIL</label>
                                <input type="email" name="email" id="email" placeholder="your email" className="w-full pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label for="password" className="text-sm text-tahiti-primary">PASSWORD</label>

                                </div>

                                <input type="password" name="password" id="password" placeholder="password" className="w-full pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm text-tahiti-primary">PHONE</label>
                                <input type="email" name="email" id="email" placeholder="your phone" className="w-full pb-3 text-xs text-tahiti-primary" />
                                <hr className="w-full text-tahiti-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-tahiti-primary ">Login</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;