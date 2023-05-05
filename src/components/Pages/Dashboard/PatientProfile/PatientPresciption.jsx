import React from "react";
import { FaFileDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import { useState } from "react";

const PatientPresciption = ({ reports, qr, normal }) => {
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async (url) => {
    setDownloading(true);
    const filename = url.substring(url.lastIndexOf("/") + 1).replace("\\", "/");
    const fileNameWithoutExtension = filename.substring(
      filename.lastIndexOf("/") + 1,
      filename.lastIndexOf(".")
    );
    const file = fileNameWithoutExtension.split("-").slice(2).join(" ");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    const fileBlob = await response.blob();
    setDownloading(false);

    saveAs(fileBlob, file + "-report.pdf");
  };  

  return (
    <div className={`overflow-x-auto ${normal && "hidden lg:block"}`}>
      <h1 className="text-center text-2xl mt-4 font-semibold">
        <span>PATIENT</span>{" "}
        <span className="text-tahiti-lightGreen">INVOICES</span>
      </h1>
      {reports?.length ? (
        <div className="mx-10 my-4">
          <table className="table w-full text-xs">
            <tbody>
              <tr>
                <th className="bg-tahiti-grey p-2">SI</th>
                <th className="bg-tahiti-grey p-2">Total</th>
                <th className="bg-tahiti-grey p-2">Date</th>
                <th className="bg-tahiti-grey p-2 text-center">Status</th>
              </tr>
              {reports?.map((report) => {
                const date = new Date(report?.createdAt);
                const options = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };
                const formattedDate = date
                  .toLocaleDateString("en-US", options)
                  .replace(/ /g, "/");

                return (
                  <tr key={report?._id}>
                    <td className=" p-2">{report?.serialId}</td>
                    <td className=" p-2">{report?.grand_total}৳</td>
                    <td className=" p-2">{formattedDate.replace(",", "")}</td>
                    <td className="text-center p-2">
                      {report?.paymentCompleted ? "Paid" : "Unpaid"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-tahiti-red text-center text-sm">No Invoices Found</p>
      )}
    </div>
  );
};

export default PatientPresciption;
