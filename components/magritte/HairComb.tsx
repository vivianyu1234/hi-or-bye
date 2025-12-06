'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function HairComb() {
  const groupRef = useRef<THREE.Group>(null);

  // Giant oversized comb like in Magritte's painting
  const combWidth = 1.8;
  const combHeight = 6; // Very tall, towering over the bed
  const combThickness = 0.25;
  const teethCount = 35; // Many fine teeth
  const teethHeight = 1.8;

  // Create tortoiseshell texture
  const tortoiseshellTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Base amber/brown color
    ctx.fillStyle = '#CD853F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add dark brown patches (like tortoiseshell)
    ctx.fillStyle = '#3D2817';
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const sizeX = 30 + Math.random() * 80;
      const sizeY = 40 + Math.random() * 100;
      ctx.beginPath();
      ctx.ellipse(x, y, sizeX, sizeY, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add lighter amber highlights
    ctx.fillStyle = '#DEB887';
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 20 + Math.random() * 40;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add very dark spots
    ctx.fillStyle = '#1a0f0a';
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 10 + Math.random() * 25;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  const combMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: tortoiseshellTexture,
      roughness: 0.25,
      metalness: 0.05,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    });
  }, [tortoiseshellTexture]);

  return (
    <group
      ref={groupRef}
      position={[-4, 1.2, -1]} // Standing on/near the bed
      rotation={[0, -0.3, 0.05]} // Slight tilt like in painting
    >
      {/* Main comb body - curved top */}
      <mesh position={[0, combHeight / 2, 0]} castShadow>
        <boxGeometry args={[combWidth, combHeight - teethHeight, combThickness]} />
        <primitive object={combMaterial} attach="material" />
      </mesh>

      {/* Rounded top of comb */}
      <mesh position={[0, combHeight - teethHeight / 2 + 0.3, 0]} castShadow>
        <cylinderGeometry args={[combWidth / 2, combWidth / 2, combThickness, 32, 1, false, 0, Math.PI]} />
        <primitive object={combMaterial} attach="material" />
      </mesh>

      {/* Comb teeth - many fine teeth */}
      {Array.from({ length: teethCount }, (_, i) => {
        const toothWidth = combWidth / (teethCount + 5);
        const spacing = combWidth / (teethCount + 1);
        const x = -combWidth / 2 + spacing * (i + 1);
        const taperFactor = 0.7; // Teeth taper towards tip

        return (
          <mesh
            key={i}
            position={[x, teethHeight / 2 - 0.1, 0]}
            castShadow
          >
            <boxGeometry args={[toothWidth, teethHeight, combThickness * 0.6]} />
            <primitive object={combMaterial} attach="material" />
          </mesh>
        );
      })}

      {/* Base connecting teeth to body */}
      <mesh position={[0, teethHeight - 0.1, 0]} castShadow>
        <boxGeometry args={[combWidth, 0.3, combThickness]} />
        <primitive object={combMaterial} attach="material" />
      </mesh>
    </group>
  );
}
