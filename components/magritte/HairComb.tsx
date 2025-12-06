'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function HairComb() {
  const groupRef = useRef<THREE.Group>(null);

  // Giant comb standing upright on the bed
  const combWidth = 0.8;
  const combHeight = 2.5;
  const combThickness = 0.15;
  const teethCount = 12;
  const toothWidth = 0.05;
  const toothSpacing = (combWidth - toothWidth * teethCount) / (teethCount + 1);
  const toothLength = 0.4;

  // Create tortoiseshell pattern material
  const tortoiseshellMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#8B4513'),
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
    });
  }, []);

  // Create tortoiseshell pattern using a shader or texture
  const createTortoiseshellTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Base brown/amber color
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add darker brown patches
    ctx.fillStyle = '#654321';
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 20 + Math.random() * 40;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add lighter amber patches
    ctx.fillStyle = '#CD853F';
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 15 + Math.random() * 30;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add dark spots
    ctx.fillStyle = '#3D2817';
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = 5 + Math.random() * 15;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const tortoiseshellTexture = createTortoiseshellTexture();

  return (
    <group 
      ref={groupRef} 
      position={[-5, 0.4 + 0.3 + 1.25, 2]} // On top of the bed mattress
      rotation={[0, 0, 0]}
      castShadow
    >
      {/* Comb back/body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[combWidth, combHeight, combThickness]} />
        <meshStandardMaterial map={tortoiseshellTexture} roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Comb teeth - pressing into mattress */}
      {Array.from({ length: teethCount }, (_, i) => {
        const x = -combWidth / 2 + toothSpacing + i * (toothWidth + toothSpacing) + toothWidth / 2;
        return (
          <mesh
            key={i}
            position={[x, -combHeight / 2 - toothLength / 2, 0]}
            castShadow
          >
            <boxGeometry args={[toothWidth, toothLength, combThickness * 0.8]} />
            <meshStandardMaterial map={tortoiseshellTexture} roughness={0.3} metalness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

