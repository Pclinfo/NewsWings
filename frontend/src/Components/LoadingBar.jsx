// components/LoadingBar.jsx
import React from 'react';

const LoadingBar = () => (
  <div className="w-full h-2 bg-gray-200 overflow-hidden rounded">
  <div  className="min-h-60 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
  <div  className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
    <div  className="flex justify-center">
      <div  className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
       
      </div>
    </div>
  </div>
</div>
  </div>
);

export default LoadingBar;
