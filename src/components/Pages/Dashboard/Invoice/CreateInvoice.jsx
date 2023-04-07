import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useUserData from "../../../Hooks/useUserData";

const CreateInvoice = ({ appointment, index }) => {
  const [loading, setLoading] = useState(null);
  const [payments, setPayments] = useState([]);
  const [amountErr, setAmountErr] = useState("");
  const { patientId } = useParams();
  const [user, role] = useUserData();

  const addOptions = () => {
    setAmountErr("");
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    if (!amount || !name) return setAmountErr("Please provide requied values");
    setPayments([...payments, { name, amount }]);
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
  };

  const handleSubmit = (event) => {
    // Getting From Data
    event.preventDefault();

    setLoading(true);

    // add appointment to the backend
    fetch(`https://hms-server.onrender.com/api/v1/invoice/create/${patientId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
      body: JSON.stringify(payments),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "success") {
          toast.success(result.message);
          navigate("/patient");
        } else {
          toast.error(result.error);
        }
        form.reset();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="bg-tahiti-white m-20 shadow-lg rounded-md">
      <h1 className=" text-tahiti-lightGreen font-bold text-center  text-5xl pt-10">
        Create Invoice
      </h1>
      <form
        onSubmit={handleSubmit}
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
      >
        <fieldset className="lg:px-32 py-20">
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  for="option"
                  className="text-tahiti-lightGreen font-bold text-xl"
                >
                  Option
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  className="w-full focus:outline-none"
                />
                <hr className="text-tahiti-lightGreen mt-2" />
              </div>
              <div>
                <label
                  for="amount"
                  className="text-tahiti-lightGreen font-bold text-xl"
                >
                  Amount
                </label>
                <div className="flex w-full">
                  <input
                    id="amount"
                    type="number"
                    placeholder=""
                    className="w-full focus:outline-none"
                  />
                  <p
                    onClick={addOptions}
                    className="btn btn-xs mb-2 bg-tahiti-darkGreen"
                  >
                    Add Payment
                  </p>
                </div>
                <hr className="text-tahiti-lightGreen" />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap mt-2">
              {payments.map((b, index) => (
                <div
                  key={index}
                  className="w-fit p-2 rounded-md mb-2 bg-tahiti-darkGreen text-tahiti-white"
                >
                  <p>
                    {b.name.slice(0, 15)}
                    {b.name.length > 15 && "..."}: {b.amount}TK
                    <span
                      onClick={() => {
                        const others = payments.filter(
                          (ben) => ben.name !== b.name
                        );
                        setPayments(others);
                      }}
                      className="cursor-pointer ml-2"
                    >
                      ✕
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div>
              <button
                type="submit"
                className=" block mx-auto p-2 px-4 mt-20 font-semibold bg-tahiti-darkGreen text-tahiti-white rounded-md hover:bg-tahiti-lightGreen"
              >
                {loading ? (
                  <img
                    src="/assets/loading.png"
                    className="w-6 mx-20 animate-spin"
                    alt=""
                  />
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateInvoice;
