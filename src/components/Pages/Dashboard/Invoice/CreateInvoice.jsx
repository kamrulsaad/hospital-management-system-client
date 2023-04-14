import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const CreateInvoice = () => {
  const [payments, setPayments] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [tempTotal ,setTempTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState({});
  const [categoriesData, setCategoriData] = useState([]);
  const { patientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
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
      setLoading(false);
      setCategoriData(data?.data);
    };
    fetchUserData();
  }, []);

  const addOptions = (event) => {
    const options = event.target.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        const option = categoriesData.find((c) => c._id === options[i].value);
        setSelectedOptions([...selectedOptions, option]);
        setPayments([...payments, options[i].value]);
        setTotal((previosState) => previosState + option.amount);
        setGrandTotal((previosState) => previosState + option.amount);
        setCategoriData(
          categoriesData.filter((c) => c._id !== options[i].value)
        );
      }
    }
  };

  const handleDelete = (id) => {
    const option = selectedOptions.find((c) => c._id === id);
    setTotal((previosState) => previosState - option.amount);
    setGrandTotal((previosState) => previosState - option.amount);
    setSelectedOptions(selectedOptions.filter((option) => option._id !== id));
    setPayments(payments.filter((p) => p !== id));
    setCategoriData([...categoriesData, option]);
  };

  const handleDiscount = (event) => {
    const discount = Number(event.target.value);
    discount > 100 && toast.error("Discount can't be more than 100%");
    discount < 0 && toast.error("Discount can't be less than 0%");
    setGrandTotal(tempTotal - tempTotal * (discount / 100));
  };

  const handleTax = (event) => {
    const tax = Number(event.target.value);
    tax > 100 && toast.error("Tax can't be more than 100%");
    tax < 0 && toast.error("Tax can't be less than 0%");
    setGrandTotal(total + total * (tax / 100));
    setTempTotal(total + total * (tax / 100));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    console.log(payments);

    fetch(
      `https://hms-server.onrender.com/api/v1/invoice/create/${patientId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
        },
        body: JSON.stringify(),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
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
              onChange={addOptions}
              type="text"
              name="name"
              id="gender"
              className="select mt-1 bg-tahiti-primary col-span-full sm:col-span-3 text-lg focus:outline-none font-bold w-full text-tahiti-white"
            >
              <option selected>Select</option>
              {categoriesData.map((category) => (
                <option value={category?._id} key={category._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          {selectedOptions?.length > 0 && (
            <div className="overflow-x-auto w-3/4 mx-auto border rounded-md mt-20">
              <table className="table w-full bg-tahiti-white">
                <thead>
                  <tr>
                    <th className="">Sl</th>
                    <th>Name</th>
                    <th className="text-center">Amount</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOptions.map((category, i) => (
                    <tr key={category._id}>
                      <th>{i + 1}</th>
                      <td>{category?.name}</td>
                      <td className="text-center">{category?.amount}৳</td>
                      <td>
                        <FaTrash
                          onClick={() => handleDelete(category?._id)}
                          className="text-tahiti-red cursor-pointer mx-auto text-xl"
                        ></FaTrash>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="bg-tahiti-lightBlue"></td>
                    <th className="bg-tahiti-lightBlue">Sub-Total</th>
                    <td className="text-center bg-tahiti-lightBlue font-bold">
                      {total}৳
                    </td>
                    <td className="bg-tahiti-lightBlue"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {total > 0 && (
            <div className="col-span-full w-1/2 mt-6 mx-auto sm:col-span-3 flex items-center gap-2 ">
              <p className="text-xl w-1/4 font-medium">Tax: </p>
              <input
                type="number"
                className="w-3/4 rounded-md border p-1 "
                onChange={handleTax}
              />
            </div>
          )}

          {total > 0 && (
            <div className="col-span-full w-1/2 mt-6 mx-auto sm:col-span-3 flex items-center gap-2 ">
              <p className="text-xl w-1/4 font-medium">Discount: </p>
              <input
                type="number"
                className="w-3/4 rounded-md border p-1 "
                onChange={handleDiscount}
              />
            </div>
          )}

          {grandTotal > 0 && (
            <div className="col-span-full w-1/2 mt-6 mx-auto sm:col-span-3 flex items-center gap-2 ">
              <p className="text-2xl w-1/2 font-bold">Grand-Total: </p>
              <p className="w-1/2 text-3xl text-end font-bold">{parseFloat(grandTotal.toFixed(2))}৳</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className=" block mx-auto p-2 px-4 mt-20 font-semibold bg-tahiti-darkGreen text-tahiti-white rounded-md hover:bg-tahiti-lightGreen"
            >
              {loading ? (
                <img
                  src="/assets/loading.png"
                  className="w-6 mx-auto animate-spin"
                  alt=""
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateInvoice;
