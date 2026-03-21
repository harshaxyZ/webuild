"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function ReactiveBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springConfig = { damping: 50, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothX2 = useSpring(mouseX, { damping: 70, stiffness: 150 });
  const smoothY2 = useSpring(mouseY, { damping: 70, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Relative movement
      mouseX.set(e.clientX - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0));
      mouseY.set(e.clientY - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#fbfbfd] overflow-hidden pointer-events-none">
      {/* Primary Aura (Rose) */}
      <motion.div 
        style={{
          x: smoothX,
          y: smoothY,
          willChange: 'transform',
        }}
        className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-rose-200/20 blur-[100px] rounded-full mix-blend-multiply"
      />
      
      {/* Secondary Aura (Blue/Cyan) */}
      <motion.div 
        style={{
          x: smoothX2,
          y: smoothY2,
          willChange: 'transform',
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/30 blur-[80px] rounded-full mix-blend-multiply"
      />

      {/* Tertiary Aura (Zinc/Grey for depth) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_#fbfbfd_80%)] opacity-40 pointer-events-none" />
    </div>
  );
}
