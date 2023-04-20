import React, { useState } from "react";
import { FaFileUpload, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const TestRow = ({ invoice, i, role, refetch, setRefetch }) => {
  const [delLoading, setDelLoading] = useState(null);
  const [uploading, setUploading] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    // Create URL for the selected file
    const fileUrl = window.URL.createObjectURL(selectedFile);

    // Create an iframe to display the PDF preview
    const iframe = document.createElement("iframe");
    iframe.src = fileUrl;
    iframe.width = "100%";
    iframe.height = "500px";

    Swal.fire({
      title: "Are you sure you want to upload this file?",
      text: `Preview of ${selectedFile.name}`,
      html: iframe.outerHTML,
      showCancelButton: true,
      confirmButtonText: "Sure",
    }).then((result) => {
      if (
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.esc
      ) {
        return;
      }
      if (result.isConfirmed) {
        Swal.fire({
          title: "Uploading File",
          html: "Please wait while we upload the file...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        const formData = new FormData();
        formData.append("pdf", selectedFile, selectedFile?.name);
        //  send to backend
        fetch(`https://hms-server.onrender.com/api/v1/test/upload/${invoice?._id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === "success") {
              Swal.fire({
                icon: "success",
                title: "File Uploaded Successfully!",
                text: result.message,
                
              });
            } else {
              toast.error(result.error);
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong while uploading the file!",
              footer: error.message,
            });
          });
        window.URL.revokeObjectURL(fileUrl);
      }
    });
  };

  // const handleDelete = (id) => {
  //   setDelLoading(true);

  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     "Authorization",
  //     `Bearer ${localStorage.getItem("LoginToken")}`
  //   );

  //   var requestOptions = {
  //     method: "DELETE",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   Swal.fire({
  //     title: `Are you sure?
  //             This process can't be undone!`,
  //     showCancelButton: true,
  //     confirmButtonText: "Okay",
  //   }).then((results) => {
  //     if (results.isConfirmed) {
  //       fetch(`https://hms-server.onrender.com/api/v1/invoice/${id}`, requestOptions)
  //         .then((response) => response.json())
  //         .then((result) => {
  //           if (result.status === "success") toast.success(result.message);
  //           else toast.error(result.error);
  //           setRefetch(!refetch);
  //           setDelLoading(false);
  //         })
  //         .catch((error) => {
  //           toast.error(error);
  //           setDelLoading(false);
  //         });
  //     }
  //     if (results.isDismissed) setDelLoading(false);
  //   });
  // };

  const date = new Date(invoice?.createdAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date
    .toLocaleDateString("en-US", options)
    .replace(/ /g, "/");

  return (
    <tr>
      <td>{invoice?.serialId}</td>
      <td className="text-center">{invoice?.patient?.name}</td>
      <td className="text-center">{invoice?.category?.name}</td>
      <td className="text-center">{formattedDate.replace(",", "")}</td>
      <td className="text-center">
        {invoice?.available ? "Available" : "Not Available"}
      </td>
      {role?.includes("labaratorist") && (
        <td>
          {uploading ? (
            <img className="w-6 animate-spin" src="assets/loading.png" alt="" />
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

export default TestRow;
