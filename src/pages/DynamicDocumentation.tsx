
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Documentation</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed top-20 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
          >
            ☰
          </button>
        </div>

        {/* Sidebar */}
        <div className={`fixed lg:relative lg:block ${isSidebarOpen ? 'block' : 'hidden'} z-40`}>
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
                              setActiveSection(section.id);
                              setIsSidebarOpen(false);
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
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {sectionLoading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
              </div>
            ) : sectionError ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Content</h2>
                <p className="text-gray-600">Failed to load section content. Please try again.</p>
              </div>
            ) : sectionData ? (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded">
                  {sectionData.content}
                </pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to Flow Documentation</h1>
                <p className="text-xl text-gray-600">
                  Select a topic from the sidebar to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DynamicDocumentation;
