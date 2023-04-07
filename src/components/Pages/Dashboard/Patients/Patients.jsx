import React, { useEffect, useState } from 'react';
import Spinner from '../../../Shared/Spinner';

const Patients = () => {
    const [loading, setLoading] = useState(null);
    // const [patients, setPatients] = useState([]);
    const [count, setCount] = useState(0);
    console.log(count);

    // All Patient fetch data  ?page=1&limit=10
    useEffect(() => {
        setLoading(true);
        fetch(`https://hms-server.onrender.com/api/v1/patient/all-patient`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                console.log(data);
                setCount(data.total);
                // setPatients(data?.data);
            });
    }, []);
    // if (loading) return <Spinner></Spinner>;
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl shadow-tahiti-blue xl:w-80 lg:w-80 md:w-80 ">
                <figure className='p-5 bg-tahiti-darkGreen shadow-xl rounded-2xl '>
                    <svg width="64" height="64" viewBox="0 0 39 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.25 0C1.45573 0 0 1.42773 0 3.1875V17H9.75C10.3458 17 10.8333 17.4781 10.8333 18.0625C10.8333 18.6469 10.3458 19.125 9.75 19.125H0V23.375H9.75C10.3458 23.375 10.8333 23.8531 10.8333 24.4375C10.8333 25.0219 10.3458 25.5 9.75 25.5H0V30.8125C0 32.5723 1.45573 34 3.25 34H18.0036C17.5771 33.3227 17.3333 32.5258 17.3333 31.6691C17.3333 28.5547 19.0802 25.8387 21.6667 24.4176V18.0492V3.1875C21.6667 1.42773 20.2109 0 18.4167 0H3.25ZM10.2917 4.25H11.375C11.9708 4.25 12.4583 4.72812 12.4583 5.3125V6.90625H14.0833C14.6792 6.90625 15.1667 7.38437 15.1667 7.96875V9.03125C15.1667 9.61563 14.6792 10.0938 14.0833 10.0938H12.4583V11.6875C12.4583 12.2719 11.9708 12.75 11.375 12.75H10.2917C9.69583 12.75 9.20833 12.2719 9.20833 11.6875V10.0938H7.58333C6.9875 10.0938 6.5 9.61563 6.5 9.03125V7.96875C6.5 7.38437 6.9875 6.90625 7.58333 6.90625H9.20833V5.3125C9.20833 4.72812 9.69583 4.25 10.2917 4.25ZM34.6667 18.0625C34.6667 16.6535 34.096 15.3023 33.0802 14.306C32.0643 13.3097 30.6866 12.75 29.25 12.75C27.8134 12.75 26.4357 13.3097 25.4198 14.306C24.404 15.3023 23.8333 16.6535 23.8333 18.0625C23.8333 19.4715 24.404 20.8227 25.4198 21.819C26.4357 22.8153 27.8134 23.375 29.25 23.375C30.6866 23.375 32.0643 22.8153 33.0802 21.819C34.096 20.8227 34.6667 19.4715 34.6667 18.0625ZM19.5 31.6824C19.5 32.9641 20.5563 34 21.863 34H36.637C37.9437 34 39 32.9641 39 31.6824C39 28.2691 36.1766 25.5 32.6964 25.5H25.8036C22.3234 25.5 19.5 28.2691 19.5 31.6824Z" fill="white" />
                    </svg>

                </figure>
                <div className="card-body">
                    <div className=''>

                        <div className='text-3xl font-semibold'>Patients</div>
                    </div>
                    <h1 className='text-5xl text-tahiti-lightGreen'>{count}</h1>
                </div>
            </div>




        </div>
    );
};

export default Patients;