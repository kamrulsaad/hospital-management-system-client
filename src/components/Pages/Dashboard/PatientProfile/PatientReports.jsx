import React, { useState } from "react";
import { FaFileDownload, FaFileUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";

const PatientReports = ({ reports, qr }) => {
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
    <div>
      <h1 className="text-center text-4xl font-semibold mb-8">
        <span>PATIENT</span>{" "}
        <span className="text-tahiti-lightGreen">REPORTS</span>
      </h1>
      {reports?.length ? (
        <table className="table xl:w-full">
          {/* head */}
          <tbody className="">
            {/* row 1 */}
            <tr>
              <th className="bg-tahiti-grey ">SI</th>
              <th className="bg-tahiti-grey ">Name</th>
              <th className="bg-tahiti-grey ">Date</th>
              <th className="bg-tahiti-grey text-center">Available</th>
              {qr && <th className="bg-tahiti-grey">File</th>}
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
                  <td>{report?.serialId}</td>
                  <td>{report?.category?.name}</td>
                  <td>{formattedDate.replace(",", "")}</td>
                  <td className="text-center">
                    {report?.available ? "Available" : "Not Available"}
                  </td>
                  {qr && (
                    <td>
                      {report?.file_url ? (
                        downloading ? (
                          <img className="animate-spin w-4" src="/assets/loading.png"/>
                        ) : (
                          <FaFileDownload
                            className="text-2xl text-tahiti-primary cursor-pointer"
                            onClick={() => handleDownload(report.file_url)}
                          />
                        )
                      ) : (
                        <FaFileDownload
                          title="Not Available Yet"
                          className="text-2xl opacity-20 cursor-not-allowed"
                        />
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-tahiti-red text-center">No Reports Found</p>
      )}
    </div>
  );
};

export default PatientReports;
