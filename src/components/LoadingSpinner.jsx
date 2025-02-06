import React from 'react';

const LoadingSpinner = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-16 w-16"
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
      <p className="mt-2 text-gray-300 text-sm">Chargement...</p>
    </div>
  );
};

export default LoadingSpinner;
