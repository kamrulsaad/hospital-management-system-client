import { Link } from "react-router-dom";
import SubCatRow from "./SubCatRow";

const SubCategories = ({ expense, setRefetch, refetch }) => {
  if (expense?.subCategories.length === 0)
    return (
      <div className="py-10">
        <h1 className="text-3xl font-medium text-tahiti-red ">
          No Sub Categories Found
        </h1>
        <Link to={`/subCategory/new/${expense?._id}`}>
          <button className=" lg:my-5 font-semibold px-2 py-1 text-xs rounded-md bg-tahiti-darkGreen text-tahiti-white">
            Add New
          </button>
        </Link>
      </div>
    );

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold ">
        Sub Categories: {expense?.subCategories.length}
      </h1>
      <Link to={`/subCategory/new/${expense._id}`}>
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
              <th className=" py-2">Charge</th>
              <th className=" py-2">PC Rate</th>
              <th className=" py-2">Type</th>
              <th className=" py-2">Nature</th>
              <th className="text-center py-2">Details</th>
              <th className="text-center py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {expense?.subCategories.map((category, i) => (
              <SubCatRow
                key={category._id}
                category={category}
                i={i}
                refetch={refetch}
                setRefetch={setRefetch}
              ></SubCatRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategories;
