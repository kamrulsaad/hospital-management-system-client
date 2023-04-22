import React, { useEffect, useRef, useState } from "react";
import Spinner from "../../../Shared/Spinner";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";

const InvoicePage = () => {
  const { invoiceId } = useParams();
  const [loading, setLoading] = useState(null);
  const [refetch, setRefetch] = useState(true);
  const [status, setStatus] = useState(null);
  const [invoice, setInvoice] = useState({});

  const date = new Date(invoice?.createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(/ /g, "/");

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleStatusUpdate = () => {
    const updateStatus = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/v1/invoice/status/${invoiceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data?.status === "success") {
        toast.success(data?.message);
        setRefetch(!refetch);
      }
      setLoading(false);
    };
    updateStatus();
  };

  useEffect(() => {
    const fetchInvoiceData = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/v1/invoice/${invoiceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
        }
      );
      const data = await response.json();
      setInvoice(data?.data);
      setStatus(data?.data?.paymentCompleted);
      setLoading(false);
    };
    fetchInvoiceData();
  }, [refetch]);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="p-10 pb-0">
      <div>
        <p className="text-xl text-tahiti-lightGreen my-2-5 mx-10 font-semibold">
          UNICEH HMS
        </p>
      </div>
      <div ref={componentRef}>
        <div className="grid grid-cols-3 bg-tahiti-white p-10">
          <div>
            <p>From</p>
            <p className="font-medium">
              {invoice?.createdBy?.firstName} {invoice?.createdBy?.lastName}
            </p>
            <p className="font-medium capitalize">{invoice?.createdBy?.role}</p>
            <p>
              Phone:{" "}
              <span className="font-medium">{invoice?.createdBy?.phone}</span>{" "}
            </p>
            <p>
              Email:{" "}
              <span className="font-medium">{invoice?.createdBy?.email}</span>
            </p>
          </div>
          <div>
            <p>To</p>
            <p>Patient Name: {invoice?.patient?.name}</p>
            <p>Phone: {invoice?.patient?.phone}</p>
            <p>Id: {invoice?.patient?.serialId}</p>
          </div>
          <div>
            <p>
              Invoice Id: <span className="font-bold">{invoice?.serialId}</span>
            </p>
            <p>
              Payment Status:{" "}
              <span className="font-bold">
                {" "}
                {invoice?.paymentCompleted ? "Paid" : "Unpaid"}
              </span>
            </p>
            <p>Date: {formattedDate.replace(",", "")}</p>
          </div>
        </div>
        <div className="px-10 bg-tahiti-white">
          <div className="overflow-x-auto bg-tahiti-white border text-sm rounded-lg">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="p-2 pl-4">Sl</th>
                  <th className="p-2">Item</th>
                  <th className="text-right p-2">Amount</th>
                </tr>
              </thead>
              {invoice?.payments?.map((payment, i) => (
                <tr key={payment?._id}>
                  <td className="pl-4 p-2">{i + 1}</td>
                  <td className="p-2">{payment.name}</td>
                  <td className="text-right p-2">{payment.amount}৳</td>
                </tr>
              ))}
              <tr>
                <td className="bg-tahiti-babyPink font-bold pl-4 p-2">#</td>
                <td className="bg-tahiti-babyPink font-bold p-2">Sub Total</td>
                <td className="text-right font-bold bg-tahiti-babyPink p-2">
                  {invoice?.sub_total}৳
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-3 bg-tahiti-white p-10">
          <div className="col-span-2 mt-auto space-x-4">
            {!status && (
              <button
                onClick={handleStatusUpdate}
                className="btn btn-xs btn-success print:hidden "
              >
                Submit Payment
              </button>
            )}
            <button
              onClick={handlePrint}
              className="btn btn-ghost btn-xs bg-tahiti-primary print:hidden"
            >
              Print
            </button>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <td className="p-2">Sub Total: </td>
                    <td className="font-bold text-right p-2">
                      {invoice?.sub_total}৳
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Tax:</td>
                    <td className="font-bold text-right p-2">
                      +{invoice?.tax}%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Discount:</td>
                    <td className="font-bold text-right p-2">
                      -{invoice?.discount}%
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Grand Total: </td>
                    <td className="font-bold text-right p-2">
                      {invoice?.grand_total}৳
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
