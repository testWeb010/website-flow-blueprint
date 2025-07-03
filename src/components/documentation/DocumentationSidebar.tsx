
import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { DocCategory } from '@/hooks/useDocumentation';

interface DocumentationSidebarProps {
  categories: DocCategory[] | undefined;
  categoriesLoading: boolean;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onClose: () => void;
}

const DocumentationSidebar: React.FC<DocumentationSidebarProps> = ({
  categories,
  categoriesLoading,
  activeSection,
  onSectionClick,
  onClose
}) => {
  return (
    <div className="w-64 bg-gray-50 h-full overflow-y-auto border-r">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Documentation</h2>
        
        {categoriesLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ) : (
          categories?.map((category) => (
            <div key={category.id} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {category.icon && <span className="mr-2">{category.icon}</span>}
                {category.title}
              </h3>
              
              <ul className="space-y-1">
                {category.sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        onSectionClick(section.id);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors ${
                        activeSection === section.id ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentationSidebar;
