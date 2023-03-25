import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
const UpdatePresciption = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // js date function 
    // const currDate = new Date().toLocaleDateString();

    const handleSubmit = event => {
        // Getting Form-Data 
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const diagnosis = form.diagnosis.value;

        const presciptionData = {
            name: name,
            diagnosis: diagnosis,
        }
        console.log(presciptionData);
        
        // All Patient Send To Backend 
        fetch('https://hms.uniech.com/api/v1/patient/add-new-patient', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
                "content-type": "application/json",
            },
            body: JSON.stringify(presciptionData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                // setNewPatient(result);
                Swal.fire({
                    title: `Add Appointment for ${name} now?`,
                    showCancelButton: true,
                    confirmButtonText: 'Book',
                })
                .then((results) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (results.isConfirmed) {
                        navigate(`/appointment/${result.data._id}`)
           
                    } 
                })
                form.reset();

            })
            .catch(error => {
                console.error(error)
                setError(error.message);
            })

    }
    return (
        <div className='lg:p-20'>
            <section className="p-6  bg-tahiti-white shadow-xl rounded-xl ">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold pb-10"><span className='text-tahiti-primary'>Update </span><span className='text-tahiti-dark'> Presciption</span> </h1>

                </div>
                <form onSubmit={handleSubmit} noValidate="" action="" className="container flex flex-col   mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 ">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="diagnosis" className="text-tahiti-lightGreen">Diagnosis</label>
                                <input id="diagnosis" type="diagnosis" placeholder="" className="w-full focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="phone" className="text-tahiti-lightGreen">Medicine Name</label>
                                <input id="phone" type="name" placeholder="" className="w-full  focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                            <select type="dosage" name="dosage" id="dosage" className="select bg-tahiti-primary font-bold w-full text-tahiti-white">
                                <option disabled selected>Dosage</option>
                                <option className='font-bold ' >0-1-0</option>
                                <option className='font-bold ' >1-1-1</option>
                                <option className='font-bold ' >0-0-1</option>
                                <option className='font-bold ' >1-0-1</option>
                                <option className='font-bold ' >1-0-0</option>
                                <option className='font-bold ' >1-1-0</option>
                                <option className='font-bold ' >0-1-1</option>
            
                            </select>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="date" className="text-tahiti-lightGreen">Follow Up</label>
                                <input id="date" type="date" placeholder="" className="w-full placeholder-tahiti-lightGreen focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="test" className="text-tahiti-lightGreen">Tests</label>
                                <input id="test" type="test" placeholder="" className="w-full placeholder-tahiti-lightGreen focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>

                            <div>
                                <button type="submit" className="w-full pt-2 pb-2 mt-20 font-semibold bg-tahiti-darkGreen text-tahiti-white rounded-full">Update Presciption</button>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </section>




        </div>
    );
};

export default UpdatePresciption;