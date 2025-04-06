// src/components/ui/Button.js
import React from 'react';

export const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
