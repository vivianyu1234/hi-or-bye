'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import { COLORS } from '@/lib/magritte/constants';

export default function Bed() {
  const groupRef = useRef<THREE.Group>(null);

  // Bed positioned on the left side of the room
  const bedWidth = 2.5;
  const bedHeight = 0.4;
  const bedDepth = 1.8;
  const mattressHeight = 0.3;
  const frameThickness = 0.1;

  return (
    <group ref={groupRef} position={[-5, 0, 2]} castShadow receiveShadow>
      {/* Bed frame - dark wood */}
      {/* Headboard */}
      <mesh position={[0, bedHeight / 2 + mattressHeight / 2, bedDepth / 2]} castShadow>
        <boxGeometry args={[bedWidth, bedHeight, frameThickness]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.6} />
      </mesh>

      {/* Footboard */}
      <mesh position={[0, bedHeight / 2 + mattressHeight / 2, -bedDepth / 2]} castShadow>
        <boxGeometry args={[bedWidth, bedHeight, frameThickness]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.6} />
      </mesh>

      {/* Left side rail */}
      <mesh position={[-bedWidth / 2, bedHeight / 2 + mattressHeight / 2, 0]} castShadow>
        <boxGeometry args={[frameThickness, bedHeight, bedDepth]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.6} />
      </mesh>

      {/* Right side rail */}
      <mesh position={[bedWidth / 2, bedHeight / 2 + mattressHeight / 2, 0]} castShadow>
        <boxGeometry args={[frameThickness, bedHeight, bedDepth]} />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.6} />
      </mesh>

      {/* Base/slat support */}
      <mesh position={[0, bedHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bedWidth - frameThickness * 2, frameThickness, bedDepth - frameThickness * 2]} />
        <meshStandardMaterial color={COLORS.wood} roughness={0.7} />
      </mesh>

      {/* Red mattress */}
      <mesh position={[0, bedHeight + mattressHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bedWidth - 0.1, mattressHeight, bedDepth - 0.1]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>

      {/* White bedding/pillow */}
      <mesh position={[0, bedHeight + mattressHeight + 0.15, bedDepth / 2 - 0.3]} castShadow>
        <boxGeometry args={[bedWidth - 0.2, 0.2, 0.6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </mesh>

      {/* White sheet covering part of mattress */}
      <mesh position={[0, bedHeight + mattressHeight + 0.05, -bedDepth / 4]} castShadow>
        <boxGeometry args={[bedWidth - 0.15, 0.1, bedDepth * 0.5]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
      </mesh>
    </group>
  );
}

