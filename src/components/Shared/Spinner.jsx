import React from "react";

const Spinner = () => {
  return (
    <div className="flex mt-20 min-h-[calc(100vh-200px)] items-center justify-center space-x-2 ">
      {/* <div className="w-8 h-8 bg-tahiti-lightGreen rounded-full"></div>
      <div className="w-8 h-8 bg-tahiti-darkGreen rounded-full"></div>
      <div className="w-8 h-8 bg-tahiti-cyan rounded-full"></div> */}

      <div className="flex items-center justify-center">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-tahiti-primary border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
