'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { COLORS } from '@/lib/magritte/constants';

export default function Wardrobe() {
  const groupRef = useRef<THREE.Group>(null);

  // Wardrobe positioned on the right side
  const wardrobeWidth = 1.5;
  const wardrobeHeight = 4;
  const wardrobeDepth = 1.2;
  const doorThickness = 0.05;
  const doorOpenAngle = 0.3; // Slightly ajar

  return (
    <group ref={groupRef} position={[5, wardrobeHeight / 2, -2]} castShadow receiveShadow>
      {/* Main wardrobe body - dark wood */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[wardrobeWidth, wardrobeHeight, wardrobeDepth]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.6} />
      </mesh>

      {/* Left door - slightly ajar */}
      <mesh
        position={[-wardrobeWidth / 2 + doorThickness / 2, 0, wardrobeDepth / 2 - doorThickness / 2]}
        rotation={[0, doorOpenAngle, 0]}
        castShadow
      >
        <boxGeometry args={[wardrobeWidth / 2 - 0.05, wardrobeHeight - 0.1, doorThickness]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.5} />
      </mesh>

      {/* Right door - slightly ajar */}
      <mesh
        position={[wardrobeWidth / 2 - doorThickness / 2, 0, wardrobeDepth / 2 - doorThickness / 2]}
        rotation={[0, -doorOpenAngle, 0]}
        castShadow
      >
        <boxGeometry args={[wardrobeWidth / 2 - 0.05, wardrobeHeight - 0.1, doorThickness]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.5} />
      </mesh>

      {/* Door handles */}
      <mesh position={[-wardrobeWidth / 2 + 0.1, 0, wardrobeDepth / 2]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[wardrobeWidth / 2 - 0.1, 0, wardrobeDepth / 2]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Interior reflection effect (simplified - just a lighter interior) */}
      <mesh position={[0, 0, wardrobeDepth / 2 - doorThickness]} castShadow>
        <boxGeometry args={[wardrobeWidth - 0.2, wardrobeHeight - 0.2, 0.01]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Large fluffy brush on top */}
      <group position={[0, wardrobeHeight / 2 + 0.3, 0]}>
        {/* Brush handle */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial color="#D4A574" roughness={0.6} />
        </mesh>
        
        {/* Brush base */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.2]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Brush bristles - fluffy effect */}
        {Array.from({ length: 20 }, (_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 0.12;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh key={i} position={[x, -0.15, z]} castShadow>
              <cylinderGeometry args={[0.01, 0.015, 0.25, 8]} />
              <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

