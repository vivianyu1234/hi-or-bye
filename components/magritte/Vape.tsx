'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { DIMENSIONS, POSITIONS } from '@/lib/magritte/constants';

export default function Vape() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { fingerHeight } = DIMENSIONS;
  const { finger: fingerPos } = POSITIONS;

  // Vape positioned on top of finger
  const vapeY = fingerHeight + 0.8;

  // Matte plastic material for vape body
  const bodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2a2a3a'),
      roughness: 0.4,
      metalness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.5,
    });
  }, []);

  // Metallic material for accents
  const metalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#888899'),
      roughness: 0.2,
      metalness: 0.8,
    });
  }, []);

  // LED light material (glowing)
  const ledMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00ff88'),
      emissive: new THREE.Color('#00ff88'),
      emissiveIntensity: hovered ? 2 : 0.5,
    });
  }, [hovered]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle bobbing animation
      groupRef.current.position.y = vapeY + Math.sin(state.clock.elapsedTime * 1.5) * 0.04;
      // Slow rotation
      groupRef.current.rotation.y += hovered ? 0.02 : 0.005;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[fingerPos.x, vapeY, fingerPos.z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main body - rounded rectangle */}
      <RoundedBox
        args={[0.4, 1.4, 0.25]}
        radius={0.08}
        smoothness={4}
        castShadow
      >
        <primitive object={bodyMaterial} attach="material" />
      </RoundedBox>

      {/* Mouthpiece - flat top */}
      <RoundedBox
        position={[0, 0.75, 0]}
        args={[0.35, 0.12, 0.2]}
        radius={0.04}
        smoothness={4}
        castShadow
      >
        <primitive object={metalMaterial} attach="material" />
      </RoundedBox>

      {/* Mouthpiece hole */}
      <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.05, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* LED indicator light */}
      <mesh position={[0, -0.55, 0.13]}>
        <boxGeometry args={[0.08, 0.04, 0.02]} />
        <primitive object={ledMaterial} attach="material" />
      </mesh>

      {/* Brand stripe accent */}
      <mesh position={[0, 0.1, 0.126]}>
        <boxGeometry args={[0.3, 0.08, 0.01]} />
        <meshStandardMaterial color="#ff6b9d" metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Side button */}
      <mesh position={[0.21, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        <primitive object={metalMaterial} attach="material" />
      </mesh>

      {/* Bottom cap */}
      <RoundedBox
        position={[0, -0.72, 0]}
        args={[0.38, 0.06, 0.23]}
        radius={0.02}
        smoothness={4}
      >
        <primitive object={metalMaterial} attach="material" />
      </RoundedBox>
    </group>
  );
}
