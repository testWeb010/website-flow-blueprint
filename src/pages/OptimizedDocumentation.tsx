
import React, { useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocSidebar from '@/components/documentation/DocSidebar';
import DocSection from '@/components/documentation/DocSection';
import { documentationCategories } from '@/data/documentationData';

const OptimizedDocumentation = () => {
  const [activeSection, setActiveSection] = useState('installation');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentSection = documentationCategories
    .flatMap(cat => cat.sections)
    .find(section => section.id === activeSection);

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
          <DocSidebar
            categories={documentationCategories}
            activeSection={activeSection}
            onSectionClick={(sectionId) => {
              setActiveSection(sectionId);
              setIsSidebarOpen(false);
            }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<div className="animate-pulse">Loading documentation...</div>}>
              {currentSection ? (
                <DocSection section={currentSection} />
              ) : (
                <div className="text-center py-12">
                  <h1 className="text-4xl font-bold mb-4">Welcome to Flow Documentation</h1>
                  <p className="text-xl text-gray-600">
                    Select a topic from the sidebar to get started
                  </p>
                </div>
              )}
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OptimizedDocumentation;
