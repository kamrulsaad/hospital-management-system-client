import React from 'react';

const Login = () => {
    return (
        <div className='bg-tahiti-green  py-48'>
            <div className="bg-tahiti-white shadow-xl mb-20 w-full max-w-md p-8 mx-auto space-y-3 rounded-xl bg-light text-gray-100">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold pb-20"><span className='text-tahiti-primary'>UNIECH</span><span className='text-tahiti-dark'> HMS</span> </h1>
                    <p className="  text-xl font-semibold"> <span className='text-tahiti-dark'>Login to you </span> <span className='text-tahiti-primary'>account</span> </p>
                </div>
                <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label for="email" className="block mb-2 text-sm text-tahiti-primary">USERNAME </label>
                            <input type="email" name="email" id="email" placeholder="your username" className="w-full pb-3 text-xs text-tahiti-primary" />
                            <hr className="w-full text-tahiti-primary"/>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label for="password" className="text-sm text-tahiti-primary">PASSWORD</label>
                               
                            </div>
                            <input type="password" name="password" id="password" placeholder="password" className="w-full pb-3 text-xs text-tahiti-primary" /> 
                            <hr className="w-full text-tahiti-primary"/>
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
    );
};

export default Login;