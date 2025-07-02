
import React, { useState, useEffect } from 'react';
import { DocSection as DocSectionType } from '@/data/documentationData';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DocSectionProps {
  section: DocSectionType;
  level?: number;
}

const DocSection: React.FC<DocSectionProps> = ({ section, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const [content, setContent] = useState<string>(section.content);

  // Simulate lazy loading of content
  useEffect(() => {
    if (isExpanded && section.content === "Installation content will be loaded here...") {
      // Here you would typically fetch the actual content
      setTimeout(() => {
        setContent(`# ${section.title}\n\n${section.description}\n\nDetailed content for ${section.title} would be loaded here...`);
      }, 100);
    }
  }, [isExpanded, section]);

  const hasSubsections = section.subsections && section.subsections.length > 0;

  return (
    <div className="border-l-2 border-gray-200 pl-4 mb-6">
      <div 
        className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {hasSubsections && (
          isExpanded ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />
        )}
        <h3 className={`font-semibold ${level === 0 ? 'text-xl' : 'text-lg'}`}>
          {section.title}
        </h3>
      </div>
      
      {section.description && (
        <p className="text-gray-600 mb-2 ml-6">{section.description}</p>
      )}

      {isExpanded && (
        <div className="ml-6">
          <div className="prose max-w-none mb-4">
            <pre className="whitespace-pre-wrap text-sm">{content}</pre>
          </div>
          
          {hasSubsections && (
            <div className="ml-4">
              {section.subsections!.map((subsection) => (
                <DocSection key={subsection.id} section={subsection} level={level + 1} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocSection;
