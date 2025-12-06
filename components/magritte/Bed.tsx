'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export default function Bed() {
  const groupRef = useRef<THREE.Group>(null);

  // Larger bed to match Magritte painting scale
  const bedWidth = 4;
  const bedLength = 5;
  const frameHeight = 0.8;
  const headboardHeight = 2.5;
  const footboardHeight = 1.5;
  const mattressHeight = 0.5;
  const legHeight = 0.4;

  const woodColor = '#4A3728'; // Dark wood frame
  const woodColorDark = '#3A2A1A';
  const beddingColor = '#2E8B7E'; // Teal green blanket

  return (
    <group ref={groupRef} position={[-4, 0, -6]} rotation={[0, Math.PI / 2, 0]}>
      {/* Bed legs */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
        <mesh key={`leg-${i}`} position={[x * (bedWidth / 2 - 0.15), legHeight / 2, z * (bedLength / 2 - 0.15)]} castShadow>
          <boxGeometry args={[0.15, legHeight, 0.15]} />
          <meshStandardMaterial color={woodColorDark} roughness={0.6} />
        </mesh>
      ))}

      {/* Bed frame base */}
      <mesh position={[0, legHeight + 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[bedWidth, 0.2, bedLength]} />
        <meshStandardMaterial color={woodColor} roughness={0.7} />
      </mesh>

      {/* Headboard - tall curved top */}
      <mesh position={[0, legHeight + headboardHeight / 2, bedLength / 2 - 0.1]} castShadow>
        <boxGeometry args={[bedWidth, headboardHeight, 0.15]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>

      {/* Headboard decorative top curve */}
      <mesh position={[0, legHeight + headboardHeight - 0.2, bedLength / 2 - 0.1]} castShadow>
        <boxGeometry args={[bedWidth - 0.4, 0.4, 0.18]} />
        <meshStandardMaterial color={woodColorDark} roughness={0.5} />
      </mesh>

      {/* Footboard */}
      <mesh position={[0, legHeight + footboardHeight / 2, -bedLength / 2 + 0.1]} castShadow>
        <boxGeometry args={[bedWidth, footboardHeight, 0.12]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>

      {/* Side rails */}
      <mesh position={[-bedWidth / 2 + 0.06, legHeight + 0.3, 0]} castShadow>
        <boxGeometry args={[0.12, 0.25, bedLength - 0.3]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>
      <mesh position={[bedWidth / 2 - 0.06, legHeight + 0.3, 0]} castShadow>
        <boxGeometry args={[0.12, 0.25, bedLength - 0.3]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>

      {/* Red mattress/bedding */}
      <mesh position={[0, legHeight + 0.2 + mattressHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bedWidth - 0.3, mattressHeight, bedLength - 0.4]} />
        <meshStandardMaterial color={beddingColor} roughness={0.85} />
      </mesh>

      {/* Coral/red patterned pillows */}
      <mesh position={[-0.7, legHeight + 0.2 + mattressHeight + 0.15, bedLength / 2 - 0.8]} castShadow>
        <boxGeometry args={[1.2, 0.25, 0.8]} />
        <meshStandardMaterial color="#E85A4F" roughness={0.8} />
      </mesh>
      <mesh position={[0.7, legHeight + 0.2 + mattressHeight + 0.15, bedLength / 2 - 0.8]} castShadow>
        <boxGeometry args={[1.2, 0.25, 0.8]} />
        <meshStandardMaterial color="#E85A4F" roughness={0.8} />
      </mesh>

      {/* White sheet folded over */}
      <mesh position={[0, legHeight + 0.2 + mattressHeight + 0.08, bedLength / 2 - 1.8]} castShadow>
        <boxGeometry args={[bedWidth - 0.5, 0.12, 1.5]} />
        <meshStandardMaterial color="#F8F8F8" roughness={0.75} />
      </mesh>
    </group>
  );
}
