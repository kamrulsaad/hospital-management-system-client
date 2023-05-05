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
        if (result.status === "success") {
          setTest(result.data);
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      });
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

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="p-10 bg-tahiti-white">
      <div className="md:grid grid-cols-2 mx-20 items-center">
        <div>
          <h1 className="text-3xl mb-4">
            Test: <b>{test?.category?.name}</b>
          </h1>
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
          {test?.description && (
            <p className="w-3/4">
              Remarks: {test?.description}
            </p>
          )}
        </div>
        <div>
          {test?.file_url && (
            <iframe
              className="mx-auto rounded-lg"
              src={test?.file_url}
              width="100%"
              height="500px"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
