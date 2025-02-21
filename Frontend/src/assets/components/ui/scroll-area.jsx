// components/ui/scroll-area.jsx
import React from 'react';

export const ScrollArea = ({ children, className = '' }) => {
  return (
    <div className={`overflow-y-auto max-h-[80vh] pr-2 ${className}`}>
      {children}
    </div>
  );
};
