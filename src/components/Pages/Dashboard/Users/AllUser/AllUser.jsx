import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import Spinner from "../../../../Shared/Spinner";
import useUserData from "../../../../Hooks/useUserData";

const AllUser = () => {
  const [loading, setLoading] = useState(null);
  const [users, setUsers] = useState([]);
  console.log(users);
  const [name, setName] = useState([]);
  const [value, setValue] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [user, role] = useUserData();

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
      setPageNumber(pageNumber + 1);
    }
  };

  const decreasePageNumber = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(1);
    }
  };

  // All Patient fetch data
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://hms-server.onrender.com/api/v1/user/all-user?page=${pageNumber}&limit=${size}&key=${name}&value=${value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setDataCount(data?.total);
        setLoading(false);
        setUsers(data?.data);
        setCount(data.total);
      });
  }, [pageNumber, size]);

  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  if (users.length === 0)
    return (
      <h2 className="text-tahiti-red text-center mt-60 text-5xl ">
        No Patient Found
      </h2>
    );

  return (
    <div className="lg:ml-20 ">
      <h1 className="text-5xl font-bold mt-20 ">Users : {dataCount}</h1>
      {/* Search Field */}
      <div className="flex justify-between pr-10">
        {role?.includes("super-admin") && role?.includes("admin") && (
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
            <option value={"phone"}>Phone</option>
            <option value={"role"}>Role</option>
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
        <table className="table w-full bg-tahiti-white">
          <thead>
            <tr>
              <th></th>
              <th>User ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user?._id}>
                <th>{i + 1}</th>
                <td>{user?._id}</td>
                <td className="text-center">{user?.firstName} {user?.lastName}</td>
                <td className="text-center">{user?.email}</td>
                <td className="text-center">{user?.role}</td>
                <td className="text-center">
                  <Link to="/user/userdetails">
                    <button className="btn btn-xs btn-ghost bg-tahiti-darkGreen text-tahiti-white ">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Button */}

      <div className="flex flex-col items-center mt-5 mb-5 text-xl">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing Page{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pageNumber}
          </span>
          <span className="font-semibold text-gray-900 dark:text-white"></span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {pages}
          </span>{" "}
          Pages
        </span>

        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={decreasePageNumber}
            className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white rounded-l  dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white"
          >
            Prev
          </button>
          <button
            onClick={increasePageNumber}
            className="px-4 py-2 text-sm font-medium bg-tahiti-primary text-tahiti-white   border-0 border-l  rounded-r dark:hover:bg-tahiti-darkGreen dark:hover:text-tahiti-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUser;
