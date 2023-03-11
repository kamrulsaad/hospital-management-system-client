import React, { useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import { toast } from 'react-toastify';

const handleSubmit = event => {
    // const [error, setError] = useState();

    // Getting Form-Data 
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const emergencyContactName = form.emergencyContactName.value;
    const emergencyContactPhone = form.emergencyContactPhone.value;
    const relation = form.relation.value;

    const patientData = {
        name: name,
        phone: phone,
        emergency_contact: {
            name: emergencyContactName,
            phone: emergencyContactPhone,
            relation: relation,
        },
    }

    console.log(patientData);



    // login send to backend 
    fetch('http://hms.uniech.com/api/v1/patient/add-new-patient', {
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
            toast.success(`Patient Added Successful`);
            form.reset();

        })
        .catch(error => {
            console.error(error)
            setError(error.message);
        });

}




const AddAPatient = () => {
    return (
        <div>
            <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold pb-20"><span className='text-tahiti-primary'>UNIECH</span><span className='text-tahiti-dark'> HMS</span> </h1>
                    <p className="  text-xl font-semibold"> <span className='text-tahiti-dark'>Register A New </span> <span className='text-tahiti-primary'>Patient</span> </p>
                </div>
                <form onSubmit={handleSubmit} novalidate="" action="" className="container flex flex-col   mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="name" className="text-sm">Name</label>
                                <input id="name" type="name" placeholder="Name" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="phone" className="text-sm">Phone</label>
                                <input id="phone" type="phone" placeholder="Phone" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:outline-none" />
                            </div>
                            <div className="mb-8 col-span-full sm:col-span-4 ">
                                <p className="text-3xl font-bold mt-20"> <span className='text-tahiti-dark'>Emergency </span> <span className='text-tahiti-primary'>Contact</span> </p>
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label for="emergencyContactName" className="text-sm">Name</label>
                                <input id="emergencyContactName" type="emergencyContactName" placeholder="Name" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="emergencyContactPhone" className="text-sm">Phone</label>
                                <input id="emergencyContactPhone" type="emergencyContactPhone" placeholder="Phone" className="w-full rounded-md  focus:outline-none" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="relation" className="text-sm">Relation</label>
                                <input id="relation" type="relation" placeholder="Relation" className="w-full rounded-md  focus:outline-none" />
                            </div>

                            <div>
                                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-tahiti-primary text-tahiti-white ">Register</button>
                            </div>




                        </div>
                    </fieldset>

                </form>
            </section>
        </div>
    );
};

export default AddAPatient;