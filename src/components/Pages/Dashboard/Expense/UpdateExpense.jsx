import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Spinner from "../../../Shared/Spinner";

const UpdateExpense = ({amount}) => {
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(null);

  const handleSubmit = (event) => {
    setCreating(true);
    event.preventDefault();
    const form = event.target;
    const category = form.category.value;
    const amount = form.amount.value;
    const description = form.description.value;

    const createInvoiceCategoryData = {
      category,
      amount,
      description,
    };

    fetch(`http://localhost:5000/api/v1/expense/create`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
      },
      body: JSON.stringify(createInvoiceCategoryData),
    })
      .then((res) => res.json())
      .then((result) => {
        setCreating(false);
        if (result.status === "success") {
          toast.success(result.message);
        } else {
          toast.error(result.error);
        }
        form.reset();
      })
      .catch((error) => {
        setCreating(false);
        toast.error(error);
      });
  };

  return (
    <form>
      
    </form>
  );
};

export default UpdateExpense;
