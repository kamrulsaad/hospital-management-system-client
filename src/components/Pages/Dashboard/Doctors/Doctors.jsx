import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner'
import useUserData from '../../../Hooks/useUserData';
import { MdSearch } from "react-icons/md";


const Doctors = () => {

    const [loading, setLoading] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [user, role] = useUserData();
    const [name, setName] = useState([]);
    const [value, setValue] = useState([]);
    const [dataCount, setDataCount] = useState(0);


    const handleSearch = event => {
        event.preventDefault();
        setLoading(true);
        const form = event.target;
        const name = form.name.value;
        const value = form.value.value;
        setName(name)
        setValue(value)
    };
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
        fetch(`https://hms-server.onrender.com/api/v1/user/all-doctors?page=${pageNumber}&limit=${size}&key=${name}&value=${value}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDataCount(data?.total);
                setLoading(false);
                setDoctors(data?.data);
                setCount(data.total);
            });
    }, [pageNumber, size]);
    if (loading) return <Spinner></Spinner>

    if (!count)
        return <h2 className="text-tahiti-red text-center mt-60 text-5xl ">No Doctor Found</h2>;


    return (
        <div className='lg:ml-20 '>
            <h1 className='text-5xl font-bold mt-20 '>Doctor : {dataCount}</h1>
            {/* Search Field */}
            <div className="flex justify-between pr-10">
                {role?.includes("super-admin")&&role?.includes("admin") && (
                    <>
                         <Link to="/signup"><button className=' lg:mb-5 lg:mt-5 font-semibold p-1 rounded-md btn-ghost bg-tahiti-darkGreen text-tahiti-white'>Add New</button></Link>
                    </>
                )}
                <form onSubmit={handleSearch} action="" className=" flex gap-2 lg:mt-5 ">

                    <select
                        type="text"
                        name="name"
                        id="name"
                        className="select select-sm focus:outline-none bg-tahiti-primary font-bold  text-tahiti-white "
                    >
                        <option disabled selected>
                            Select
                        </option>
                        <option value={"firstName"}>First Name</option>
                        <option value={"lastName"}>Last Name</option>
                        <option value={"email"}>Email</option>
                    </select>
                    <input type="text" name="value" id="value" className="input input-bordered input-info  input-sm  max-w-xs" />
                    <button type="submit" className="btn btn-sm">
                        <MdSearch
                            className="cursor-pointer mx-auto"
                        />
                    </button>
                </form>
            </div>
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



