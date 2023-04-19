import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useReducer } from "react";
import Spinner from "../../../Shared/Spinner";

const initialState = {
  payments: [],
  selectedOptions: [],
  total: 0,
  grandTotal: 0,
  discount: 0,
  tax: 0,
  loading: null,
  creating: null,
  categoriesData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_CATEGORIES_DATA":
      return {
        ...state,
        categoriesData: action.payload,
      };
    case "ADD_OPTION": {
      const option = state.categoriesData.find((c) => c._id === action.payload);
      return {
        ...state,
        selectedOptions: [...state.selectedOptions, option],
        payments: [...state.payments, action.payload],
        total: state.total + option.amount,
        categoriesData: state.categoriesData.filter(
          (c) => c._id !== action.payload
        ),
      };
    }
    case "DELETE_OPTION": {
      const option = state.selectedOptions.find(
        (c) => c._id === action.payload
      );
      return {
        ...state,
        total: state.total - option.amount,
        selectedOptions: state.selectedOptions.filter(
          (option) => option._id !== action.payload
        ),
        payments: state.payments.filter((p) => p !== action.payload),
        categoriesData: [...state.categoriesData, option],
        grandTotal: state.payments.length === 1 ? 0 : state.grandTotal,
      };
    }
    case "SET_TAX": {
      const newTax = Number(action.payload.value);
      if (newTax > 100) {
        toast.error("Tax can't be more than 100%");
        action.payload.value = 0;
        return state;
      }
      if (newTax < 0) {
        toast.error("Tax can't be less than 0%");
        action.payload.value = 0;
        return state;
      }
      return {
        ...state,
        tax: newTax,
      };
    }
    case "SET_DISCOUNT": {
      const newDiscount = Number(action.payload.value);
      if (newDiscount > 100) {
        toast.error("Discount can't be more than 100%");
        action.payload.value = 0;
        return state;
      }
      if (newDiscount < 0) {
        toast.error("Discount can't be less than 0%");
        action.payload.value = 0;
        return state;
      }
      return {
        ...state,
        discount: newDiscount,
      };
    }
    case "updateGrandTotal": {
      const tempTotal = state.total + state.total * (state.tax / 100);
      const grandTotal = Math.round(tempTotal - tempTotal * (state.discount / 100));
      return {
        ...state,
        grandTotal,
      };
    }
    case "CREATING_INVOICE": {
      return {
        ...state,
        creating: action.payload,
      };
    }
    default:
      return state;
  }
}

const CreateInvoice = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { patientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch(
        "https://hms-server.onrender.com/api/v1/category/all",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
        }
      );
      const data = await response.json();
      dispatch({ type: "SET_CATEGORIES_DATA", payload: data?.data });
      dispatch({ type: "SET_LOADING", payload: false });
    };
    fetchUserData();
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
    }

    fetch(
      `https://hms-server.onrender.com/api/v1/invoice/create/${patientId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        },
        body: JSON.stringify(data),
      }
    )
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

  if (state.loading) return <Spinner></Spinner>;

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
          <div className="w-1/2 mx-auto">
            <label
              for="option"
              className="text-tahiti-lightGreen font-bold text-xl"
            >
              Options
            </label>
            <select
              onChange={(event) => {
                const options = event.target.options;
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    dispatch({ type: "ADD_OPTION", payload: options[i].value });
                  }
                }
              }}
              type="text"
              name="name"
              id="gender"
              className="select mt-1 bg-tahiti-primary col-span-full sm:col-span-3 text-lg focus:outline-none font-bold w-full text-tahiti-white"
            >
              <option selected>Select</option>
              {state.categoriesData.map((category) => (
                <option value={category?._id} key={category._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          {state.selectedOptions.length > 0 && (
            <div className="overflow-x-auto w-1/2 mx-auto border rounded-md mt-20">
              <table className="table w-full bg-tahiti-white">
                <thead>
                  <tr>
                    <th >Sl</th>
                    <th>Name</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {state.selectedOptions.map((category, i) => (
                    <tr key={category._id}>
                      <th>{i + 1}</th>
                      <td>{category?.name}</td>
                      <td className="text-center">{category?.amount}৳</td>
                      <td>
                        <FaTrash
                          onClick={() =>
                            dispatch({
                              type: "DELETE_OPTION",
                              payload: category._id,
                            })
                          }
                          className="text-tahiti-red cursor-pointer mx-auto text-xl"
                        ></FaTrash>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="bg-tahiti-lightBlue"></td>
                    <th className="bg-tahiti-lightBlue">Sub-Total</th>
                    <td className="text-center bg-tahiti-lightBlue font-bold">
                      {state.total}৳
                    </td>
                    <td className="bg-tahiti-lightBlue"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {state.total > 0 && (
            <div className="col-span-full w-1/2 mt-6 mx-auto sm:col-span-3 flex items-center gap-2 ">
              <p className="text-xl w-1/4 font-medium">Tax: </p>
              <input
                type="number"
                className="w-1/2 rounded-md border p-1 "
                onChange={(e) =>
                  dispatch({ type: "SET_TAX", payload: e.target })
                }
              />
              <p className="text-center w-1/4 font-extrabold">%</p>
            </div>
          )}

          {state.total > 0 && (
            <div className="col-span-full w-1/2 mt-6 mx-auto sm:col-span-3 flex items-center gap-2 ">
              <p className="text-xl w-1/4 font-medium">Discount: </p>
              <input
                type="number"
                className="w-1/2 rounded-md border p-1 "
                onChange={(e) =>
                  dispatch({ type: "SET_DISCOUNT", payload: e.target })
                }
              />
              <p className="text-center w-1/4 font-extrabold">%</p>
            </div>
          )}

          {state.total > 0 && (
            <p
              onClick={() => dispatch({ type: "updateGrandTotal" })}
              className="cursor-pointer text-center block mx-auto p-2 w-1/2 px-4 mt-6 font-semibold bg-tahiti-cyan text-tahiti-white rounded-md hover:bg-tahiti-lightGreen"
            >
              Confirm
            </p>
          )}

          {state.grandTotal > 0 && (
            <div className="col-span-full w-1/2 mt-6 mx-auto sm:col-span-3 flex items-center gap-2 ">
              <p className="text-3xl w-1/2 font-bold">Grand-Total: </p>
              <p className="w-1/2 text-3xl text-end font-bold">
                {state.grandTotal}৳
              </p>
            </div>
          )}

          {state.grandTotal > 0 && (
            <div>
              <button
                type="submit"
                className=" block mx-auto p-2 w-1/2 px-4 mt-6 font-semibold bg-tahiti-darkGreen text-tahiti-white rounded-md hover:bg-tahiti-lightGreen"
              >
                {state.creating ? (
                  <img
                    src="/assets/loading.png"
                    className="w-6 mx-auto animate-spin"
                    alt=""
                  />
                ) : (
                  "Create Invoice"
                )}
              </button>
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default CreateInvoice;
