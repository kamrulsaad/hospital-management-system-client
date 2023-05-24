import { Link } from "react-router-dom";
import formatDate from "../../../../utils/formatDate";
import { BsCheckLg } from "react-icons/bs";

const Invoices = ({ expense }) => {
  console.log(expense);

  if (expense?.invoices?.length === 0)
    return (
      <h1 className="py-10 text-3xl font-medium text-tahiti-red ">
        No Invoices Found for PC
      </h1>
    );

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold">
        Invoices: {expense?.invoices?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm bg-tahiti-white mt-2">
          <thead>
            <tr>
              <th>Invoice Id</th>
              <th>Patient</th>
              <th>Tests</th>
              <th>Created</th>
              <th>Status</th>
              <th className="text-right">Details</th>
            </tr>
          </thead>
          <tbody>
            {expense?.invoices.map((category, i) => (
              <tr key={category?._id}>
                <td className=" py-2">{category?.invoice?.serialId}</td>
                <td className=" py-2">{category?.invoice?.patient?.name}</td>
                <td className=" py-2">{category?.invoice?.tests?.length}</td>
                <td className=" py-2">
                  {formatDate(category?.invoice?.createdAt)}
                </td>
                <td className=" py-2">{category?.paid ? "Paid" : "Unpaid"}</td>
                <td className="text-right py-2">
                  <button className="btn btn-xs">
                    <Link to={`/pc/invoice/${category._id}`}>Details</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
