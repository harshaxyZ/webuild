"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Saturn() {
  const saturnRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const logosRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (saturnRef.current) {
      saturnRef.current.rotation.y = t * 0.1;
      saturnRef.current.rotation.x = 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * -0.05;
    }
    if (logosRef.current) {
      logosRef.current.rotation.y = t * 0.2;
    }
  });

  const logos = [
    { name: "React", color: "#61dafb" },
    { name: "Next.js", color: "#ffffff" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Tailwind", color: "#38bdf8" },
    { name: "Node.js", color: "#339933" },
    { name: "Framer", color: "#0055FF" },
  ];

  return (
    <group ref={saturnRef}>
      {/* Planet */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#d2b48c" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Rings */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.2, 0.4, 2, 100]} />
        <meshStandardMaterial 
          color="#e6d5b8" 
          opacity={0.8} 
          transparent 
          roughness={0.4}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[4.2, 0.2, 2, 100]} />
        <meshStandardMaterial 
          color="#c8b090" 
          opacity={0.6} 
          transparent 
        />
      </mesh>

      {/* Logos Revolving */}
      <group ref={logosRef} rotation={[-Math.PI / 2.2, 0, 0]}>
        {logos.map((logo, index) => {
          const angle = (index / logos.length) * Math.PI * 2;
          const radius = 5.2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh key={logo.name} position={[x, 0, z]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color={logo.color} />
              <Html distanceFactor={15} center position={[0, -0.4, 0]}>
                <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10 whitespace-nowrap">
                  {logo.name}
                </div>
              </Html>
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function SaturnScene() {
  return (
    <div className="w-full h-full absolute right-0 top-0 opacity-80 pointer-events-none md:pointer-events-auto">
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Saturn />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
}
