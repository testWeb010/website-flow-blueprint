import React from "react";

const ImageShowcaseSection = () => {
  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-black" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white mb-3 sm:mb-4">
            Code Smarter, Not Harder
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Our AI-powered code editor is designed to transform how developers interact
            with their codebase, boosting productivity and creativity.
          </p>
        </div>
        
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <div className="w-full">
            <img 
              src="/hero.png" 
              alt="Flow AI-powered code editor interface" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="bg-black p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-white">Next Generation Development</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Built with cutting-edge AI technology, Flow seamlessly integrates into your 
              development workflow, providing intelligent code suggestions, automated refactoring,
              and context-aware assistance to elevate your coding experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
