import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ExpCatRox = ({ expense, role, setRefetch, i }) => {
  const [delLoading, setDelLoading] = useState(null);

  const handleDelete = (id) => {
    setDelLoading(true);

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("LoginToken")}`
    );

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    Swal.fire({
      title: `Are you sure?
              This process can't be undone!`,
      showCancelButton: true,
      confirmButtonText: "Okay",
    }).then((results) => {
      if (results.isConfirmed) {
        fetch(`https://server.thelabaidhospital.com/api/v1/expense/category/${id}`, requestOptions)
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

  return (
    <tr>
      <td>{i + 1}</td>
      <td className="text-center">{expense?.name}</td>
      <td className="text-center">
        <button className="btn btn-xs">
          <Link to={`/expense/category/${expense._id}`}>Details</Link>
        </button>
      </td>
      {(role?.includes("super-admin") || role?.includes("admin")) && (
        <>
          <td className="text-center">
            <Link to={`/expense/category/update/${expense?._id}`}>
              <button className="btn btn-xs bg-tahiti-primary border-none">
                Update
              </button>
            </Link>
          </td>
          <td>
            {delLoading ? (
              <img
                className="w-6 animate-spin mx-auto"
                src="/assets/loading.png"
                alt=""
              />
            ) : (
              <FaTrash
                onClick={() => handleDelete(expense?._id)}
                className="text-tahiti-red cursor-pointer mx-auto"
              ></FaTrash>
            )}
          </td>
        </>
      )}
    </tr>
  );
};

export default ExpCatRox;
