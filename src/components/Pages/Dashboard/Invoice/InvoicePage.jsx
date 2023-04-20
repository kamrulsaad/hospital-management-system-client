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
        `https://hms-server.onrender.com/api/v1/invoice/status/${invoiceId}`,
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
        `https://hms-server.onrender.com/api/v1/invoice/${invoiceId}`,
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
    <div>
      <div className="p-20">
        <div>
          <p className="text-4xl text-tahiti-lightGreen m-5 font-semibold">
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
              <p className="font-medium capitalize">
                {invoice?.createdBy?.role}
              </p>
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
                Invoice Id:{" "}
                <span className="font-bold">{invoice?.serialId}</span>
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
          <div className="p-10 bg-tahiti-white">
            <div className="overflow-x-auto bg-tahiti-white border rounded-lg">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Sl</th>
                    <th>Item</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                {invoice?.payments?.map((payment, i) => (
                  <tr key={payment?._id}>
                    <td>{i + 1}</td>
                    <td>{payment.name}</td>
                    <td className="text-right">{payment.amount}৳</td>
                  </tr>
                ))}
                <tr>
                  <td className="bg-tahiti-babyPink font-bold">#</td>
                  <td className="bg-tahiti-babyPink font-bold">Sub Total</td>
                  <td className="text-right font-bold bg-tahiti-babyPink">
                    {invoice?.sub_total}৳
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-3 bg-tahiti-white p-10">
            <div>
              <button
                onClick={handlePrint}
                className="btn btn-ghost btn-xs bg-tahiti-primary print:hidden"
              >
                Print
              </button>
            </div>
            <div></div>
            <div>
              <div className="overflow-x-auto mb-5">
                <table className="table w-full">
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <td>Sub Total: </td>
                      <td className="font-bold text-right">
                        {invoice?.sub_total}৳
                      </td>
                    </tr>
                    <tr>
                      <td>Tax:</td>
                      <td className="font-bold text-right">+{invoice?.tax}%</td>
                    </tr>
                    <tr>
                      <td>Discount:</td>
                      <td className="font-bold text-right">
                        -{invoice?.discount}%
                      </td>
                    </tr>
                    <tr>
                      <td>Grand Total: </td>
                      <td className="font-bold text-right">
                        {invoice?.grand_total}৳
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {!status && (
                <button
                  onClick={handleStatusUpdate}
                  className="btn btn-sm btn-success m-4 print:hidden "
                >
                  Submit Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
