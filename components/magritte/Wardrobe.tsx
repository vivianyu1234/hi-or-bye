'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { COLORS } from '@/lib/magritte/constants';

export default function Wardrobe() {
  const groupRef = useRef<THREE.Group>(null);

  // Large wardrobe matching Magritte painting
  const wardrobeWidth = 5;
  const wardrobeHeight = 7;
  const wardrobeDepth = 1.5;

  const woodColor = '#4A3728';
  const woodColorDark = '#3A2A1A';

  // Create sky reflection texture for mirrors
  const createSkyTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#B0E0E6');
    gradient.addColorStop(1, '#87CEEB');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw fluffy clouds
    ctx.fillStyle = '#FFFFFF';
    ctx.globalAlpha = 0.9;

    // Cloud clusters
    const drawCloud = (cx: number, cy: number, scale: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 30 * scale, 0, Math.PI * 2);
      ctx.arc(cx + 25 * scale, cy - 10 * scale, 35 * scale, 0, Math.PI * 2);
      ctx.arc(cx + 50 * scale, cy, 30 * scale, 0, Math.PI * 2);
      ctx.arc(cx + 25 * scale, cy + 10 * scale, 25 * scale, 0, Math.PI * 2);
      ctx.fill();
    };

    drawCloud(80, 120, 1.2);
    drawCloud(300, 80, 1);
    drawCloud(200, 250, 0.9);
    drawCloud(400, 180, 1.1);
    drawCloud(150, 380, 1);
    drawCloud(350, 350, 0.8);

    ctx.globalAlpha = 1.0;

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <group ref={groupRef} position={[4.5, 0, -4]} rotation={[0, -0.2, 0]}>
      {/* Main wardrobe body */}
      <mesh position={[0, wardrobeHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[wardrobeWidth, wardrobeHeight, wardrobeDepth]} />
        <meshStandardMaterial color={woodColor} roughness={0.6} />
      </mesh>

      {/* Top decorative crown molding */}
      <mesh position={[0, wardrobeHeight + 0.15, 0]} castShadow>
        <boxGeometry args={[wardrobeWidth + 0.2, 0.3, wardrobeDepth + 0.1]} />
        <meshStandardMaterial color={woodColorDark} roughness={0.5} />
      </mesh>

      {/* Left door frame */}
      <mesh position={[-wardrobeWidth / 4, wardrobeHeight / 2, wardrobeDepth / 2 + 0.02]} castShadow>
        <boxGeometry args={[wardrobeWidth / 2 - 0.15, wardrobeHeight - 0.4, 0.08]} />
        <meshStandardMaterial color={woodColor} roughness={0.55} />
      </mesh>

      {/* Right door frame */}
      <mesh position={[wardrobeWidth / 4, wardrobeHeight / 2, wardrobeDepth / 2 + 0.02]} castShadow>
        <boxGeometry args={[wardrobeWidth / 2 - 0.15, wardrobeHeight - 0.4, 0.08]} />
        <meshStandardMaterial color={woodColor} roughness={0.55} />
      </mesh>

      {/* Left mirror (reflecting sky) */}
      <mesh position={[-wardrobeWidth / 4, wardrobeHeight / 2, wardrobeDepth / 2 + 0.07]}>
        <planeGeometry args={[wardrobeWidth / 2 - 0.5, wardrobeHeight - 0.8]} />
        <meshStandardMaterial
          map={createSkyTexture}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Right mirror (reflecting sky) */}
      <mesh position={[wardrobeWidth / 4, wardrobeHeight / 2, wardrobeDepth / 2 + 0.07]}>
        <planeGeometry args={[wardrobeWidth / 2 - 0.5, wardrobeHeight - 0.8]} />
        <meshStandardMaterial
          map={createSkyTexture}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>

      {/* Center divider */}
      <mesh position={[0, wardrobeHeight / 2, wardrobeDepth / 2 + 0.03]} castShadow>
        <boxGeometry args={[0.12, wardrobeHeight - 0.3, 0.1]} />
        <meshStandardMaterial color={woodColorDark} roughness={0.5} />
      </mesh>

      {/* Door handles */}
      <mesh position={[-0.3, wardrobeHeight / 2, wardrobeDepth / 2 + 0.12]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.3, wardrobeHeight / 2, wardrobeDepth / 2 + 0.12]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Base molding */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[wardrobeWidth + 0.1, 0.2, wardrobeDepth + 0.05]} />
        <meshStandardMaterial color={woodColorDark} roughness={0.6} />
      </mesh>

      {/* Giant shaving brush on top */}
      <group position={[0.5, wardrobeHeight + 1.2, 0]} rotation={[0.3, 0.2, 0.1]}>
        {/* Brush handle - cream/beige */}
        <mesh position={[0, -0.5, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 1.2, 24]} />
          <meshStandardMaterial color="#D4A574" roughness={0.5} />
        </mesh>

        {/* Metal band */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.15, 24]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Brush bristles base */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.25, 0.4, 24]} />
          <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
        </mesh>

        {/* Fluffy bristles top - dome shape */}
        <mesh position={[0, 0.7, 0]} castShadow>
          <sphereGeometry args={[0.5, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#F0EAD6" roughness={0.9} />
        </mesh>

        {/* Additional bristle fluff */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 0.3;
          const z = Math.sin(angle) * 0.3;
          return (
            <mesh key={i} position={[x, 0.5, z]} castShadow>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshStandardMaterial color="#FAF0E6" roughness={0.85} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
