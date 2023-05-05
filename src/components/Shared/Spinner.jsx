import React from "react";

const Spinner = ({bg}) => {
  return (
    <div className={`flex mt-10 min-h-[calc(100vh-200px)] items-center justify-center space-x-2 ${bg && "bg-tahiti-white"}`}>
      <img src="/assets/preloader.gif" alt="Preloader" />
    </div>
  );
};

export default Spinner;
