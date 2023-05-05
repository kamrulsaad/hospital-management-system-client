import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-68px)]">
      <img
        className="w-1/2"
        src="https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Page-with-SVG.png"
        alt=""
      />
      <Link to="/">
        <button className="btn btn-sm">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
