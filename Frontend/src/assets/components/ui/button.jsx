// components/ui/button.jsx
import React from 'react';
import classNames from 'classnames';

export const Button = ({ variant = 'default', className = '', children, onClick }) => {
  const baseStyle = 'rounded-lg px-4 py-2 font-medium focus:outline-none';
  const variantStyle =
    variant === 'outline'
      ? 'border border-gray-300 text-gray-700 hover:bg-gray-100'
      : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <button
      className={classNames(baseStyle, variantStyle, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
