import React from "react";

const FileTestDetails = ({ test }) => {
  if (!test?.file_url)
    return (
      <p className="text-center">Not available yet. Please check back later.</p>
    );

  return (
    <iframe
      className="mx-auto rounded-lg"
      src={test.file_url}
      width="80%"
      height={window.innerHeight - 200}
    />
  );
};

export default FileTestDetails;
