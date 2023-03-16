import React from 'react';

const Spinner = () => {
    return (
        <div>
            <div className="flex mt-96 items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-tahiti-darkGreen"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-tahiti-darkGreen"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-tahiti-darkGreen"></div>
            </div>
        </div>
    );
};

export default Spinner;