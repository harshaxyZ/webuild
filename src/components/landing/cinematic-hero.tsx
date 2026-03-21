"use client";

import React, { useRef, useLayoutEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  Environment, 
  MeshReflectorMaterial, 
  ContactShadows,
  useScroll,
  ScrollControls,
  Scroll
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "./hero";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * MACBOOK COMPONENT (Simplified High-Fidelity Geometry)
 */
function Macbook({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const screen = useRef<THREE.Mesh>(null);

  const opacity = progress > 0.55 ? 1 - (progress - 0.55) / 0.2 : 1;

  useFrame((state) => {
    if (!group.current) return;
    
    // Stage 1 Idle Motion (0-15%)
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t / 2) * 0.05;
    group.current.rotation.y = Math.sin(t / 4) * 0.05;
  });

  return (
    <group ref={group} scale={1.5} visible={opacity > 0}>
      {/* Laptop Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[4, 0.1, 2.8]} />
        <meshStandardMaterial 
          color="#222" 
          metalness={0.8} 
          roughness={0.2} 
          transparent 
          opacity={opacity}
        />
      </mesh>
      
      {/* Laptop Screen / Lid */}
      <group position={[0, 0, -1.4]} rotation={[progress > 0.15 ? (progress - 0.15) * 5 * -0.5 : 0, 0, 0]}>
        <mesh position={[0, 1.4, 0]} ref={screen}>
          <boxGeometry args={[4, 2.8, 0.08]} />
          <meshStandardMaterial 
            color="#111" 
            metalness={0.9} 
            roughness={0.1} 
            transparent 
            opacity={opacity}
          />
          
          {/* Screen Content Area */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[3.8, 2.6]} />
            <meshStandardMaterial 
              emissive="#00A3FF" 
              emissiveIntensity={progress > 0.35 ? (progress - 0.35) * 15 : 0} 
              color="#000" 
              transparent
              opacity={opacity}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

function Particles() {
  const count = 200;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  const points = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.001;
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#88aaff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/**
 * 3D SCENE ORCHESTRATION
 */
function Scene() {
  const { camera } = useThree();
  const scroll = useScroll();

  useFrame(() => {
    const r = scroll.offset; // 0 to 1

    // CAMERA SEQUENCE MATH (0 -> 1)
    // 0-15: Intro
    // 15-35: Engage
    // 35-55: Lock-in (Aggressive zoom)
    // 55-75: Transition (Laptop frame fades)
    // 75-100: Immersion
     
    let z = 12;
    let y = 0.5;
    let lookAtY = 0;

    if (r < 0.15) {
      // INTRO
      z = 12;
    } else if (r < 0.35) {
      // ENGAGE
      const t = (r - 0.15) / 0.2;
      z = 12 - t * 6; // 12 -> 6
    } else if (r < 0.55) {
      // LOCK-IN
      const t = (r - 0.35) / 0.2;
      z = 6 - t * 4.9; // 6 -> 1.1
      y = 0.5 + t * 1.5; // Up to screen center
      lookAtY = t * 1.5;
    } else {
      // TRANSITION & IMMERSION
      z = 1.1;
      y = 2.0;
      lookAtY = 1.5;
    }

    // JITTER (35-55% Scroll)
    let jitterX = 0;
    let jitterY = 0;
    if (r > 0.35 && r < 0.55) {
      const jitterT = (r - 0.35) / 0.2;
       // Add a high-frequency micro-jitter
      jitterX = Math.sin(r * 200) * 0.01 * jitterT;
      jitterY = Math.cos(r * 200) * 0.01 * jitterT;
    }

    camera.position.set(jitterX, y + jitterY, z);
    camera.lookAt(0, lookAtY, 0);
  });

  return (
    <>
      <color attach="background" args={["#f8faff"]} />
      <Particles />
      
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={1} />
      
      <Suspense fallback={null}>
        <Macbook progress={scroll.offset} />
        
        {/* Reflective Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={512}
            mixBlur={1}
            mixStrength={60}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#ecf2ff"
            metalness={0.5}
            mirror={0.9}
          />
        </mesh>
        
        <Environment preset="apartment" />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      </Suspense>
    </>
  );
}

export function CinematicHero() {
  return (
    <div className="h-[400vh] w-full bg-zinc-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ScrollControls pages={4} damping={0.2}>
            <Scene />
            
            {/* Stage 5: Immersion (HTML Overlay) */}
            <Scroll html>
               <div className="w-screen">
                  <UIOverlay />
               </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}

function UIOverlay() {
  const scroll = useScroll();
  const overlayRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!overlayRef.current) return;
    const r = scroll.offset;
    // Only show after 75% scroll
    if (r > 0.75) {
      const opacity = (r - 0.75) / 0.25;
      overlayRef.current.style.opacity = opacity.toString();
      overlayRef.current.style.display = "block";
    } else {
      overlayRef.current.style.display = "none";
    }
  });

  return (
    <div ref={overlayRef} className="w-full transition-opacity duration-300">
      <Hero />
      <div className="h-screen" /> {/* Spacer */}
    </div>
  );
}
