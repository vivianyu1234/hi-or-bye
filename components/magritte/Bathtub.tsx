'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export default function Bathtub() {
  const groupRef = useRef<THREE.Group>(null);

  const tileColor = '#E8E0D5';
  const tubColor = '#FFFFFF';
  const fixtureColor = '#C0C0C0';

  return (
    <group ref={groupRef} position={[3, 0, -5]}>
      {/* Tile base/surround */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1.2, 3]} />
        <meshStandardMaterial color={tileColor} roughness={0.4} />
      </mesh>

      {/* Tile grid lines on front */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={`h-${i}`} position={[-0.5, 0.15 + i * 0.15, 1.51]}>
          <boxGeometry args={[3.5, 0.02, 0.01]} />
          <meshBasicMaterial color="#D0C8BD" />
        </mesh>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={`v-${i}`} position={[-2 + i * 0.35, 0.6, 1.51]}>
          <boxGeometry args={[0.02, 1.1, 0.01]} />
          <meshBasicMaterial color="#D0C8BD" />
        </mesh>
      ))}

      {/* Inner tub - white porcelain */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[3.2, 0.6, 2.2]} />
        <meshStandardMaterial color={tubColor} roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Tub interior (darker to show depth) */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[2.8, 0.4, 1.8]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.2} />
      </mesh>

      {/* Rim */}
      <mesh position={[0, 1.22, 0]} castShadow>
        <boxGeometry args={[3.4, 0.08, 2.4]} />
        <meshStandardMaterial color={tubColor} roughness={0.1} />
      </mesh>

      {/* Faucet */}
      <group position={[1.2, 1.3, 0]}>
        {/* Faucet base */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.2, 16]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Faucet neck */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.3, 16]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Faucet spout */}
        <mesh position={[-0.15, 0.45, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Drain */}
      <mesh position={[0, 0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial color={fixtureColor} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Towel bar */}
      <group position={[-2.1, 1, 0]}>
        <mesh position={[0, 0, -0.4]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.4]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.9, 8]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Towel */}
        <mesh position={[0.05, -0.1, 0]} castShadow>
          <boxGeometry args={[0.05, 0.4, 0.6]} />
          <meshStandardMaterial color="#F5F0E8" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
