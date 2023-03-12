import React from 'react';

const Spinner = () => {
    return (
        <div>
            <div className="flex mt-96 items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse bg-base-300"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-base-300"></div>
                <div className="w-4 h-4 rounded-full animate-pulse bg-base-300"></div>
            </div>
        </div>
    );
};

export default Spinner;