
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface SimpleShaderBackgroundProps {
  className?: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * 0.3183099);
    p += dot(p, p + 42.0);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv;
    vec2 pos = uv * 2.0 - 1.0;
    pos.x *= uResolution.x / uResolution.y;

    float n = noise(pos * 2.0 + uTime * 0.1);
    float radial = sin(length(pos) * 4.0 - uTime * 1.0) * 0.5 + 0.5;

    vec3 colorA = vec3(0.1, 0.3, 0.9);
    vec3 colorB = vec3(0.9, 0.2, 1.0);
    vec3 color = mix(colorA, colorB, n * 0.5 + 0.5);
    color += radial * 0.2;

    float vig = smoothstep(1.0, 0.3, length(pos));
    color *= vig;

    gl_FragColor = vec4(color, 0.8);
  }
`;

const SimpleShaderBackground: React.FC<SimpleShaderBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const setSize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
      renderer.setSize(width, height, false);
      (material.uniforms.uResolution.value as THREE.Vector2).set(width, height);
    };

    setSize();
    window.addEventListener("resize", setSize);

    let lastTime = 0;
    const animate = (time: number) => {
      // Throttle to 30fps for better performance
      if (time - lastTime >= 33) {
        (material.uniforms.uTime.value as number) += 0.016;
        renderer.render(scene, camera);
        lastTime = time;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", setSize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
};

export default SimpleShaderBackground;
