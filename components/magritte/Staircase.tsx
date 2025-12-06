'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { COLORS, DIMENSIONS, POSITIONS } from '@/lib/magritte/constants';

export default function Staircase() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { staircaseWidth, staircaseSteps } = DIMENSIONS;
  const { staircase: pos } = POSITIONS;

  const stepHeight = 0.35;
  const stepDepth = 0.45;
  const banisterHeight = 0.9;

  const steps = Array.from({ length: staircaseSteps }, (_, i) => i);

  return (
    <group ref={groupRef} position={[pos.x, 0, pos.z]}>
      {/* Steps */}
      {steps.map((i) => (
        <mesh
          key={`step-${i}`}
          position={[0, stepHeight * (i + 0.5), -stepDepth * i]}
          onPointerOver={() => setHoveredStep(i)}
          onPointerOut={() => setHoveredStep(null)}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[staircaseWidth, stepHeight, stepDepth]} />
          <meshStandardMaterial
            color={hoveredStep === i ? '#d07a92' : '#e38fa7'}
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Left banister posts */}
      {steps.map((i) => (
        <mesh
          key={`post-left-${i}`}
          position={[
            -staircaseWidth / 2 - 0.15,
            stepHeight * (i + 1) + banisterHeight / 2,
            -stepDepth * i,
          ]}
          castShadow
        >
          <cylinderGeometry args={[0.04, 0.06, banisterHeight, 12]} />
          <meshStandardMaterial color={COLORS.wood} roughness={0.5} />
        </mesh>
      ))}

      {/* Decorative newel post at bottom left */}
      <group position={[-staircaseWidth / 2 - 0.15, 0, stepDepth * 0.5]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 1.4, 12]} />
          <meshStandardMaterial color={COLORS.woodDark} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={COLORS.woodDark} />
        </mesh>
      </group>

      {/* Decorative newel post at top left */}
      <group position={[-staircaseWidth / 2 - 0.15, stepHeight * staircaseSteps, -stepDepth * (staircaseSteps - 1)]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 1.4, 12]} />
          <meshStandardMaterial color={COLORS.woodDark} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color={COLORS.woodDark} />
        </mesh>
      </group>

      {/* Left handrail */}
      <mesh
        position={[
          -staircaseWidth / 2 - 0.15,
          stepHeight * (staircaseSteps / 2) + banisterHeight + 0.5,
          -stepDepth * (staircaseSteps / 2 - 0.5),
        ]}
        rotation={[
          -Math.atan2(stepHeight * staircaseSteps, stepDepth * staircaseSteps),
          0,
          0,
        ]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.05,
            0.05,
            Math.sqrt(
              Math.pow(stepHeight * staircaseSteps, 2) +
              Math.pow(stepDepth * staircaseSteps, 2)
            ) * 1.1,
            12,
          ]}
        />
        <meshStandardMaterial color={COLORS.woodDark} roughness={0.4} />
      </mesh>
    </group>
  );
}
