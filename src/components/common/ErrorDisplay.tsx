import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="max-w-md rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/20">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 dark:text-red-400" />
        <h3 className="mt-4 text-lg font-semibold text-red-800 dark:text-red-300">Something went wrong</h3>
        <p className="mt-2 text-sm text-red-700 dark:text-red-200">{message}</p>
        <button 
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;