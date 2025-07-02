import React from "react";

const DetailsSection = () => {
  return (
    <section id="details" className="w-full bg-black py-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex justify-center">
          {/* Only Left Card - The Details */}
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant">
            {/* Card Header with background image instead of gradient */}
            <div
              className="relative h-48 sm:h-64 p-6 sm:p-8 flex items-end"
              style={{
                backgroundImage: "url('/background-section3.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-display text-white font-bold">
                Designed for Professional Developers
              </h2>
            </div>

            {/* Card Content */}
            <div
              className="bg-black p-4 sm:p-8 text-gray-200"
              style={{
                border: "1px solid #2a2a2a",
              }}
            >
              <ul className="space-y-4 sm:space-y-6">
                <li>
                  <strong className="text-white">Code Completion:</strong> Intelligent code suggestions based on context
                </li>
                <li>
                  <strong className="text-white">Command Bar:</strong> Quick access to AI-powered commands with Cmd+K (Ctrl+K)
                </li>
                <li>
                  <strong className="text-white">Chat Interface:</strong> Contextual conversations about your code
                </li>
                <li>
                  <strong className="text-white">Fast Apply:</strong> Quickly implement AI suggestions with search-and-replace precision
                </li>
                <li>
                  <strong className="text-white">Local Models:</strong> Run AI locally using Ollama and other providers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DetailsSection;
