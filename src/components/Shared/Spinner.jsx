import React from "react";

const Spinner = () => {
  return (
    <div className="flex mt-20 min-h-[calc(100vh-200px)] items-center justify-center space-x-2 animate-bounce">
      <div className="w-8 h-8 bg-tahiti-lightGreen rounded-full"></div>
      <div className="w-8 h-8 bg-tahiti-darkGreen rounded-full"></div>
      <div className="w-8 h-8 bg-tahiti-cyan rounded-full"></div>
    </div>
  );
};

export default Spinner;
