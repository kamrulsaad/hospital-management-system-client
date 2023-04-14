import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const CreateInvoice = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

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
        setCategoriData(categoriesData.filter((c) => c._id !== options[i].value));
      }
    }
  };

  const handleDelete = (id) => {
    const option = selectedOptions.find((c) => c._id === id);
    setSelectedOptions(selectedOptions.filter((option) => option._id !== id));
    setCategoriData([...categoriesData, option]);
  }

  const handleSubmit = (event) => {
    // Getting From Data
    event.preventDefault();

    setLoading(true);

    // add appointment to the backend
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
              Option
            </label>
            <select
              onChange={addOptions}
              type="name"
              name="text"
              id="gender"
              className="select mt-1 bg-tahiti-primary col-span-full sm:col-span-3 text-lg focus:outline-none font-bold w-full text-tahiti-white"
            >
              <option selected>
                select
              </option>
              {categoriesData.map((category) => (
                <option value={category?._id} key={category._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto w-3/4 mx-auto border rounded-md mt-20">
            <table className="table w-full bg-tahiti-white">
              <thead>
                <tr>
                  <th className="">Sl</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {selectedOptions.map((category, i) => (
                  <tr key={i}>
                  <th>{i + 1}</th>
                  <td className="text-center">{category?.name}</td>
                  <td className="text-center">{category?.amount}৳</td>
                  <td>
                    {/* {delLoading ? (
                      <img
                        className="w-6 animate-spin mx-auto"
                        src="assets/loading.png"
                        alt=""
                      />
                    ) : ( */}
                      <FaTrash
                        onClick={() => handleDelete(category?._id)}
                        className="text-tahiti-red cursor-pointer mx-auto text-xl"
                      ></FaTrash>
                    {/* )} */}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
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
