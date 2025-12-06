'use client';

import { COLORS, DIMENSIONS } from '@/lib/magritte/constants';

export default function Room() {
  const { roomWidth, roomHeight, roomDepth } = DIMENSIONS;

  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]} receiveShadow>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color={COLORS.wall} />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color={COLORS.wall} />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color={COLORS.wall} />
      </mesh>

      {/* Floor with wood plank effect */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[roomWidth, roomDepth, 1, 1]} />
        <meshStandardMaterial
          color={COLORS.floor}
          roughness={0.8}
        />
      </mesh>

      {/* Wood plank lines */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh
          key={`plank-${i}`}
          position={[-roomWidth / 2 + (i + 0.5) * (roomWidth / 20), 0.001, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.02, roomDepth]} />
          <meshBasicMaterial color={COLORS.floorDark} />
        </mesh>
      ))}
    </group>
  );
}
