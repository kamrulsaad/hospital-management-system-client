import { Link } from "react-router-dom";
import TestNameRow from "./TestNameRow";

const TestNames = ({ expense, setRefetch, refetch }) => {
  if (expense.type !== "main") return;

  if (expense?.tests?.length === 0)
    return (
      <div className="py-10">
        <h1 className="text-3xl font-medium text-tahiti-red ">
          No Tests Found
        </h1>
        <Link to={`/testName/new/${expense._id}`}>
          <button className=" lg:my-5 font-semibold px-2 py-1 text-xs rounded-md bg-tahiti-darkGreen text-tahiti-white">
            Add New
          </button>
        </Link>
      </div>
    );

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold ">
        Test Names: {expense?.tests?.length}
      </h1>
      <Link to={`/testName/new/${expense._id}`}>
        <button className=" lg:my-5 font-semibold px-2 py-1 text-xs rounded-md bg-tahiti-darkGreen text-tahiti-white">
          Add New
        </button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm bg-tahiti-white">
          <thead>
            <tr>
              <th className=" py-2">Sl</th>
              <th className=" py-2">Name</th>
              <th className=" py-2">Normal Value</th>
              <th className="text-center py-2">Update</th>
              <th className="text-center py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {expense?.tests.map((category, i) => (
              <TestNameRow
                key={category._id}
                category={category}
                i={i}
                refetch={refetch}
                setRefetch={setRefetch}
              ></TestNameRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestNames;
