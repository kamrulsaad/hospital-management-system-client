import React, { useState } from "react";
import { FaFileUpload, FaTrash } from "react-icons/fa";
import { HiOutlineDocumentRemove } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const TestRow = ({ invoice, role, setRefetch }) => {
  const [delLoading, setDelLoading] = useState(null);

  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("LoginToken")}`
  );

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const handleFileRemove = (id) => {
    setDelLoading(true);

    Swal.fire({
      title: `Are you sure?
              This process can't be undone!`,
      showCancelButton: true,
      confirmButtonText: "Okay",
    }).then((results) => {
      if (results.isConfirmed) {
        fetch(
          `https://hms-server.onrender.com/api/v1/test/remove/${id}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") toast.success(result.message);
            else toast.error(result.error);
            setRefetch();
            setDelLoading(false);
          })
          .catch((error) => {
            toast.error(error);
            setDelLoading(false);
          });
      }
      if (results.isDismissed) setDelLoading(false);
    });
  };

  const handleDelete = (id) => {
    setDelLoading(true);

    Swal.fire({
      title: `Are you sure?
              This process can't be undone!`,
      showCancelButton: true,
      confirmButtonText: "Okay",
    }).then((results) => {
      if (results.isConfirmed) {
        fetch(`https://hms-server.onrender.com/api/v1/test/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") toast.success(result.message);
            else toast.error(result.error);
            setRefetch();
            setDelLoading(false);
          })
          .catch((error) => {
            toast.error(error);
            setDelLoading(false);
          });
      }
      if (results.isDismissed) setDelLoading(false);
    });
  };

  const date = new Date(invoice?.createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(/ /g, "/");

  return (
    <tr>
      <td>{invoice?.serialId}</td>
      <td className="text-center">{invoice?.patient?.name}</td>
      <td className="text-center">{invoice?.category?.name}</td>
      <td className="text-center">{formattedDate.replace(",", "")}</td>
      <td className="text-center">
        {invoice?.available ? "Available" : "Not Available"}
      </td>
      <td className="text-center">
        <Link to={`/testDetails/${invoice?._id}`}>
          <button className="btn btn-xs rounded-lg">Details</button>
        </Link>
      </td>
      {role?.includes("labaratorist") && (
        <>
          <td>
            <Link to={`/test/${invoice?._id}`}>
              <FaFileUpload className="text-2xl cursor-pointer" />
            </Link>
          </td>
          <td>
            {invoice?.available ? (
              <HiOutlineDocumentRemove
                onClick={() => handleFileRemove(invoice?._id)}
                className="text-2xl text-tahiti-red cursor-pointer"
              />
            ) : (
              <HiOutlineDocumentRemove className="text-2xl text-tahiti-grey cursor-not-allowed" />
            )}
          </td>
        </>
      )}

      {(role?.includes("super-admin") || role?.includes("admin")) && (
        <td>
          {delLoading ? (
            <img
              className="w-6 animate-spin mx-auto"
              src="assets/loading.png"
              alt=""
            />
          ) : (
            <FaTrash
              onClick={() => handleDelete(invoice?._id)}
              className="text-tahiti-red cursor-pointer mx-auto"
            ></FaTrash>
          )}
        </td>
      )}
    </tr>
  );
};

export default TestRow;
