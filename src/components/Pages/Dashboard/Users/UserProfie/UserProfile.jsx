import React, { useEffect, useState } from 'react';

const UserProfile = () => {

    const [user, setUser] = useState({});
    // fetching userInfo from backend
    useEffect(() => {
        fetch("https://hms.uniech.com/api/v1/user/user-info", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.log(err));
        // setLoading(true);
    }, []);

    return (
        <div className='grid justify-items-center  '>
            {/* <div><svg width="199" height="199" viewBox="0 0 199 199" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="99.5" cy="99.5" r="99.5" fill="#D9D9D9" />
            </svg>
            </div>
            <div>
                <h1>{user?.data?.firstName} {user?.data?.lastName}</h1>
                <h3>{user?.data?.role}</h3>

                <h3>Postion : {user?.data?.role}</h3>
                <h3>Email :{user?.data?.email}</h3>
                <h3>Phone :{user?.data?.phone}</h3>

                </div> */}





            <div className="flex items-center mt-32 shadow-2xl shadow-tahiti-blue flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                <img src="https://source.unsplash.com/150x150/?portrait?3" alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y divide-gray-700">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">{user?.data?.firstName} {user?.data?.lastName}</h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user?.data?.role}</p>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user?.data?.email}</p>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-400">{user?.data?.phone}</p>
                    </div>
               
                </div>
                <button class="btn btn-xs btn-ghost text-tahiti-white bg-tahiti-cyan">Edit</button>
            </div>



            {/* <div className="max-w-md flex justify-center p-8 sm:flex sm:space-x-6 ">
                <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                    <svg width="100" height="100" viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34 38H22C9.75 38 0 47.875 0 60C0 62.25 1.75 64 4 64H52C54.125 64 56 62.25 56 60C56 47.875 46.125 38 34 38ZM6 58C7 50.125 13.75 44 22 44H34C42.125 44 48.875 50.125 49.875 58H6ZM28 32C36.75 32 44 24.875 44 16C44 7.25 36.75 0 28 0C19.125 0 12 7.25 12 16C12 24.875 19.125 32 28 32ZM28 6C33.5 6 38 10.5 38 16C38 21.625 33.5 26 28 26C22.375 26 18 21.625 18 16C18 10.5 22.375 6 28 6Z" fill="black" />
                    </svg>

                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold">{user?.data?.firstName} {user?.data?.lastName}</h2>
                        <span className="text-sm ">{user?.data?.role}</span>
                    </div>
                    <div className="space-y-1">
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                                <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                            </svg>
                            <span className="">{user?.data?.email}</span>
                        </span>
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                                <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                            </svg>
                            <span className="">{user?.data?.phone}</span>
                        </span>
                    </div>
                </div>
            </div> */}







        </div>
    );
};

export default UserProfile;