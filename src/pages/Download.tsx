import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Monitor, CheckCircle, ChevronRight, ArrowRight, Shield, Zap, Clock } from "lucide-react";
import { motion, Variants } from "framer-motion";

const DownloadPage = () => {
  const [detectedOS, setDetectedOS] = useState<string>("Windows");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Mac")) {
      setDetectedOS("macOS");
    } else if (userAgent.includes("Linux")) {
      setDetectedOS("Linux");
    } else {
      setDetectedOS("Windows");
    }
  }, []);

  const desktopDownloads = [
    {
      platform: "Windows",
      icon: <Monitor className="w-8 h-8" />,
      version: "v1.1.0",
      size: "195 MB",
      recommended: detectedOS === "Windows",
      architecture: ["x64", "ARM64"],
      releaseDate: "2023"
    },
    {
      platform: "macOS",
      icon: <Monitor className="w-8 h-8" />,
      version: "v1.1.0", 
      size: "180 MB",
      recommended: detectedOS === "macOS",
      architecture: ["Intel", "Apple Silicon"],
      releaseDate: "2023"
    },
    {
      platform: "Linux",
      icon: <Monitor className="w-8 h-8" />,
      version: "v1.1.0",
      size: "175 MB",
      recommended: detectedOS === "Linux",
      architecture: ["x64", "ARM64"],
      releaseDate: "2023"
    }
  ];

  const requirements = [
    { category: "Minimum", ram: "4GB RAM", storage: "2GB Storage", processor: "64-bit processor" },
    { category: "Recommended", ram: "8GB RAM", storage: "5GB Storage", processor: "Multi-core processor" },
    { category: "Optimal", ram: "16GB+ RAM", storage: "10GB+ Storage", processor: "Dedicated GPU" }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy-Focused",
      description: "Messages sent directly to providers without retaining your data"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Development",
      description: "Use AI agents on your codebase to enhance productivity"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Open Source Freedom",
      description: "Customize and extend your development environment freely"
    }
  ];

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-dark-900">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="pulse-chip mx-auto mb-6">
              <span>Download</span>
            </div>
            <h1 className="section-title mb-6">
              Download Flow Editor
            </h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              Get started with the advanced AI-powered code editor.
              We detected you're using <span className="text-pulse-400 font-medium">{detectedOS}</span>.
            </p>
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                <strong>Note:</strong> Flow is currently only available for desktop platforms. We're focused on delivering the best coding experience for professional development environments.
              </div>
            </div>
          </motion.div>

          {/* Desktop Downloads */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {desktopDownloads.map((download, index) => (
              <motion.div
                key={download.platform}
                custom={index}
                variants={fadeInUpVariants}
                className={`glass-card p-8 text-center transition-all duration-500 hover:-translate-y-2 ${
                  download.recommended ? "ring-2 ring-pulse-500" : ""
                }`}
              >
                {download.recommended && (
                  <div className="mb-4">
                    <span className="inline-block bg-pulse-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="w-20 h-20 mx-auto mb-6 bg-black rounded-2xl flex items-center justify-center text-pulse-400">
                  {download.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white">{download.platform}</h3>
                <p className="text-gray-400 mb-1">{download.version}</p>
                <p className="text-sm text-gray-500 mb-2">{download.size}</p>
                <p className="text-xs text-gray-600 mb-6">Released: {download.releaseDate}</p>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Available for:</p>
                  <div className="flex justify-center gap-2">
                    {download.architecture.map(arch => (
                      <span key={arch} className="text-xs bg-dark-700/50 text-gray-300 px-3 py-1 rounded-full">
                        {arch}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  download.recommended
                    ? "bg-pulse-500 text-white hover:bg-pulse-600"
                    : "border border-gray-700 text-gray-300 hover:border-pulse-500 hover:text-pulse-400"
                }`}>
                  <Download size={20} />
                  <span>Download</span>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* System Requirements */}
          <motion.div 
            className="glass-card p-8 md:p-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8 text-center text-white">System Requirements</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {requirements.map((req, index) => (
                <div key={req.category} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-pulse-400" />
                  </div>
                  <h3 className="font-semibold mb-4 text-white">{req.category}</h3>
                  <ul className="text-gray-400 space-y-2">
                    <li>{req.ram}</li>
                    <li>{req.storage}</li>
                    <li>{req.processor}</li>
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8 text-center text-white">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="glass-card p-6 text-center transition-all duration-300 hover:-translate-y-2">
                  <div className="w-12 h-12 mx-auto mb-4 bg-pulse-900/50 rounded-full flex items-center justify-center text-pulse-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Need Help Getting Started?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Our documentation provides comprehensive guides to help you set up and make the most of Flow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/documentation" className="button-primary flex items-center justify-center">
                <span>View Documentation</span>
                <ChevronRight size={16} className="ml-2" />
              </a>
              <a href="#" className="button-secondary">
                <span>Contact Support</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DownloadPage;
