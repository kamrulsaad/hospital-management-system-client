import React, { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTest = () => {
  const [image, setImage] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const navigate = useNavigate();
  const { testId } = useParams();

  const selectFile = (e) => {
    setFileUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Uploading File",
      html: "Please wait while we upload the file...",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const formData = new FormData();
    formData.append("pdf", image, image?.name);
    formData.append("description", event.target.description.value);

    //  send to backend
    fetch(`http://localhost:5000/api/v1/test/upload/${testId}`, {
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
            title: result.message,
          }).then(() => {
            navigate("/tests");
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
  };

  return (
    <div className="mx-20 mt-10 grid grid-cols-2 items-center bg-tahiti-white">
      <form
        onSubmit={handleFileUpload}
        novalidate=""
        action=""
        class="container flex flex-col space-y-2"
      >
        <h1 className="text-3xl pl-6 font-semibold text-tahiti-darkGreen">
          Update Test
        </h1>
        <fieldset class="grid grid-cols-2 gap-6 p-6 rounded-md w-3/4 ">
          <div className="col-span-full sm:col-span-3 flex  items-center ">
            <p for="password" className=" w-1/3  font-medium">
              Remarks:{" "}
            </p>
            <textarea
              id="description"
              type="text"
              className="w-3/4 rounded-md border p-1 "
            />
          </div>
          <div className="col-span-full sm:col-span-3 flex items-center">
            <p for="password" className=" w-1/3  font-medium">
              Choose File:{" "}
            </p>
            <label htmlFor="file-upload">
              <FaFileUpload className="text-2xl cursor-pointer" />
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={selectFile}
              className="hidden"
              accept="application/pdf"
            />
          </div>
          <button
            type="submit"
            className="btn btn-ghost btn-sm w-1/3 bg-tahiti-primary col-span-2"
          >
            Update
          </button>
        </fieldset>
      </form>
      {fileUrl && (
        <div>
          <p className="text-center mb-2 text-lg">
            Preview of <b>{image?.name} </b>!{" "}
            <span
              onClick={() => {
                URL.revokeObjectURL(fileUrl);
                setFileUrl(null);
                setImage(null);
              }}
              className="underline cursor-pointer"
            >
              remove?
            </span>
          </p>
          <iframe
            className="mx-auto rounded-lg"
            src={fileUrl}
            width="80%"
            height={window.innerHeight - 200}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateTest;
