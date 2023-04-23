import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../../Shared/Spinner";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const ExpenseDetails = () => {
  const [expense, setExpense] = useState({});
  const [loading, setLoading] = useState(true);

  const { expenseId } = useParams();

  useEffect(() => {
    const fetchExpense = async () => {
      const response = await fetch(
        `http://localhost:5000/api/v1/expense/${expenseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("LoginToken")}`,
          },
        }
      );
      const data = await response.json();
      setExpense(data?.data);
      setLoading(false);
    };
    fetchExpense();
  }, [expenseId]);

  if (loading) return <Spinner />;

  return (
    <div className="p-10">
      <div class="container flex flex-col mx-auto ">
        <h1 className="text-3xl font-semibold text-tahiti-primary mb-8">
          Expense Details
        </h1>
        <div className=" flex w-1/2 mb-2">
          <p className="text-xl font-medium w-1/4">Id: </p>
          <p className="text-xl font-bold text-tahiti-mainBlue">
            {expense?.serialId}
          </p>
        </div>
        <div className=" flex w-1/2 mb-2">
          <p className="text-xl font-medium w-1/4">Category: </p>
          <p className="text-xl font-bold">{expense?.category?.name}</p>
        </div>
        <div className="flex w-1/2 mb-2 items-center">
          <p className="text-xl font-medium w-1/4">Amount: </p>
          <p className="text-xl font-bold">{expense?.amount}</p>
        </div>
        <div className=" flex w-1/2 mb-2">
          <p className="text-xl font-medium w-1/4">Description:</p>
          <p className="text-xl font-bold">{expense?.description || "N/A"}</p>
        </div>
      </div>
      <Link to="/expense/all">
        <p className="flex gap-2 mt-10 items-center hover:text-tahiti-primary transition-colors">
          <BsFillArrowLeftCircleFill className="scale-125"></BsFillArrowLeftCircleFill>
          Go Back
        </p>
      </Link>
    </div>
  );
};

export default ExpenseDetails;
