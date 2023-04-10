import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const InvoiceRow = ({ invoice, i, role, refetch, setRefetch }) => {

  const [delLoading, setDelLoading] = useState(null)

  console.log(invoice)

  // console.log(window.location.host);

  return (
    <tr key={invoice?._id}>
      <th className="text-center">{i + 1}</th>
      <td className="text-center">{invoice?.serialId}</td>
      <td className="text-center">{invoice?.total}</td>
      <td className="text-center">
        {role?.includes("accountant") ? (
          <button className="btn btn-xs">
            <Link to={`/createinvoice/${invoice._id}`}>Make payment</Link>
          </button>
        ) : (
          <button className="btn btn-xs">
            <Link to={`/patientprofile/${invoice._id}`}>Details</Link>
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
              onClick={() => handleDelete(invoice?._id)}
              className="text-tahiti-red cursor-pointer mx-auto"
            ></FaTrash>
          )}
        </td>
      )}
    </tr>
  );
};

export default InvoiceRow;
