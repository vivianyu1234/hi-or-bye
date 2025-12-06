'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DIMENSIONS, POSITIONS } from '@/lib/magritte/constants';

export default function Finger() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    } else if (groupRef.current) {
      groupRef.current.rotation.y *= 0.95;
    }
  });

  const { fingerHeight, fingerRadius } = DIMENSIONS;
  const { finger: pos } = POSITIONS;

  // Mustard yellow material
  const skinMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#d4a545'),
      roughness: 0.5,
      metalness: 0.0,
      clearcoat: 0.1,
      clearcoatRoughness: 0.8,
      sheen: 0.3,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color('#e8b855'),
    });
  }, []);

  const skinMaterialDark = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#c49535'),
      roughness: 0.55,
      metalness: 0.0,
      clearcoat: 0.1,
      clearcoatRoughness: 0.8,
      sheen: 0.3,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color('#d4a545'),
    });
  }, []);

  const nailMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f5e0d8'),
      roughness: 0.2,
      metalness: 0.0,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      sheen: 0.5,
      sheenColor: new THREE.Color('#fff0f0'),
    });
  }, []);

  return (
    <group
      ref={groupRef}
      position={[pos.x, 0, pos.z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base section - wider */}
      <mesh position={[0, fingerHeight * 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[fingerRadius * 0.95, fingerRadius, fingerHeight * 0.25, 64]} />
        <primitive object={hovered ? skinMaterialDark : skinMaterial} attach="material" />
      </mesh>

      {/* Middle section */}
      <mesh position={[0, fingerHeight * 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[fingerRadius * 0.88, fingerRadius * 0.95, fingerHeight * 0.28, 64]} />
        <primitive object={hovered ? skinMaterialDark : skinMaterial} attach="material" />
      </mesh>

      {/* Upper section - narrower */}
      <mesh position={[0, fingerHeight * 0.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[fingerRadius * 0.78, fingerRadius * 0.88, fingerHeight * 0.22, 64]} />
        <primitive object={hovered ? skinMaterialDark : skinMaterial} attach="material" />
      </mesh>

      {/* Fingertip - smooth dome */}
      <mesh position={[0, fingerHeight * 0.78, 0]} castShadow>
        <sphereGeometry args={[fingerRadius * 0.78, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={hovered ? skinMaterialDark : skinMaterial} attach="material" />
      </mesh>

      {/* Fingernail - curved shape */}
      <mesh
        position={[0, fingerHeight * 0.73, fingerRadius * 0.5]}
        rotation={[0.35, 0, 0]}
        castShadow
      >
        <capsuleGeometry args={[fingerRadius * 0.28, fingerRadius * 0.4, 8, 32]} />
        <primitive object={nailMaterial} attach="material" />
      </mesh>

      {/* Joint crease 1 - subtle indentation */}
      <mesh position={[0, fingerHeight * 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[fingerRadius * 0.96, 0.008, 16, 64]} />
        <meshStandardMaterial color="#b08030" transparent opacity={0.7} />
      </mesh>

      {/* Joint crease 2 */}
      <mesh position={[0, fingerHeight * 0.50, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[fingerRadius * 0.90, 0.008, 16, 64]} />
        <meshStandardMaterial color="#b08030" transparent opacity={0.7} />
      </mesh>

      {/* Knuckle bump at first joint */}
      <mesh position={[0, fingerHeight * 0.25, -fingerRadius * 0.2]} castShadow>
        <sphereGeometry args={[fingerRadius * 0.25, 32, 32]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Knuckle bump at second joint */}
      <mesh position={[0, fingerHeight * 0.51, -fingerRadius * 0.15]} castShadow>
        <sphereGeometry args={[fingerRadius * 0.2, 32, 32]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Severed base */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[fingerRadius, 64]} />
        <meshStandardMaterial color="#a08030" roughness={0.9} />
      </mesh>
    </group>
  );
}
