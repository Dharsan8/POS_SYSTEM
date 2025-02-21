// components/ui/input.jsx
import React from 'react';

export const Input = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};
