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

function VapeShape({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <group>
      {/* Main body */}
      <RoundedBox args={[0.3, 1.0, 0.18]} radius={0.06} smoothness={4} castShadow>
        <meshPhysicalMaterial
          color="#2a2a3a"
          roughness={0.4}
          metalness={0.1}
          clearcoat={0.3}
        />
      </RoundedBox>
      {/* Mouthpiece */}
      <RoundedBox position={[0, 0.55, 0]} args={[0.25, 0.1, 0.14]} radius={0.03} smoothness={4} castShadow>
        <meshStandardMaterial color="#888899" roughness={0.2} metalness={0.8} />
      </RoundedBox>
      {/* LED indicator */}
      <mesh position={[0, -0.4, 0.1]}>
        <boxGeometry args={[0.06, 0.03, 0.01]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
      {/* Color stripe */}
      <mesh position={[0, 0.05, 0.091]}>
        <boxGeometry args={[0.22, 0.06, 0.01]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function AirFreshenerShape({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <group>
      {/* Can body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.25, 0.25, 1.0, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.3}
          metalness={0.4}
          clearcoat={0.5}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.15, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Nozzle */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.12, 16]} />
        <meshStandardMaterial color="#cccccc" roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Label stripe */}
      <mesh position={[0, -0.1, 0.251]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
    </group>
  );
}

function SleepingPillsShape({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <group>
      {/* Pill bottle body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.8, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.3} />
      </mesh>
      {/* Pills inside (visible through bottle) */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, -0.2 + i * 0.15, 0]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function DeodorantShape({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <group>
      {/* Can body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.25, 0.25, 1.0, 32]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          roughness={0.2}
          metalness={0.6}
          clearcoat={0.5}
          emissive={color}
          emissiveIntensity={hovered ? 0.15 : 0.05}
        />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.15, 32]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Nozzle */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.12, 16]} />
        <meshStandardMaterial color="#666666" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Brand label stripe */}
      <mesh position={[0, -0.1, 0.251]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
}

function DefaultShape({ color, hovered }: { color: string; hovered: boolean }) {
  return (
    <RoundedBox args={[0.3, 0.6, 0.3]} radius={0.15} smoothness={4} castShadow>
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        metalness={0.1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        emissive={color}
        emissiveIntensity={hovered ? 0.3 : 0.1}
      />
    </RoundedBox>
  );
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

  const renderShape = () => {
    switch (chemical.id) {
      case 'vape':
        return <VapeShape color={chemical.color} hovered={hovered} />;
      case 'air-freshener':
        return <AirFreshenerShape color={chemical.color} hovered={hovered} />;
      case 'sleeping-pills':
        return <SleepingPillsShape color={chemical.color} hovered={hovered} />;
      case 'lynx-deodorant':
        return <DeodorantShape color={chemical.color} hovered={hovered} />;
      default:
        return <DefaultShape color={chemical.color} hovered={hovered} />;
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect(chemical)}
    >
      {renderShape()}

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
        position={[0, -0.8, 0]}
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
          position={[0, 0.8, 0]}
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
