"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Dots({ dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength }) {
  const meshRef = useRef();
  const { mouse, viewport } = useThree();

  const count = 50 * 50;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < 50; i++) {
      for (let j = 0; j < 50; j++) {
        pos[(i * 50 + j) * 3] = (i - 25) * gap * 0.1;
        pos[(i * 50 + j) * 3 + 1] = (j - 25) * gap * 0.1;
        pos[(i * 50 + j) * 3 + 2] = 0;
      }
    }
    return pos;
  }, [gap]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const color = new THREE.Color(baseColor);
    for (let i = 0; i < count; i++) {
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return cols;
  }, [baseColor]);

  useFrame(() => {
    if (meshRef.current) {
      const posArr = meshRef.current.geometry.attributes.position.array;
      const colArr = meshRef.current.geometry.attributes.color.array;
      const baseCol = new THREE.Color(baseColor);
      const activeCol = new THREE.Color(activeColor);

      const mx = (mouse.x * viewport.width) / 2;
      const my = (mouse.y * viewport.height) / 2;

      for (let i = 0; i < count; i++) {
        const x = posArr[i * 3];
        const y = posArr[i * 3 + 1];
        
        const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
        
        if (dist < shockRadius * 0.01) {
          const force = (1 - dist / (shockRadius * 0.01)) * shockStrength * 0.1;
          posArr[i * 3 + 2] = force;
          
          colArr[i * 3] = THREE.MathUtils.lerp(baseCol.r, activeCol.r, force);
          colArr[i * 3 + 1] = THREE.MathUtils.lerp(baseCol.g, activeCol.g, force);
          colArr[i * 3 + 2] = THREE.MathUtils.lerp(baseCol.b, activeCol.b, force);
        } else {
          posArr[i * 3 + 2] *= 0.9;
          colArr[i * 3] = baseCol.r;
          colArr[i * 3 + 1] = baseCol.g;
          colArr[i * 3 + 2] = baseCol.b;
        }
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={dotSize * 0.01} vertexColors transparent opacity={0.8} />
    </points>
  );
}

export default function DotGrid({
  dotSize = 5,
  gap = 15,
  baseColor = "#2F293A",
  activeColor = "#f70ecb",
  proximity = 120,
  shockRadius = 250,
  shockStrength = 5
}) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <Dots
        dotSize={dotSize}
        gap={gap}
        baseColor={baseColor}
        activeColor={activeColor}
        proximity={proximity}
        shockRadius={shockRadius}
        shockStrength={shockStrength}
      />
    </Canvas>
  );
}
