import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import ShaderBackground from "./ShaderBackground";

// A background component to ensure text readability with proper border radius
const BackgroundOverlay = () => (
  <div
    className="absolute z-[1] pointer-events-none bg-overlay"
    style={{
      background: 'rgba(18, 18, 18, 0.92)',
      borderRadius: '24px',
      top: '20px',
      left: '20px',
      right: '20px',
      bottom: '20px',
      boxShadow: '0 0 40px 20px rgba(18, 18, 18, 0.8)',
    }}
  />
);

const Hero = () => {
  // Toggle to re-enable the legacy particle system if ever needed
  const ENABLE_OLD_ANIMATION = false;
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const frameRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number>(0);
  const targetFPS = useRef(30); // Target 30 FPS for better performance
  const frameInterval = useRef(1000 / targetFPS.current);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const isMouseMoving = useRef<boolean>(false);
  const mouseTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isInViewport, setIsInViewport] = useState(true);
  // Performance optimization: Store references to THREE.js objects
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationInitialized = useRef<boolean>(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mouseLastMove = useRef<number>(0);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      
      // Detect low power devices
      const isLowPowerDevice = 
        isMobileDevice || 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsLowPower(isLowPowerDevice);
      // Update FPS target based on device capability
      targetFPS.current = isLowPowerDevice ? 24 : 30;
      frameInterval.current = 1000 / targetFPS.current;
    };
    
    // Initial check
    checkDevice();
    
    // Debounced resize handler for better performance
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(checkDevice, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Performance optimization: Add cleanup flag
    let isMounted = true;
    
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => {
        if (isMounted) setLottieData(data);
      })
      .catch(error => {
        console.error("Error loading Lottie animation:", error);
        if (isMounted) setLottieData(null);
      });
      
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const elements = document.querySelectorAll('.parallax');
          elements.forEach(el => {
            const element = el as HTMLElement;
            const speed = parseFloat(element.dataset.speed || '0.1');
            const yPos = -scrollY * speed;
            element.style.setProperty('--parallax-y', `${yPos}px`);
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Check if element is in viewport to pause animation when not visible
  useEffect(() => {
    if (isMobile || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [isMobile]);

  // --- "DATA CHASM" THREE.JS ANIMATION ---
  useEffect(() => {
    if (!ENABLE_OLD_ANIMATION) return; // early-exit when legacy animation is disabled
    if (isMobile || typeof window === 'undefined') return;
    
    // Performance optimization: Prevent re-initialization
    if (animationInitialized.current && sceneRef.current && rendererRef.current) return;
    animationInitialized.current = true;

    let camera: THREE.PerspectiveCamera,
        clock: THREE.Clock;

    const canvas = document.getElementById('canvas-webgl') as HTMLCanvasElement | null;
    const section = heroRef.current;
    if (!canvas || !section) return;
    
    // -- Shaders --
    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMouseForce;
      
      attribute float aSize;
      attribute float aInitialX;
      attribute float aSpeed;
      attribute float aOffset;

      varying float vNoise;
      varying float vInitialX;
      varying float vAlpha;

      // Optimized noise function
      float hash(vec3 p) {
        p = fract(p * vec3(443.897, 441.423, 437.195));
        p += dot(p, p.yzx + 19.19);
        return fract((p.x + p.y) * p.z);
      }
      
      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f*f*(3.0-2.0*f);
        
        float n = p.x + p.y * 157.0 + 113.0 * p.z;
        return mix(
          mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
              mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
          mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
              mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }

      void main() {
        vInitialX = aInitialX;
        
        // Use different speeds for particles
        float time = uTime * aSpeed + aOffset;
        
        // Simplified noise calculation
        float slowNoise = noise(position * 0.3 + time * 0.1);
        float fastNoise = noise(position * 0.8 + time * 0.2) * 0.3;
        
        vNoise = slowNoise + fastNoise;

        // Apply noise displacement
        vec3 displaced = position;
        displaced.y += vNoise * 1.2;
        displaced.x += vNoise * 0.3;
        
        // Add some gentle wave motion
        displaced.x += sin(displaced.y * 0.2 + time * 0.5) * 0.2;

        vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
        
        // Mouse Interaction - only apply when mouse is moving
        if (uMouseForce > 0.01) {
          vec2 screenPos = mvPosition.xy / mvPosition.w;
          float dist = distance(screenPos, uMouse);
          float force = pow(1.0 - smoothstep(0.0, 0.6, dist), 2.0) * uMouseForce;
          vec2 pushDirection = normalize(screenPos - uMouse);
          mvPosition.xy += pushDirection * force * mvPosition.w * 0.05;
        }

        // Distance-based alpha for depth effect
        float depth = abs(mvPosition.z);
        vAlpha = smoothstep(15.0, 5.0, depth);

        // Particle Size - smaller for better performance
        gl_PointSize = aSize * (180.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying float vNoise;
      varying float vInitialX;
      varying float vAlpha;

      void main() {
        // Create soft circular points
        float d = distance(gl_PointCoord, vec2(0.5));
        float baseAlpha = 1.0 - smoothstep(0.3, 0.5, d);
        if (baseAlpha < 0.01) discard;

        // Fade out particles near the center (the "chasm")
        float fadeZoneStart = 2.0;
        float fadeZoneEnd = 4.0;
        float fadeAlpha = smoothstep(fadeZoneStart, fadeZoneEnd, abs(vInitialX));
        
        // Dynamic Color based on noise
        vec3 colorPurple = vec3(0.5, 0.3, 1.0);
        vec3 colorBlue = vec3(0.2, 0.5, 0.9);
        vec3 colorHighlight = vec3(0.9, 0.95, 1.0);

        // Enhanced color mixing
        vec3 finalColor = mix(colorPurple, colorBlue, smoothstep(-0.5, 0.5, vNoise));
        finalColor = mix(finalColor, colorHighlight, pow(smoothstep(0.2, 0.8, vNoise), 2.0));
        
        // Add subtle brightness variation
        float brightness = 0.8 + 0.2 * sin(vNoise * 5.0);
        finalColor *= brightness;
        
        // Apply all alpha factors
        float finalAlpha = baseAlpha * fadeAlpha * vAlpha * 0.85;
        
        gl_FragColor = vec4(finalColor, finalAlpha);
      }
    `;

    const init = () => {
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      clock = new THREE.Clock();

      camera = new THREE.PerspectiveCamera(60, section.clientWidth / section.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 10);

      // Create renderer with appropriate settings
      const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: !isLowPower, // Disable antialiasing on low-power devices
        alpha: true,
        powerPreference: isLowPower ? 'low-power' : 'high-performance'
      });
      rendererRef.current = renderer;
      
      // Performance optimization: Reduce pixel ratio for better performance
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1 : 1.5));
      renderer.setSize(section.clientWidth, section.clientHeight);

      // Performance optimization: Adjust particle count based on device capability
      const particleCount = isLowPower ? 25000 : 45000;
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const initialX = new Float32Array(particleCount);
      const speeds = new Float32Array(particleCount);
      const offsets = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const side = i < particleCount / 2 ? -1 : 1;
        
        // Generate particles in two streams on the left and right
        const x = (2.0 + Math.random() * 5.5) * side;
        const y = (Math.random() - 0.5) * 20; // Taller streams
        const z = (Math.random() - 0.5) * 8; // More depth
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        initialX[i] = x;
        sizes[i] = 0.8 + Math.random() * 1.8; // Slightly smaller particles for performance
        speeds[i] = 0.7 + Math.random() * 0.6; // Different speeds for more natural movement
        offsets[i] = Math.random() * 100; // Random offsets to avoid uniform movement
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('aInitialX', new THREE.BufferAttribute(initialX, 1));
      geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
      geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
      
      const material = new THREE.ShaderMaterial({
        uniforms: { 
          uTime: { value: 0.0 }, 
          uMouse: { value: mouseRef.current },
          uMouseForce: { value: 0.0 }
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const particles = new THREE.Points(geometry, material);
      particlesRef.current = particles;
      scene.add(particles);
    };

    // Throttled animation loop for better performance
    const animate = (timestamp: number) => {
      // Skip frames to maintain target FPS
      const elapsed = timestamp - lastFrameTime.current;
      
      if (elapsed > frameInterval.current) {
        lastFrameTime.current = timestamp - (elapsed % frameInterval.current);
        
        // Only render when in viewport
        if (isInViewport && sceneRef.current && rendererRef.current && particlesRef.current) {
          const elapsedTime = clock.getElapsedTime();
          
          // Update uniforms
          (particlesRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsedTime;
          
          // Gradually decrease mouse force when not moving
          if (isMouseMoving.current) {
            (particlesRef.current.material as THREE.ShaderMaterial).uniforms.uMouseForce.value = 
              Math.min((particlesRef.current.material as THREE.ShaderMaterial).uniforms.uMouseForce.value + 0.1, 1.0);
          } else {
            (particlesRef.current.material as THREE.ShaderMaterial).uniforms.uMouseForce.value *= 0.95;
          }
          
          // Subtle camera movement
          camera.position.x = Math.sin(elapsedTime * 0.15) * 0.3;
          camera.position.y = Math.sin(elapsedTime * 0.1) * 0.2;
          camera.lookAt(sceneRef.current.position);
          
          // Render scene
          rendererRef.current.render(sceneRef.current, camera);
        }
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };

    const onResize = () => {
      if (!rendererRef.current) return;
      
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(section.clientWidth, section.clientHeight);
    };

    // Performance optimization: Throttle mouse movement
    const onMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      // Skip updates if too frequent (throttle to 30ms)
      if (now - mouseLastMove.current < 30) return;
      mouseLastMove.current = now;
      
      // Calculate normalized mouse position
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Update mouse position
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      
      // Set mouse as moving
      isMouseMoving.current = true;
      
      // Clear previous timeout
      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }
      
      // Set timeout to mark mouse as stopped
      mouseTimeout.current = setTimeout(() => {
        isMouseMoving.current = false;
      }, 150);
    };
    
    // Initialize and start animation
    init();
    lastFrameTime.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);
    
    // Add event listeners with performance optimizations
    const debouncedResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(onResize, 250);
    };
    
    window.addEventListener('resize', debouncedResize);
    section.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      // Remove event listeners
      window.removeEventListener('resize', debouncedResize);
      section.removeEventListener('mousemove', onMouseMove);
      
      // Cancel animation frame
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      // Clear mouse timeout
      if (mouseTimeout.current) {
        clearTimeout(mouseTimeout.current);
      }
      
      // Dispose resources
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.ShaderMaterial).dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Reset initialization flag to allow reinitialization if needed
      animationInitialized.current = false;
    };
  }, [isMobile, isLowPower, isInViewport]);

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
        .animation-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
        }
        .p-canvas-webgl {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
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
        .parallax {
          transform: translateY(var(--parallax-y, 0));
          will-change: transform;
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
          <div className="animation-inner">
            <ShaderBackground className="shader-bg-canvas" />
            <div className="overlay"></div>
          </div>
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
                {lottieData ? (
                  <LottieAnimation 
                    animationPath={lottieData} 
                    className="w-full h-auto max-w-4xl mx-auto"
                    loop={true}
                    autoplay={isInViewport}
                  />
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      
        <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
      </section>
    </>
  );
};

export default Hero;