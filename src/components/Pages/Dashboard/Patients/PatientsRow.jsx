import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PatientsRow = ({ patient, i, role, refetch, setRefetch }) => {
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
        fetch(`https://hms-server.onrender.com/api/v1/patient/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === "success") toast.success(result.message);
            else toast.error(result.error);
            setRefetch(!refetch);
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
    <tr key={patient?._id}>
      <th className="text-center">{i + 1}</th>
      <td className="text-center">{patient?.serialId}</td>
      <td className="text-center">{patient?.name}</td>
      <td className="text-center">{patient?.age}</td>
      <td className="text-center">{patient?.bloodGroup}</td>
      <td className="text-center">{patient?.gender}</td>
      <td className="text-center">{patient?.phone}</td>
      <td className="text-center">
        {role?.includes("accountant") ? (
          <button className="btn btn-xs">
            <Link to={`/createinvoice/${patient._id}`}>Make payment</Link>
          </button>
        ) : (
          <button className="btn btn-xs">
            <Link to={`/patient/newpatientprofile/${patient._id}`}>Details</Link>
          </button>
        )}
      </td>

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
              onClick={() => handleDelete(patient?._id)}
              className="text-tahiti-red cursor-pointer mx-auto"
            ></FaTrash>
          )}
        </td>
      )}
    </tr>
  );
};

export default PatientsRow;
