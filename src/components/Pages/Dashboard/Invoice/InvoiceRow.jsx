import React from "react";
import { Link } from "react-router-dom";

const InvoiceRow = ({ patient, i, role, refetch, setRefetch }) => {
    console.log(patient)
  return (
    <tr key={patient?._id}>
      <th className="text-center">{i + 1}</th>
      <td className="text-center">{patient?.serialId}</td>
      <td className="text-center">{patient?.total}</td>
      <td className="text-center">
        {role.includes("accountant") ? (
          <button className="btn btn-xs">
            <Link to={`/createinvoice/${patient._id}`}>Make payment</Link>
          </button>
        ) : (
          <button className="btn btn-xs">
            <Link to={`/patientprofile/${patient._id}`}>Details</Link>
          </button>
        )}
      </td>

      {(role.includes("super-admin") || role.includes("admin")) && (
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

export default InvoiceRow;
