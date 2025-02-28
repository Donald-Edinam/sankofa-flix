import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Loading movies...</p>
      </div>
    </div>
  );
};

export default Loader;