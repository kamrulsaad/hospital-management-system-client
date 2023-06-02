import React from "react";

const DescDetails = ({ test }) => {
  if (test?.file_url)
    return (
      <iframe
        className="mx-auto rounded-lg"
        src={test.file_url}
        width="80%"
        height={window.innerHeight - 200}
      />
    );

  if (!test?.remarks && !test?.image_url)
    return (
      <p className="text-center">Not available yet. Please check back later.</p>
    );

  return (
    <div className=" flex border p-2 justify-between">
      <div
        className="w-2/3"
        dangerouslySetInnerHTML={{ __html: test?.remarks }}
      ></div>
      {test?.image_url && (
        <div>
          <img className="w-64" src={test?.image_url} alt="" />
        </div>
      )}
    </div>
  );
};

export default DescDetails;
