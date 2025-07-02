
import React from 'react';
import { DocCategory } from '@/data/documentationData';

interface DocSidebarProps {
  categories: DocCategory[];
  activeSection?: string;
  onSectionClick: (sectionId: string) => void;
}

const DocSidebar: React.FC<DocSidebarProps> = ({ categories, activeSection, onSectionClick }) => {
  return (
    <div className="w-64 bg-gray-50 h-full overflow-y-auto border-r">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Documentation</h2>
        
        {categories.map((category) => (
          <div key={category.id} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.title}
            </h3>
            
            <ul className="space-y-1">
              {category.sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => onSectionClick(section.id)}
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
        ))}
      </div>
    </div>
  );
};

export default DocSidebar;
