import { Link } from "react-router-dom";
import SubCatRow from "./SubCatRow";

const SubCategories = ({ expense, setRefetch, refetch }) => {
  if (expense.subCategories.length === 0)
    return (
      <div className="py-10">
        <h1 className="text-3xl font-medium text-tahiti-red ">
          No Sub Categories Found
        </h1>
        <Link to={`/subCategory/new/${expense._id}`}>
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
              <th>Sl</th>
              <th>Name</th>
              <th className="text-center">Details</th>
              <th className="text-center">Update</th>
              <th className="text-center">Delete</th>
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
