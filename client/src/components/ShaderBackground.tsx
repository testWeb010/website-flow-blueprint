import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ShaderBackgroundProps {
  id?: string;
  className?: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment shader – animated aurora / flowing gradient driven by simple noise and time
const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  varying vec2 vUv;

  // Hash-based random
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // 2-D noise
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
               u.y);
  }

  // FBM
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  // Rotate vector
  vec2 rot(vec2 v, float a) {
    float c = cos(a), s = sin(a);
    return vec2(c * v.x - s * v.y, s * v.x + c * v.y);
  }

  // Sparkles
  float sparkle(vec2 uv) {
    vec2 id = floor(uv);
    float rnd = hash(id);
    float t = fract(uTime * 0.3 + rnd);
    float sz = mix(0.4, 1.4, rnd);
    uv = fract(uv) - 0.5;
    float d = length(uv) / sz;
    return smoothstep(0.15, 0.0, d) * pow(t, 4.0);
  }

  // Shooting star
  float shootingStar(vec2 uv) {
    // choose direction
    vec2 dir = normalize(vec2(1.0, -0.25));
    float period = 18.0; // seconds per streak
    float t = mod(uTime, period);
    // start point influenced by hashed integer time to vary position
    float segment = floor(uTime / period);
    float rnd = hash(vec2(segment, 7.23));
    vec2 start = vec2(-1.2, 0.6 * rnd + 0.2);
    vec2 pos = uv - (start + dir * t * 0.4);
    float along = dot(pos, dir);
    float perp = abs(dot(pos, vec2(-dir.y, dir.x)));
    float mask = smoothstep(0.03, 0.0, perp) * smoothstep(-0.02, 0.1, along);
    float tail = smoothstep(0.0, 0.15, along);
    return mask * tail;
  }

  // Hue shift helper
  vec3 hueShift(vec3 color, float shift) {
    const vec3  k = vec3(0.57735);
    float cosAngle = cos(shift);
    float sinAngle = sin(shift);
    return color * cosAngle + cross(k, color) * sinAngle + k * dot(k, color) * (1.0 - cosAngle);
  }

  void main() {
    vec2 uv = vUv;
    vec2 pos = uv * 2.0 - 1.0;
    pos.x *= uResolution.x / uResolution.y;

    // Swirl towards center + FBM distortion
    float swirlT = uTime * 0.1;
    pos = rot(pos, swirlT);
    float n = fbm(pos * 2.5 + swirlT);

    // Pulsing radial waves
    float radial = sin(length(pos) * 8.0 - uTime * 2.0) * 0.5 + 0.5;

    // Pointer reactive glow
    vec2 p = uPointer;
    float glow = 1.0 - smoothstep(0.0, 0.5, distance(pos, p));

    // Base gradient colors with hue cycling
    vec3 colA = vec3(0.05, 0.25, 0.9);
    vec3 colB = vec3(0.9, 0.15, 1.0);
    vec3 color = mix(colA, colB, n);
    color = hueShift(color, uTime * 0.05);

    // Add radial & glow influence
    color += radial * 0.25 + glow * 0.6;

    // Sparkles & shooting star layers
    float sp = sparkle(uv * 45.0);
    float streak = shootingStar(uv);
    color += vec3(sp + streak * 2.0);

    // Slight bloom effect
    color = mix(color, color * color, 0.35);

    // Vignette
    float vig = smoothstep(1.2, 0.4, length(pos));
    color *= vig;

    gl_FragColor = vec4(color, 0.96);
  }
`;

const ShaderBackground: React.FC<ShaderBackgroundProps> = ({ id = "shader-bg-canvas", className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uPointer: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const setSize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      (material.uniforms.uResolution.value as THREE.Vector2).set(width, height);
    };

    setSize();
    window.addEventListener("resize", setSize);

    // Pointer move handler
    const onPointerMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.current.set(x, y);
    };
    window.addEventListener("pointermove", onPointerMove);

    const animate = () => {
      (material.uniforms.uTime.value as number) += 0.016; // ~60 FPS
      // Smoothly interpolate pointer uniform
      (material.uniforms.uPointer.value as THREE.Vector2).lerp(pointer.current, 0.1);
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id={id} className={className} />;
};

export default ShaderBackground;