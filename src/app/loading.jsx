import React from 'react';

const loading = () => {
    return (
        <div>
            <div className="flex min-h-[80vh] items-center justify-center">
                {/* Global loading */}
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600 "></div>
            </div>
        </div>
    );
};

export default loading;