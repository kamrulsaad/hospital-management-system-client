import React, { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../../Context/UserProvider/UserProvider';

const Profile = () => {
    // using contextAPI
    // const { userInfo } = useContext(UserContext);
    // console.log(userInfo);



    const [userInfo, setUserInfo] = useState({});
    // fetching userInfo from backend
    useEffect(() => {
        fetch("http://hms.uniech.com/api/v1/user/user-info", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUserInfo(data))
            .catch((err) => console.log(err));
        // setLoading(true);
    }, []);

    return (
        <div>
            <div className='grid grid-cols-2'>
                <div className='ml-10'>
                    <svg width="47" height="51" viewBox="0 0 56 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M34 38H22C9.75 38 0 47.875 0 60C0 62.25 1.75 64 4 64H52C54.125 64 56 62.25 56 60C56 47.875 46.125 38 34 38ZM6 58C7 50.125 13.75 44 22 44H34C42.125 44 48.875 50.125 49.875 58H6ZM28 32C36.75 32 44 24.875 44 16C44 7.25 36.75 0 28 0C19.125 0 12 7.25 12 16C12 24.875 19.125 32 28 32ZM28 6C33.5 6 38 10.5 38 16C38 21.625 33.5 26 28 26C22.375 26 18 21.625 18 16C18 10.5 22.375 6 28 6Z" fill="black" />
                    </svg>
                </div>
                <div className='-ml-8 '>
                    <h1 className='text-4xl font-semibold '>{userInfo?.data?.firstName} {userInfo?.data?.lastName}</h1>
                    <h4 className='text-xl font-thin'>{userInfo?.data?.role}</h4>
                </div>
            </div>


        </div>
    );
};

export default Profile;