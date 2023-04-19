import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserData from "../../../Hooks/useUserData";
import Spinner from "../../../Shared/Spinner";
import InvoiceRow from "./InvoiceRow";
import { MdSearch } from "react-icons/md";

const AllInvoice = () => {
  const [loading, setLoading] = useState(null);
  const [invoices, setInvoices] = useState([]);
  console.log(invoices);
  const [name, setName] = useState([]);
  const [value, setValue] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [user, role] = useUserData();
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

  // All Patient fetch data  ?page=1&limit=10
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://hms-server.onrender.com/api/v1/invoice/all-invoices?page=${pageNumber}&limit=${size}&key=${name}&value=${value}`,
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
        setCount(data.total);
        setInvoices(data?.data);
      });
  }, [pageNumber, size, refetch]);

  // Loading functionality
  if (loading) return <Spinner></Spinner>;
  else if (invoices?.length === 0)
    return (
      <>
        <h2 className="text-tahiti-red text-center mt-60 text-3xl">
          No Invoice Found
        </h2>
        <Link to="/patients">
          <button className=" lg:my-5 font-semibold p-1 rounded-md btn-ghost block mx-auto bg-tahiti-darkGreen text-tahiti-white px-4">
            Add New invoice for patient
          </button>
        </Link>
      </>
    );

  return (
    <div className="lg:ml-20 ">
      <h1 className="text-5xl font-bold mt-20 ">Invoices : {dataCount}</h1>

      <div className="flex justify-between pr-10">
        {role?.includes("accountant") && (
          <Link to="/patients">
            <button className=" lg:my-5 btn btn-sm lg:mr-5 font-semibold px-2 py-1 rounded-md btn-ghost bg-tahiti-darkGreen text-tahiti-white">
              Add New
            </button>
          </Link>
        )}
        {(role?.includes("super-admin") || role?.includes("admin")) && (
          <Link
            to={"/categories"}
            className="my-5 btn font-semibold px-2 py-1 rounded-md btn-ghost bg-tahiti-darkGreen  text-tahiti-white btn-sm"
          >
            all categories
          </Link>
        )}
        <form onSubmit={handleSearch} action="" className=" flex gap-2">

          <select
            type="text"
            name="name"
            id="name"
            className="select select-sm focus:outline-none bg-tahiti-primary font-bold  text-tahiti-white "
          >
            <option disabled selected>
              Select
            </option>
            <option value={"serialId"}>Serial ID </option>
            <optgroup label="Payment Status">
              <option value={true}>Unpaid</option>
              <option value={false}>Paid</option>
            </optgroup>
          </select>
          <input type="text" name="value" id="value" className="input input-bordered input-info  input-sm  w-1/2 focus:outline-none" />
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
              <th className="text-center">Sl</th>
              <th>Invoice ID</th>
              <th className="text-center">Patient</th>
              <th className="text-center">Payment Date</th>
              <th className="text-center">Sub Total</th>
              <th className="text-center">Grand Total</th>
              <th className="text-center">Status</th>
              <th className="text-center">Details</th>
              {(role?.includes("super-admin") || role?.includes("admin")) && (
                <th className="text-center">Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {invoices.map((patient, i) => (
              <InvoiceRow
                key={patient._id}
                invoice={patient}
                i={i}
                role={role}
                refetch={refetch}
                setRefetch={setRefetch}
              ></InvoiceRow>
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

export default AllInvoice;
