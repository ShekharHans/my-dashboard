import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-12 h-12 border-2 border-red-600 rounded-full loader"></div>
        </div>
    );
};

export default Loader;
