
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import SimpleShaderBackground from "./SimpleShaderBackground";

const OptimizedHero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    const handleResize = () => setTimeout(checkDevice, 250);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    fetch('/hero.png') // Fallback to static image instead of problematic Lottie
      .then(() => {
        if (isMounted) setLottieData(null); // Use static image for now
      })
      .catch(() => {
        if (isMounted) setLottieData(null);
      });
      
    return () => { isMounted = false; };
  }, []);

  // Simplified scroll effect
  useEffect(() => {
    if (isMobile) return;
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const elements = document.querySelectorAll('.parallax');
          elements.forEach(el => {
            const element = el as HTMLElement;
            const speed = 0.1; // Fixed speed for simplicity
            const yPos = -scrollY * speed;
            element.style.transform = `translateY(${yPos}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <>
      <style>{`
        body {
          background-color: black;
        }
        .animation-container {
          position: absolute;
          top: 100px;
          left: 5%;
          right: 5%;
          bottom: 20%;
          z-index: 0;
          border-radius: 24px;
          overflow: hidden;
        }
        .shader-bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 24px;
          z-index: 1;
        }
        #hero {
          pointer-events: none;
          position: relative;
          padding-top: 120px;
          padding-bottom: 80px;
          background-color: black;
        }
        #hero > .container, #hero a {
          pointer-events: auto;
        }
        .hero-image-container {
          position: relative;
          z-index: 3;
          margin-top: 40px;
        }
        .hero-image {
          border-radius: 24px;
        }
      `}</style>
      <section 
       className="overflow-hidden relative bg-black" 
       id="hero" 
       ref={heroRef}
       style={{
         minHeight: '100vh',
         paddingTop: '120px',
         paddingBottom: '80px'
       }}
      >
        <div className="animation-container">
          <SimpleShaderBackground className="shader-bg-canvas" />
          <div className="overlay"></div>
        </div>
        
        <div className="container relative px-4 max-w-7xl mx-auto" style={{ zIndex: 2 }}>
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <div 
              className="flex items-center space-x-2 bg-blue-500/20 px-4 py-1.5 rounded mb-6" 
            >
              <span className="text-blue-400 text-sm font-medium">Flow</span>
            </div>
          
            <h1 
              className="section-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6 font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400" 
            >
              Next-Gen Code Editor<br className="hidden sm:block"/> Supercharged by AI
            </h1>
          
            <p 
              className="section-subtitle text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-300 font-normal mb-8 max-w-3xl"
            >
              Leverage powerful AI agents to transform your workflow, visualize changes, and run models locally. Flow connects directly to providers with zero data retention.
            </p>
          
            <div 
              className="flex flex-col sm:flex-row gap-4 mb-12" 
            >
              <a 
                href="/download" 
                className="flex items-center justify-center group w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <span className="text-sm font-medium">Download Flow</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="/documentation" 
                className="flex items-center justify-center group w-full sm:w-auto text-center bg-transparent border border-white/20 text-white px-6 py-3 rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <span className="text-sm font-medium">Explore Features</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform group-hover:translate-y-[-2px]">
                  <path d="M12 6.25278V19.2528M12 6.25278L6.75 11.5028M12 6.25278L17.25 11.5028" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="w-full max-w-5xl relative hero-image-container">
              <div className="relative z-10 hero-image" style={{ 
                minHeight: '380px',
              }}>
                <div className="flex items-center justify-center w-full h-full">
                  <img
                    src="/hero.png"
                    alt="Flow Code Editor Interface"
                    className="object-contain w-full h-full rounded"
                    loading="lazy"
                    style={{ 
                      maxHeight: '500px', 
                      maxWidth: '95%', 
                      width: '100%', 
                      height: 'auto', 
                      display: 'block', 
                      margin: '0 auto'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl -z-10 parallax"></div>
      </section>
    </>
  );
};

export default OptimizedHero;
