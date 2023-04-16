import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const InvoiceRow = ({ invoice, i, role, refetch, setRefetch }) => {
  // `${window.location.host}/qr/patient/${invoice?.serialId}`

  const date = new Date(invoice?.createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(/ /g, "/");

  return (
    <tr key={invoice?._id}>
      <th className="text-center">{i + 1}</th>
      <td>{invoice?.serialId}</td>
      <td className="text-center">{invoice?.patient?.name}</td>
      <td className="text-center">{formattedDate.replace(",", "")}</td>
      <td className="text-center">{invoice?.sub_total}৳</td>
      <td className="text-center">{invoice?.grand_total}৳</td>
      <td className="text-center">
        {invoice?.paymentCompleted ? "Paid" : "Unpaid"}
      </td>
      <td className="text-center">
        <button className="btn btn-xs">
          <Link to={`/payment/invoice/${invoice._id}`}>Details</Link>
        </button>
      </td>

      {(role?.includes("super-admin") || role?.includes("admin")) && (
        <td>
          {/* {delLoading ? (
            <img
              className="w-6 animate-spin mx-auto"
              src="assets/loading.png"
              alt=""
            />
          ) : ( */}
            <FaTrash
              onClick={() => handleDelete(invoice?._id)}
              className="text-tahiti-red cursor-pointer mx-auto"
            ></FaTrash>
          {/* )} */}
        </td>
      )}
    </tr>
  );
};

export default InvoiceRow;
