import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner'


const Doctors = () => {

    const [loading, setLoading] = useState(null);
    const [doctors, setDoctors] = useState([]);

    // pagination
    const [count, setCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [size, setSize] = useState(10);
    const pages = Math.ceil(count / size);

    const increasePageNumber = () => {
        if (pageNumber < pages) {
            setPageNumber(pageNumber + 1)
        }
    }

    const decreasePageNumber = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
        else {
            setPageNumber(1)
        }
    }


    // ALL Doctors Fetch Api
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/api/v1/user/all-doctors?page=${pageNumber}&limit=${size}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setDoctors(data?.data);
                setCount(data.total);
            });
    }, [pageNumber,size]);
    if (loading) return <Spinner></Spinner>

    if (!count)
        return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Doctor Found</h2>;


    return (
        <div className='lg:ml-20 '>
            <h1 className='text-5xl font-bold mt-20 '>Doctor</h1>
            <Link to="/signup"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-md btn-ghost bg-tahiti-darkGreen text-tahiti-white'>Add New</button></Link>
            <div className="overflow-x-auto pr-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th >Index</th>
                            <th >First Name</th>
                            <th >Last Name</th>
                            <th >Email</th>
                            <th >Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                {/* <td>{ doctor?._id}</td> */}
                                <td>{doctor?.firstName}</td>
                                <td>{doctor?.lastName}</td>
                                <td>{doctor?.email}</td>
                                {/* <td>{ doctor?.phone}</td> */}
                                <td ><button className='btn btn-xs bg-tahiti-darkGreen'>Details</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>


            {/* Pagination Button */}

            <div className="flex flex-col items-center mt-5 mb-5 text-xl">

                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing Page <span className="font-semibold text-gray-900 dark:text-white">{pageNumber}</span><span className="font-semibold text-gray-900 dark:text-white"></span> of <span className="font-semibold text-gray-900 dark:text-white">{pages}</span> Pages
                </span>

                <div className="inline-flex mt-2 xs:mt-0">
                    <button onClick={decreasePageNumber} className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white rounded-l  dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white">
                        Prev
                    </button>
                    <button onClick={increasePageNumber} className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white   border-0 border-l  rounded-r dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white">
                        Next
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Doctors;



