import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../../../Shared/Spinner';

const CreateInvoiceCategory = () => {
    const [loading, setLoading] = useState();
    const handleSubmit = (event) => {
        // Getting From Data
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const amount = form.amount.value;

        const createInvoiceCategoryData = {
            name: name,
            amount: amount,

        };
        console.log(createInvoiceCategoryData);
        // add invoice Category
        fetch(`https://hms-server.onrender.com/api/v1/category/create`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
            body: JSON.stringify(createInvoiceCategoryData),
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
            <form onSubmit={handleSubmit} novalidate="" action="" class="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                <h1 className='text-3xl font-semibold text-tahiti-primary '>Create Invoice Category</h1>
                <fieldset class="grid grid-cols-2 gap-6 p-6 rounded-md ">

                    <div className="col-span-full sm:col-span-3">
                        <label for="name" className="text-xl font-medium">Name: </label>
                        <input id="name" type="text" className="w-1/2 rounded-md border p-1 " />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label for="amount" className="text-xl font-medium">Amount: </label>
                        <input id="amount" type="number" className="w-1/2 rounded-md border p-1 " />
                    </div>
                    <button type='submit' className='btn btn-ghost btn-md w-3/4 bg-tahiti-primary'>Save</button>
                </fieldset>
            </form>
        </div>
    );

};

export default CreateInvoiceCategory;