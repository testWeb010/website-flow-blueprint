
import React from 'react';

interface DocumentationContentProps {
  sectionData: { id: string; content: string } | undefined;
  sectionLoading: boolean;
  sectionError: Error | null;
}

const DocumentationContent: React.FC<DocumentationContentProps> = ({
  sectionData,
  sectionLoading,
  sectionError
}) => {
  if (sectionLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (sectionError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Content</h2>
        <p className="text-gray-600">Failed to load section content. Please try again.</p>
      </div>
    );
  }

  if (sectionData) {
    return (
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded">
          {sectionData.content}
        </pre>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to Flow Documentation</h1>
      <p className="text-xl text-gray-600">
        Select a topic from the sidebar to get started
      </p>
    </div>
  );
};

export default DocumentationContent;
