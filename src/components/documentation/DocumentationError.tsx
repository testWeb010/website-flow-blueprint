
import React from 'react';

const DocumentationError: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Documentation</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    </div>
  );
};

export default DocumentationError;
