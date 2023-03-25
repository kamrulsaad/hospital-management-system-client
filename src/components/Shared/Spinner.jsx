import React from "react";

const Spinner = () => {
  return (
    <div className="flex mt-20 min-h-[calc(100vh-200px)] items-center justify-center space-x-2">
      <img src="assets/preloader.gif" alt="Preloader" />
    </div>
  );
};

export default Spinner;
