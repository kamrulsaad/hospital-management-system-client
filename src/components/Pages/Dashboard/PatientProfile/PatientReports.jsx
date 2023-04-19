import React from "react";
import useUserData from "../../../Hooks/useUserData";
import { FaFileDownload, FaFileUpload } from "react-icons/fa";

const PatientReports = ({ reports, qr }) => {
  const [user, role] = useUserData();

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    // Do something with the selected file
    console.log(selectedFile);
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold mb-8">
        <span>PATIENT</span>{" "}
        <span className="text-tahiti-lightGreen">REPORTS</span>
      </h1>
      <table className="table xl:w-full">
        {/* head */}
        <tbody className="">
          {/* row 1 */}
          <tr>
            <th className="bg-tahiti-grey ">Name</th>
            <th className="bg-tahiti-grey ">Date</th>
            <th className="bg-tahiti-grey text-center">Available</th>
            {(qr || role === "labaratorist") && (
              <th className="bg-tahiti-grey">File</th>
            )}
          </tr>
          {reports?.map((report) => {
            const date = new Date(report?.createdAt);
            const options = { year: "numeric", month: "short", day: "numeric" };
            const formattedDate = date
              .toLocaleDateString("en-US", options)
              .replace(/ /g, "/");

            return (
              <tr key={report?._id}>
                <td>{report?.category?.name}</td>
                <td>{formattedDate.replace(",", "")}</td>
                <td className="text-center">
                  {report?.available ? "Available" : "Not Available"}
                </td>
                {qr && (
                  <td>
                    {report?.file_url ? (
                      <FaFileDownload className="text-2xl" />
                    ) : (
                      <FaFileDownload className="text-2xl opacity-25 cursor-not-allowed" />
                    )}
                  </td>
                )}
                {role === "labaratorist" && (
                  <td>
                    {report?.file_url ? (
                      <FaFileUpload className="text-2xl opacity-25 cursor-not-allowed" />
                    ) : (
                      <div>
                        <label htmlFor="file-upload">
                          <FaFileUpload className="text-2xl cursor-pointer" />
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          accept="application/pdf"
                        />
                      </div>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PatientReports;
