
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocumentationSidebar from '@/components/documentation/DocumentationSidebar';
import DocumentationContent from '@/components/documentation/DocumentationContent';
import MobileSidebarToggle from '@/components/documentation/MobileSidebarToggle';
import DocumentationError from '@/components/documentation/DocumentationError';
import { useDocumentationCategories, useDocumentationSection } from '@/hooks/useDocumentation';

const DynamicDocumentation = () => {
  const [activeSection, setActiveSection] = useState<string>('installation');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useDocumentationCategories();
  
  const { 
    data: sectionData, 
    isLoading: sectionLoading, 
    error: sectionError 
  } = useDocumentationSection(activeSection);

  if (categoriesError) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <DocumentationError />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex">
        <MobileSidebarToggle 
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Sidebar */}
        <div className={`fixed lg:relative lg:block ${isSidebarOpen ? 'block' : 'hidden'} z-40`}>
          <DocumentationSidebar
            categories={categories}
            categoriesLoading={categoriesLoading}
            activeSection={activeSection}
            onSectionClick={setActiveSection}
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <DocumentationContent
              sectionData={sectionData}
              sectionLoading={sectionLoading}
              sectionError={sectionError}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DynamicDocumentation;
