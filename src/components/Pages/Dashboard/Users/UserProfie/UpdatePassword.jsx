import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../../../Shared/Spinner';

const UpdatePassword = () => {
    const [loading, setLoading] = useState();
    const [error, setError] = useState("");
    const handleSubmit = (event) => {
        // Getting From Data
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;
        const newPassword = form.newPassword.value;
        const confirmNewPassword = form.confirmNewPassword.value;
        if (newPassword !== confirmNewPassword) {
            setError("Password didn't match");
            return;
        }

        const vaildation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,8}$/;

        if (newPassword !== (vaildation)) {
            setError("Use Strong Password");
            return;
        }
        const UpdatePasswordData = {
            password: password,
            newPassword: newPassword,

        };
        console.log(UpdatePasswordData);
        // add invoice Category
        fetch(`https://hms-server.onrender.com/api/v1/user/update-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
            body: JSON.stringify(UpdatePasswordData),
        })
            .then((res) => res.json())
            .then((result) => {
                setLoading(false);
                console.log(result);
                if (result.status === "success") {
                    toast.success("Category Added");
                } else {
                    toast.error(result.error);
                }
                form.reset();
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    if (loading) return <Spinner></Spinner>
    return (
        <div className='m-20 p-10 bg-tahiti-white'>
            <form onSubmit={handleSubmit} novalidate="" action="" class="container flex flex-col  items-center mx-auto space-y-12 ">
                <h1 className='text-3xl font-semibold text-tahiti-primary '>Update Password</h1>
                <fieldset class="grid grid-cols-2 gap-6 p-6 rounded-md w-3/4 ">

                    <div className="col-span-full sm:col-span-3 flex gap-2 ">
                        <p for="password" className="text-xl w-1/4  font-medium">Current Password: </p>
                        <input id="password" type="text" className="w-3/4 rounded-md border p-1 " />
                    </div>
                    <div className="col-span-full sm:col-span-3 flex gap-2 ">
                        <p for="newPassword" className="text-xl  w-1/4 font-medium">New Password: </p>
                        <input id="newPassword" type="password" className="w-3/4 rounded-md border p-1 " />
                    </div>
                    <div className="col-span-full sm:col-span-3 flex gap-2 ">
                        <p for="confirmNewPassword" className="text-xl  w-1/4 font-medium">Confirm Password: </p>
                        <input id="confirmNewPassword" type="password" className="w-3/4 rounded-md border p-1 " />
                    </div>
                    <p className='text-md text-tahiti-red '>{error}</p><br />
                    <button type='submit' className='btn btn-ghost btn-md w-1/2 bg-tahiti-primary block mx-auto col-span-2'>Save</button>
                </fieldset>
            </form>
        </div>
    );

};

export default UpdatePassword;