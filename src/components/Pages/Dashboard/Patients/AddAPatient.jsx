import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
const AddAPatient = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    // js date function 
    // const currDate = new Date().toLocaleDateString();

    const handleSubmit = event => {
        // Getting Form-Data 
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const address = form.address.value;
        const age = form.number.value;
        const bloodGroup = form.bloodGroup.value;
        const gender = form.gender.value;
        const emergencyContactName = form.emergencyContactName.value;
        const emergencyContactPhone = form.emergencyContactPhone.value;
        const relation = form.relation.value;

        const patientData = {
            name: name,
            phone: phone,
            address: address,
            age: age,
            bloodGroup: bloodGroup,
            gender: gender,
            emergency_contact: {
                name: emergencyContactName,
                phone: emergencyContactPhone,
                relation: relation,
            },
        }
        console.log(patientData);
        
        // All Patient Send To Backend 
        fetch('https://hms.uniech.com/api/v1/patient/add-new-patient', {
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
                        // Swal.fire('Success', '', 'success')
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
                    <h1 className="my-3 text-4xl font-bold pb-10"><span className='text-tahiti-primary'>PATIENT</span><span className='text-tahiti-dark'> IMFORNATION</span> </h1>

                </div>
                <form onSubmit={handleSubmit} noValidate="" action="" className="container flex flex-col   mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 ">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label for="name" className="text-tahiti-lightGreen">FULL NAME</label>
                                <input id="name" type="name" placeholder="" className="w-full focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="phone" className="text-tahiti-lightGreen">Phone</label>
                                <input id="phone" type="phone" placeholder="" className="w-full  focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="address" className="text-tahiti-lightGreen">ADDRESS</label>
                                <input id="address" type="address" placeholder="" className="w-full  focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>

                            <select type="bloodGroup" name="bloodGroup" id="bloodGroup" className="select bg-tahiti-primary font-bold w-full text-tahiti-white">
                                <option disabled selected>Blood Group</option>
                                <option className='font-bold ' >O+</option>
                                <option className='font-bold ' >O-</option>
                                <option className='font-bold ' >A+</option>
                                <option className='font-bold ' >A-</option>
                                <option className='font-bold ' >B+</option>
                                <option className='font-bold ' >B-</option>
                                <option className='font-bold ' >AB+</option>
                                <option className='font-bold ' >AB-</option>
                            </select>

                            <select type="gender" name="gender" id="gender" className="select bg-tahiti-primary font-bold w-full text-tahiti-white">
                                <option disabled selected>Gender</option>
                                <option className='font-bold ' >Male</option>
                                <option className='font-bold ' >Female</option>
                                <option className='font-bold ' >Other</option>
                            </select>
                            <div className="col-span-full sm:col-span-3">
                                <label for="number" className="text-tahiti-lightGreen">Age</label>
                                <input id="number" type="number" placeholder="" className="w-full placeholder-tahiti-lightGreen focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>

                            <div className="mb-8 col-span-full flex justify-center sm:col-span-6 ">
                                <p className="text-3xl font-bold mt-20 "> <span className='text-tahiti-dark'>Emergency </span> <span className='text-tahiti-primary'>Contact</span> </p>
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label for="emergencyContactName" className="text-tahiti-lightGreen">Name</label>
                                <input id="emergencyContactName" type="emergencyContactName" placeholder="" className="w-full  focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="emergencyContactPhone" className="text-tahiti-lightGreen">Phone</label>
                                <input id="emergencyContactPhone" type="emergencyContactPhone" placeholder="" className="w-full  focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="relation" className="text-tahiti-lightGreen">Relation</label>
                                <input id="relation" type="relation" placeholder="" className="w-full  focus:outline-none" />
                                <hr className='text-tahiti-lightGreen' />
                            </div>

                            <div>
                                <button type="submit" className="w-full pt-2 pb-2 mt-20 font-semibold bg-tahiti-dark text-tahiti-white rounded-full">Add Patient</button>
                            </div>
                        </div>
                    </fieldset>

                </form>
            </section>
            {/* {
                <Appointment
                newPatient={newPatient}
                ></Appointment>
            } */}



        </div>
    );
};

export default AddAPatient;