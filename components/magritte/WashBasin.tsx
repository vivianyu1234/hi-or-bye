'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export default function WashBasin() {
  const groupRef = useRef<THREE.Group>(null);

  const woodColor = '#C4956A';
  const woodColorDark = '#A67B52';
  const basinColor = '#FFFFFF';
  const fixtureColor = '#C0C0C0';

  return (
    <group ref={groupRef} position={[-4, 0, -3]}>
      {/* Floating vanity cabinet */}
      <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.6, 0.8]} />
        <meshStandardMaterial color={woodColor} roughness={0.5} />
      </mesh>

      {/* Cabinet drawer lines */}
      <mesh position={[0, 1.2, 0.41]}>
        <boxGeometry args={[1.9, 0.02, 0.01]} />
        <meshBasicMaterial color={woodColorDark} />
      </mesh>
      <mesh position={[-0.5, 1.2, 0.41]}>
        <boxGeometry args={[0.02, 0.5, 0.01]} />
        <meshBasicMaterial color={woodColorDark} />
      </mesh>
      <mesh position={[0.5, 1.2, 0.41]}>
        <boxGeometry args={[0.02, 0.5, 0.01]} />
        <meshBasicMaterial color={woodColorDark} />
      </mesh>

      {/* Drawer handles */}
      <mesh position={[-0.25, 1.2, 0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#B8A070" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0.25, 1.2, 0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#B8A070" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Basin/sink - rectangular modern style */}
      <mesh position={[0, 1.6, 0.1]} castShadow>
        <boxGeometry args={[1.2, 0.3, 0.6]} />
        <meshStandardMaterial color={basinColor} roughness={0.1} />
      </mesh>

      {/* Basin interior */}
      <mesh position={[0, 1.52, 0.1]}>
        <boxGeometry args={[1, 0.2, 0.45]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.15} />
      </mesh>

      {/* Faucet */}
      <group position={[0, 1.75, -0.15]}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.1, 16]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 16]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Spout */}
        <mesh position={[0, 0.3, 0.12]} rotation={[Math.PI / 3, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.25, 16]} />
          <meshStandardMaterial color={fixtureColor} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Mirror above */}
      <mesh position={[0, 2.8, -0.35]} castShadow>
        <boxGeometry args={[1.5, 1.2, 0.05]} />
        <meshStandardMaterial color="#E8E0D5" roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Mirror frame */}
      <mesh position={[0, 2.8, -0.33]}>
        <boxGeometry args={[1.6, 1.3, 0.02]} />
        <meshStandardMaterial color={woodColorDark} roughness={0.5} />
      </mesh>

      {/* Wall light fixture */}
      <group position={[-0.9, 3.2, -0.2]}>
        <mesh castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#FFFEF0" emissive="#FFFEF0" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
          <meshStandardMaterial color="#B8A070" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Soap dispensers/bottles */}
      <mesh position={[-0.7, 1.85, 0.1]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#8B9A7A" roughness={0.3} />
      </mesh>
      <mesh position={[-0.55, 1.85, 0.1]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.15, 16]} />
        <meshStandardMaterial color="#D4A55A" roughness={0.3} />
      </mesh>
    </group>
  );
}
