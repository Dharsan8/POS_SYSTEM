// components/ui/card.jsx
import React from 'react';

export const Card = ({ children }) => {
  return <div className="bg-white rounded-2xl shadow-md p-4">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="p-2">{children}</div>;
};
