import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  // console.log(error);
  // For Error Functionality
  // const [loginResult, setLoginResult] = useState({});
  // console.log(loginResult.error.keyPattern);

  const handleSubmit = (event) => {
    // Getting From Data
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phone = form.phone.value;
    const role = form.role.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      setError("Password didn't match");
      return;
    }
    const signUpData = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      role: role,
      email: email,
      password: password,
    };
    console.log(signUpData);

    // login send to backend
    fetch("https://hms.uniech.com/api/v1/user/signup", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success(`User Added Successful`);
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="lg:p-20 ">
      <section className="p-6 flex flex-col items-center bg-tahiti-white shadow-xl rounded-xl">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold pb-10">
            <span className="text-tahiti-primary">UNIECH</span>
            <span className="text-tahiti-dark"> HMS</span>{" "}
          </h1>
          <p className="text-xl font-semibold">
            {" "}
            <span className="text-tahiti-dark">Register  </span>{" "}
            <span className="text-tahiti-primary">New User</span>{" "}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="container flex items-center flex-col space-y-12 p px-20"
        >
          <fieldset className="grid gap-6 p-6 pb-0 rounded-md  ">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3  ">
              <div className="col-span-full sm:col-span-3">
                <label
                  for="firstName"
                  className="text-stext-md font-semibold text-tahiti-lightGreen"
                >
                  First name
                </label>
                <input
                  name="firstName"
                  type="text"
                  placeholder=""
                  className="w-full focus:outline-none"
                />
                <hr className="text-tahiti-lightGreen" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  for="lastName"
                  className="text-md font-semibold text-tahiti-lightGreen"
                >
                  Last name
                </label>
                <input
                  name="lastName"
                  type="text"
                  placeholder=""
                  className="w-full focus:outline-none"
                />
                <hr className="text-tahiti-lightGreen" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  for="email"
                  className="text-md font-semibold text-tahiti-lightGreen"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder=""
                  className="w-full focus:outline-none"
                />
                <hr className="text-tahiti-lightGreen" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  for="password"
                  className="text-md font-semibold text-tahiti-lightGreen"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder=""
                  className="w-full focus:outline-none"
                />
                <hr className="text-tahiti-lightGreen" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  for="confirmPassword"
                  className="text-md font-semibold text-tahiti-lightGreen"
                >
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder=""
                  className="w-full focus:outline-none"
                />
                <hr className="text-tahiti-lightGreen" />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label
                  for="phone"
                  className="text-md font-semibold text-tahiti-lightGreen"
                >
                  Phone
                </label>
                <input
                  name="phone"
                  type="phone"
                  placeholder=""
                  className="w-full focus:outline-none"
                />
                <hr className="text-tahiti-lightGreen" />
              </div>
            </div>
            <select
              type="role"
              name="role"
              id="role"
              className="select bg-tahiti-primary font-bold w-full text-tahiti-white"
            >
              <option disabled selected>
                Choose Role
              </option>
              <option className="font-bold ">admin</option>
              <option className="font-bold ">doctor</option>
              <option className="font-bold ">receptionist</option>
              <option className="font-bold ">accountant</option>
            </select>

            <p className="text-tahiti-red text-2xl">{error}</p>
          </fieldset>
          <div className="space-y-2 pb-10 flex justify-center">
            <button
              type="submit"
              className="w-60  px-8 py-3 font-semibold rounded-md bg-tahiti-darkGreen text-tahiti-white "
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;
