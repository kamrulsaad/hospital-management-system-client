import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center bg-tahiti-white'>
           <img src="https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Page-with-SVG.png" alt="" />
           <Link to="/"><button className='btn btn-ghost mb-5 text-xl'>Back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;