import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import {FaPlus} from 'react-icons/fa'
import { useReducer } from "react";
import Spinner from "../../../Shared/Spinner";

const initialState = {
  // payments: [],
  tests: [],
  total: 0,
  // grandTotal: 0,
  // discount: 0,
  // tax: 0,
  loading: null,
  // creating: null,
  mainCategories: [],
  subCategories: [],
  subCatLoading: null,
  patient: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_SUB_CAT_LOADING":
      return {
        ...state,
        subCatLoading: action.payload,
      };
    case "SET_MAIN_CATEGORIES":
      return {
        ...state,
        mainCategories: action.payload,
      };
    case "SET_SUB_CATEGORIES":
      return {
        ...state,
        subCategories: action.payload,
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "ADD_TEST": {
      const test = state.subCategories.find((c) => c._id === action.payload);
      return {
        ...state,
        tests: [...state.tests, test],
        total: state.total + test.charge,
        subCategories: state.subCategories.filter(
          (c) => c._id !== action.payload
        ),
      };
    }
    // case "DELETE_OPTION": {
    //   const test = state.selectedOptions.find(
    //     (c) => c._id === action.payload
    //   );
    //   return {
    //     ...state,
    //     total: state.total - test.amount,
    //     selectedOptions: state.selectedOptions.filter(
    //       (test) => test._id !== action.payload
    //     ),
    //     payments: state.payments.filter((p) => p !== action.payload),
    //     subCategories: [...state.subCategories, test],
    //     grandTotal: state.payments.length === 1 ? 0 : state.grandTotal,
    //   };
    // }
    // case "SET_TAX": {
    //   const newTax = Number(action.payload.value);
    //   if (newTax > 100) {
    //     toast.error("Tax can't be more than 100%");
    //     action.payload.value = 0;
    //     return state;
    //   }
    //   if (newTax < 0) {
    //     toast.error("Tax can't be less than 0%");
    //     action.payload.value = 0;
    //     return state;
    //   }
    //   return {
    //     ...state,
    //     tax: newTax,
    //   };
    // }
    // case "SET_DISCOUNT": {
    //   const newDiscount = Number(action.payload.value);
    //   if (newDiscount > 100) {
    //     toast.error("Discount can't be more than 100%");
    //     action.payload.value = 0;
    //     return state;
    //   }
    //   if (newDiscount < 0) {
    //     toast.error("Discount can't be less than 0%");
    //     action.payload.value = 0;
    //     return state;
    //   }
    //   return {
    //     ...state,
    //     discount: newDiscount,
    //   };
    // }
    // case "updateGrandTotal": {
    //   const tempTotal = state.total + state.total * (state.tax / 100);
    //   const grandTotal = Math.round(
    //     tempTotal - tempTotal * (state.discount / 100)
    //   );
    //   return {
    //     ...state,
    //     grandTotal,
    //   };
    // }
    // case "CREATING_INVOICE": {
    //   return {
    //     ...state,
    //     creating: action.payload,
    //   };
    // }
    default:
      return state;
  }
}

const CreateInvoice = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { patientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getTestCategories = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(
        "http://localhost:5000/api/v1/category/all",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
        }
      );
      const data = await response.json();
      dispatch({ type: "SET_MAIN_CATEGORIES", payload: data?.data });
      dispatch({ type: "SET_LOADING", payload: false });
    };
    getTestCategories();
  }, []);

  useEffect(() => {
    const getPatientData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(
        `http://localhost:5000/api/v1/patient/${patientId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
        }
      );
      const data = await response.json();
      dispatch({ type: "SET_PATIENT", payload: data?.data });
      dispatch({ type: "SET_LOADING", payload: false });
    };
    getPatientData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "CREATING_INVOICE", payload: true });

    const data = {
      payments: state.payments,
      sub_total: state.total,
      discount: state.discount,
      tax: state.tax,
      grand_total: state.grandTotal,
    };

    fetch(`http://localhost:5000/api/v1/invoice/create/${patientId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch({ type: "CREATING_INVOICE", payload: false });
        if (result.status === "success") {
          toast.success(result.message);
          navigate("/allinvoice");
        } else {
          toast.error(result.error);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const fetchSubCategories = async (id) => {
    dispatch({ type: "SET_SUB_CATEGORIES", payload: [] });
    dispatch({ type: "SET_SUB_CAT_LOADING", payload: true });
    const response = await fetch(
      `http://localhost:5000/api/v1/category/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        },
      }
    );
    const data = await response.json();
    dispatch({
      type: "SET_SUB_CATEGORIES",
      payload: data?.data?.subCategories,
    });
    dispatch({ type: "SET_SUB_CAT_LOADING", payload: false });
  };

  if (state.loading) return <Spinner></Spinner>;

  console.log(state.patient);

  return (
    <div className="bg-tahiti-white m-10 shadow-lg rounded-md">
      <h1 className=" text-tahiti-lightGreen font-bold text-center text-3xl py-4">
        Create Invoice
      </h1>
      <div className="grid grid-cols-2 gap-x-4 px-12">
        <div className="grid grid-cols-2 gap-x-4">
          <p>Name: </p>
          <p>{state.patient.name}</p>
          <p>Phone:</p>
          <p>{state.patient.phone}</p>
          <p>Id:</p>
          <p>{state.patient.serialId}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-12">
            <select
              className="rounded-l-lg border col-span-10 bg-tahiti-primary text-tahiti-white rounded-r-none select select-sm focus:outline-none">
              <option disabled selected>
                Referred By
              </option>
              <option>
                Referred By
              </option>
            </select>
            <button className="btn btn-sm col-span-2 bg-tahiti-lightGreen border-r-0 border-t-0 border-b-0 rounded-l-none">
              <FaPlus></FaPlus>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="col-span-2 lg:col-span-1">
          <fieldset className="px-12 py-10">
            <div className="mb-4">
              <p className="text-lg font-medium">Test</p>
              <div className="grid grid-cols-2 gap-4 w-full">
                <select
                  onChange={(event) => {
                    const options = event.target.options;
                    for (let i = 0; i < options.length; i++) {
                      if (options[i].selected) {
                        fetchSubCategories(options[i].value);
                      }
                    }
                  }}
                  type="text"
                  className="select w-full bg-tahiti-primary focus:outline-none font-bold text-tahiti-white select-sm"
                >
                  <option selected>Select</option>
                  {state.mainCategories.map((category) => (
                    <option value={category?._id} key={category._id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
                {state.subCatLoading ? (
                  <button className="bg-tahiti-green focus:outline-none font-bold w-full btn btn-sm border-none">
                    <img
                      className="w-5 animate-spin"
                      src="/assets/loading.png"
                      alt="Loading"
                    />
                  </button>
                ) : (
                  <select
                    onChange={(event) => {
                      const options = event.target.options;
                      for (let i = 0; i < options.length; i++) {
                        if (options[i].selected) {
                          dispatch({
                            type: "ADD_TEST",
                            payload: options[i].value,
                          });
                        }
                      }
                    }}
                    type="text"
                    className={` ${
                      state.subCategories.length > 0
                        ? "bg-tahiti-primary"
                        : "bg-tahiti-green select-disabled "
                    } focus:outline-none font-bold w-full text-tahiti-white select select-sm`}
                  >
                    <option selected>Select</option>
                    {state.subCategories.map((category) => (
                      <option value={category?._id} key={category._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">Bedding</p>
              <div className="grid grid-cols-2 gap-4">
                <select
                  onChange={(event) => {
                    // const options = event.target.options;
                    // for (let i = 0; i < options.length; i++) {
                    //   if (options[i].selected) {
                    //     dispatch({
                    //       type: "ADD_OPTION",
                    //       payload: options[i].value,
                    //     });
                    //   }
                    // }
                  }}
                  type="text"
                  className={` ${
                    state.subCategories.length > 0
                      ? "bg-tahiti-primary"
                      : "bg-tahiti-green select-disabled "
                  } focus:outline-none font-bold w-full text-tahiti-white select select-sm`}
                >
                  <option selected>Select</option>
                  {state.subCategories.map((category) => (
                    <option value={category?._id} key={category._id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
                <div className="flex w-full">
                  <input
                    type="text"
                    className="rounded-l-lg w-full border focus:outline-none border-r-0"
                  />
                  <button className="btn btn-sm bg-tahiti-primary border-l-0 rounded-l-none">
                    <BiCheck className="text-xl"></BiCheck>
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="col-span-2 lg:col-span-1 pr-12 pb-10">
          <div className="overflow-x-auto mx-auto border border-tahiti-primary rounded-md mt-16">
            <table className="table w-full bg-tahiti-white">
              <thead>
                <tr>
                  <th className="p-2 text-xs">Name</th>
                  <th className="text-center p-2 text-xs">Amount</th>
                  <th className="text-center p-2 text-xs">PC Rate</th>
                  <th className="text-center p-2 text-xs">PC Commission</th>
                  <th className="text-center p-2 text-xs">Remove</th>
                </tr>
              </thead>
              <tbody>
                {state.tests?.length > 0 ? (
                  state.tests.map((category) => (
                    <tr key={category._id}>
                      <td className=" p-2 text-xs">{category?.name}</td>
                      <td className="text-center p-2 text-xs">
                        {category?.charge}৳
                      </td>
                      <td className="text-center p-2 text-xs">
                        {category?.pcRate}%
                      </td>
                      <td className="text-center p-2 text-xs">
                        {category?.charge * (category?.pcRate / 100)}৳
                      </td>
                      <td className="p-2 text-xs">
                        <FaTrash
                          onClick={() =>
                            dispatch({
                              type: "DELETE_OPTION",
                              payload: category._id,
                            })
                          }
                          className="text-tahiti-red cursor-pointer mx-auto"
                        ></FaTrash>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="text-center p-2 text-xs">Add payments...</td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
