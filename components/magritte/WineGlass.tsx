'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function WineGlass() {
  const groupRef = useRef<THREE.Group>(null);

  // Giant wine glass matching room color scheme
  const glassColor = '#2E8B7E'; // Teal green to match bedding

  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(glassColor),
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.7,
      thickness: 0.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.8,
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 2]} scale={[0.5, 0.5, 0.5]}>
      {/* Base of glass - flat circular */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.3, 0.15, 32]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Stem - thin and tall */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 3.3, 16]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Stem base bulge */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Bowl of glass - wine goblet shape */}
      <mesh position={[0, 4.5, 0]} castShadow>
        <cylinderGeometry args={[1.8, 0.3, 3, 32, 1, true]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Bowl bottom curve */}
      <mesh position={[0, 3.1, 0]} castShadow>
        <sphereGeometry args={[0.5, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Inner bowl shadow/depth */}
      <mesh position={[0, 4.8, 0]}>
        <cylinderGeometry args={[1.7, 0.25, 2.8, 32, 1, true]} />
        <meshStandardMaterial
          color="#1a5a5a"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rim highlight */}
      <mesh position={[0, 6, 0]}>
        <torusGeometry args={[1.8, 0.05, 8, 32]} />
        <meshStandardMaterial color="#4FC0C0" metalness={0.3} roughness={0.1} />
      </mesh>
    </group>
  );
}
