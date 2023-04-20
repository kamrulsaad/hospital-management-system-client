import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../Shared/Spinner";

const TestDetails = () => {
  const [test, setTest] = useState({});
  const [loading, setLoading] = useState(null);
  const { testId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://hms-server.onrender.com/api/v1/test/${testId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          setTest(result.data);
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      })
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get the month name abbreviation
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthName = monthNames[date.getMonth()];

    // Get the day, year, and time in 12-hour format
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    // Combine the formatted values into a string
    const formattedDate = `${monthName}/${day}/${year}- ${hours}:${minutes}${amPm}`;

    return formattedDate;
  }

  if (loading) return <Spinner></Spinner>

  return (
    <div className="m-20 p-10 bg-tahiti-white">
      <h1 className="text-center text-3xl font-bold underline mb-4">
        {test?.category?.name}
      </h1>
      <div className="grid grid-cols-2 mx-40 mb-6">
        <div>
          <p>
            SerialId: #<b>{test?.serialId}</b>
          </p>
          <p>
            Status: <b>{test?.available ? "Available" : "Not Available"}</b>
          </p>
          <p>
            Created: <b>{formatDate(test?.createdAt)}</b>
          </p>
          <p>
            Last Updated: <b>{formatDate(test?.updatedAt).replace(",", "")}</b>
          </p>
        </div>
        <div className="ml-10">
          <p>
            Patient: <b>{test?.patient?.name}</b>
          </p>
          <p>
            PatientId: <b>{test?.patient?.serialId}</b>
          </p>
          <p>
            Assigned By:{" "}
            <b>
              {test?.createdBy?.firstName + " " + test?.createdBy?.lastName}
            </b>
          </p>
          <p>
            Phone: <b>{test?.createdBy?.phone}</b>
          </p>
        </div>
      </div>
      {test?.description && (
        <p className="mb-6 mx-40">
          <b>Remarks:</b> {test?.description}
        </p>
      )}
      {test?.file_url && (
        <iframe
          className="mx-auto rounded-lg"
          src={test?.file_url}
          width="80%"
          height="550px"
        />
      )}
    </div>
  );
};

export default TestDetails;
