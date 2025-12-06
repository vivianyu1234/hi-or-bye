'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { Chemical } from '@/lib/magritte/gameState';

interface ChemicalChoiceProps {
  chemical: Chemical;
  position: [number, number, number];
  onSelect: (chemical: Chemical) => void;
}

export default function ChemicalChoice({ chemical, position, onSelect }: ChemicalChoiceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      // Gentle rotation
      groupRef.current.rotation.y += hovered ? 0.03 : 0.01;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(chemical)}
    >
      {/* Pill/vial shape */}
      <RoundedBox
        args={[0.3, 0.6, 0.3]}
        radius={0.15}
        smoothness={4}
        castShadow
      >
        <meshPhysicalMaterial
          color={chemical.color}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          emissive={chemical.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </RoundedBox>

      {/* Glow effect when hovered */}
      {hovered && (
        <pointLight
          position={[0, 0, 0]}
          color={chemical.color}
          intensity={2}
          distance={3}
        />
      )}

      {/* Label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="top"
        outlineWidth={0.01}
        outlineColor="black"
      >
        {chemical.name}
      </Text>

      {/* Click prompt when hovered */}
      {hovered && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.12}
          color="#ffff00"
          anchorX="center"
          anchorY="bottom"
        >
          Click to take
        </Text>
      )}
    </group>
  );
}
