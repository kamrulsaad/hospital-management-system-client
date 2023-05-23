import React from "react";

const MainTestDetails = ({ test }) => {
  if (test?.file_url)
    return (
      <iframe
        className="mx-auto rounded-lg"
        src={test.file_url}
        width="80%"
        height={window.innerHeight - 200}
      />
    );

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="text-center">
            <th className="text-sm py-2">Test</th>
            <th className="text-sm py-2">Result</th>
            <th className="text-sm py-2">Normal Value</th>
          </tr>
        </thead>
        <tbody>
          {test?.results?.map((test) => (
            <tr key={test?._id}>
              <td className="py-2">{test?.test?.name}</td>
              <td className="text-center py-2">
                {test?.result || "Not Available Yet"}
              </td>
              <td className="text-center py-2">{test?.test?.normalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTestDetails;
