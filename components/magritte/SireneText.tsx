'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS, POSITIONS } from '@/lib/magritte/constants';

export default function SireneText() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const { sireneText: pos } = POSITIONS;

  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.03;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Text
      ref={meshRef}
      position={[pos.x, pos.y, pos.z]}
      rotation={[-Math.PI / 2, 0, 0.15]}
      fontSize={1.2}
      color={COLORS.textWhite}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      Sirene
    </Text>
  );
}
