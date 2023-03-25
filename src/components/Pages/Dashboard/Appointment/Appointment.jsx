import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../Shared/Spinner";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(null);
  const [apptLoading, setApptLoading] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate()

  // fetch doctors data from backend
  useEffect(() => {
      const fetchUserData = async () => {
          setLoading(true);
          const response = await fetch(
              `https://hms.uniech.com/api/v1/user/all-doctors`,
              {
                  method: "GET",
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
                    },
                }
      );
      const data = await response.json();
      setDoctors(data.data);
      setLoading(false);
    };
    fetchUserData();
}, []);

const handleSubmit = (event) => {
    // Getting From Data
    event.preventDefault();
    setApptLoading(true);
    const form = event.target;
    const reason = form.reason.value;
    const appointed_to = form.appointed_to.value;
    const paymentCompleted = form.paymentCompleted.value;

    const appointmentData = { reason, appointed_to, paymentCompleted };

    // add appointment to the backend
    fetch(`https://hms.uniech.com/api/v1/appointment/add-appointment/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
      body: JSON.stringify(appointmentData),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "success") {
            toast.success("Appointment Added");
            navigate('/appointment')
        } else {
          toast.error(result.error);
        }
        form.reset();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="bg-tahiti-white m-20 shadow-lg rounded-md">
      <h1 className=" text-tahiti-lightGreen font-bold text-center  text-5xl pt-10">
        Appointment
      </h1>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        action=""
        className="container flex flex-col   mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
      >
        <fieldset className="lg:px-32 py-20">
          <div className="">
            <div className="mt-5">
              <label for="reason" className="text-tahiti-lightGreen font-bold text-xl">
                Reason
              </label>
              <input
                id="reason"
                type="reason"
                placeholder=""
                className="w-full focus:outline-none"
              />
              <hr className="text-tahiti-lightGreen" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-2">
              <select
                type="appointed_to"
                name="appointed_to"
                id="appointed_to"
                className="select text-lg focus:outline-none bg-tahiti-primary font-bold  text-tahiti-white"
              >
                <option disabled selected>
                  Appointed To
                </option>
                {doctors.map((doctor) => (
                  <option
                    className="font-bold "
                    key={doctor?._id}
                    value={doctor?._id}
                  >
                    {doctor?.firstName} {doctor?.lastName}
                  </option>
                ))}
              </select>

              <select
                type="paymentCompleted"
                name="paymentCompleted"
                id="paymentCompleted"
                className="select text-lg focus:outline-none bg-tahiti-primary font-bold  text-tahiti-white"
              >
                <option disabled selected>
                  Payment Status
                </option>
                <option className="font-bold" value={true}>YES</option>
                <option className="font-bold" value={false}>NO</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className=" block mx-auto p-2 px-4 mt-20 font-semibold bg-tahiti-darkGreen text-tahiti-white rounded-md hover:bg-tahiti-lightGreen"
              >
                {apptLoading ? <img src="/assets/loading.png" className="w-6 mx-20 animate-spin" alt="" /> : "Add Appointment"}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Appointment;
