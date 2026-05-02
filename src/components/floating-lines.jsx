"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WaveLine({ index, count, distance, bendRadius, bendStrength, color }) {
  const lineRef = useRef();
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 50; i++) {
      pts.push(new THREE.Vector3((i - 25) * 0.5, 0, 0));
    }
    return pts;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array;
      for (let i = 0; i <= 50; i++) {
        const x = (i - 25) * 0.5;
        const y = Math.sin(x * 0.5 + time + index) * bendStrength;
        const z = Math.cos(x * 0.3 + time * 0.5 + index) * (bendStrength * 0.5);
        
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z + (index * distance);
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.length * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

export default function FloatingLines({
  enabledWaves = ["top", "middle", "bottom"],
  lineCount = 8,
  lineDistance = 8,
  bendRadius = 8,
  bendStrength = -2,
  gradientStart = "#e945f5",
  gradientMid = "#6f6f6f",
  gradientEnd = "#6a6a6a"
}) {
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <group position={[0, 0, 0]}>
        {[...Array(lineCount)].map((_, i) => (
          <WaveLine
            key={i}
            index={i}
            count={lineCount}
            distance={lineDistance}
            bendRadius={bendRadius}
            bendStrength={bendStrength}
            color={i % 2 === 0 ? gradientStart : gradientEnd}
          />
        ))}
      </group>
    </Canvas>
  );
}
