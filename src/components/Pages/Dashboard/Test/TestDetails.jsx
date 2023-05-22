import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../Shared/Spinner";
import formatDate from "../../../../utils/formatDate";

const TestDetails = () => {
  const [test, setTest] = useState({});
  const [loading, setLoading] = useState(null);
  const { testId } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/v1/test/${testId}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          console.log(result.data);
          setTest(result.data);
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="mx-20 my-10">
      <div className="grid grid-cols-3 gap-x-4 italic border p-2 mb-6">
        <div>
          <div className="flex justify-between">
            <p>ID no: </p>
            <p>{test?.serialId}</p>
          </div>
          <div className="flex justify-between">
            <p>Patient's Name: </p>
            <p>{test?.patient?.name}</p>
          </div>
          <div className="flex justify-between">
            <p>Referred By: </p>
            <p>{test?.invoiceId?.referredBy || "Self"}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p>Nature of Exam: </p>
            <p className="capitalize">{test?.category?.nature}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p>Recieving Date: </p>
            <p className="capitalize">{formatDate(test?.createdAt)}</p>
          </div>
          <div className="flex justify-between">
            <p>Age: </p>
            <p>{test?.patient?.age}years</p>
          </div>
          <div className="flex justify-between">
            <p>Sex: </p>
            <p>{test?.patient?.gender}</p>
          </div>
        </div>
      </div>
      <h1 className="text-3xl text-center mb-4 border w-fit mx-auto px-2 py-1 italic font-semibold">
        {test?.category?.name}
      </h1>
      {test?.category?.type === "main" && !test.file_url ?
        (<div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th className="text-sm py-2">Test</th>
                <th className="text-sm py-2">Result</th>
                <th className="text-sm py-2">Normal Value</th>
              </tr>
            </thead>
            <tbody>
              {test?.results?.map((test) => (
                <tr key={test?._id}>
                  <td className="py-2">{test?.test?.name}</td>
                  <td className="text-center py-2">
                    {test?.result || "Not Available Yet"}
                  </td>
                  <td className="text-center py-2">
                    {test?.test?.normalValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : 
      (<iframe
        className="mx-auto rounded-lg"
        src={test.file_url}
        width="80%"
        height={window.innerHeight}
      />)
      }
      {test?.category?.type === "main" && !test.file_url && (
        <p className="text-center">
          File not available yet. Please check back later.
        </p>
      )}
      <NavLink to={`/test/${testId}`}>
        <button className="btn btn-sm bg-tahiti-primary border-0 block mx-auto mt-4">
          Update
        </button>
      </NavLink>
    </div>
  );
};

export default TestDetails;

/**
 * <div className="md:grid grid-cols-2 mx-20 items-center">
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
              height="650px"
            />
          )}
        </div>
      </div>
 */
